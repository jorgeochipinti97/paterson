import { CartContext } from "@/context/cart/CartContext";
import axios from "axios";
import gsap, { Power1 } from "gsap";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useGlobalForm() {
  const [globalFormData, setGlobalFormData] = useState({
    shippingDetails: {
      firstName: "",
      lastName: "",
      idNumber: "",
      email: "",
      address: "",
      addressNumber: "",
      city: "",
      localidad: "",
      provincia: "",
      mobile: "",
      postalCode: "",
      deliveryNote: "",
    },
    paymentDetails: {
      tarjetaSeleccionada: "",
      numeroTarjeta: "",
      mesExpiracion: "",
      anioExpiracion: "",
      codigoSeguridad: "",
      nombreTitular: "",
      tipoIdentificacion: "dni",
      numeroIdentificacion: "",
      totalPesos: 0,
      cuotas: 1,
      discountCode: {},
    },
  });



  const { push } = useRouter();
  const [_idOrder, setIdOrder] = useState(null);






  const updateFormData = (newData, section) => {
    setGlobalFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...newData },
    }));
  };

  const resetFormData = () => {
    setGlobalFormData({
      shippingDetails: {
        firstName: "",
        lastName: "",
        idNumber: "",
        email: "",
        address: "",
        addressNumber: "",
        apartment: "",
        city: "",
        provincia: "",
        mobile: "",
        postalCode: "",
        deliveryNote: "",
      },
      paymentDetails: {
        // Restablece a los valores iniciales
        cardNumber: "",
        cardExpirationDate: "",
        cardCVV: "",
        cardHolderName: "",
      },
    });
  };

  const calculateTotalWithDiscount = (total, discountObjet) => {
    if (!discountObjet) return total; // Si no hay descuento, retorna el total original
    const { isPercentaje, valor } = discountObjet;

    if (isPercentaje) {
      return total * (1 - valor / 100);
    } else {
      return total - valor;
    }
  };
  const totalConDescuento = calculateTotalWithDiscount(
    total,
    globalFormData.paymentDetails.discountCode
  );

  const getPayment = async (token) => {
    const apikey = "ba0fb5b8bed24975af3ef167e1dcae71";
    // const apikey = "rfZTGgNW83rkKS7HcKDy2YQruDzXEq52";
    const amountToPay =
      globalFormData.paymentDetails.discountCode &&
      Object.keys(globalFormData.paymentDetails.discountCode).length > 0
        ? parseInt(totalConDescuento * 100) // Asegúrate de que totalConDescuento esté en unidades antes de multiplicar por 100
        : parseInt(globalFormData.paymentDetails.totalPesos); // Asumiendo que totalPesos ya está en centavos

    const datos = {
      customer: {
        id: `${globalFormData.shippingDetails.firstName} ${globalFormData.shippingDetails.lastName}`,
        email: globalFormData.shippingDetails.email,
      },
      user_id: "customer",
      site_transaction_id: uuidv4(),
      token: token,
      payment_method_id: globalFormData.paymentDetails.tarjetaSeleccionada,
      bin: "450799",
      // amount: 2900,
      amount: parseInt(amountToPay),
      currency: "ARS",
      site_id: "00270150",
      establishment_name: "Tienda Onfit",
      installments: globalFormData.paymentDetails.cuotas,
      description: "pago Onfit",
      payment_type: "single",
      sub_payments: [],
    };
    try {
      const data = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/payments",
        datos,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apikey,
          },
        }
      );

      if (data.data.status === "approved") {
        try {
          await createOrder(data.data.token, data.data.site_transaction_id);
          console.log("pago aprobado");

          const discountCode = globalFormData.paymentDetails.discountCode;
          if (discountCode && discountCode._id) {
            try {
              await axios.put(`/api/discount?_id=${discountCode._id}`);
              console.log("Código de descuento actualizado correctamente.");
            } catch (error) {
              console.error(
                "Error al actualizar el código de descuento:",
                error
              );
            }
          }
        } catch (error) {
          console.error(
            "Error procesando el pago o la creación de la orden:",
            error
          );
        }
      }

      data.data.status == "approved" &&
        gsap.to(".isPaid", {
          opacity: 1,
          ease: Power1.easeIn,
        });

      data.data.status == "approved" &&
        setTimeout(() => {
          gsap.to(".isPaid", {
            opacity: 0,
            ease: Power1.easeIn,
          });
          gsap.to(".isPaid", {
            delay: 0.3,
          });
        }, 10000);
    } catch (err) {
      console.log(err);

      gsap.to(".isError", {
        opacity: 1,
        ease: Power1.easeIn,
      });
      setTimeout(() => {
        gsap.to(".isError", {
          opacity: 0,
          ease: Power1.easeIn,
        });
      }, 10000);
    }
  };

  const createOrder = async (token, transactionId) => {
    try {
      const createOrder_ = await axios.post("/api/orders", {
        orderItems: cart,
        numberOfItems: numberOfItems,
        total: total,
        transactionId: transactionId,
        token: token,
        titular: `${globalFormData.shippingDetails.firstName} ${globalFormData.shippingDetails.lastName}`,
        email: globalFormData.shippingDetails.email,
        address: globalFormData.shippingDetails.address,
        numberOfAddress: globalFormData.shippingDetails.addressNumber,
        localidad: globalFormData.shippingDetails.localidad,
        piso: globalFormData.shippingDetails.piso,
        ciudad: globalFormData.shippingDetails.city,
        provincia: globalFormData.shippingDetails.provincia,
        phone: globalFormData.shippingDetails.mobile,
        dniTitular: `${globalFormData.paymentDetails.numeroIdentificacion}`,
        postalCode: globalFormData.shippingDetails.postalCode,
        discountPrice: totalConDescuento,
        cuotas: `${globalFormData.paymentDetails.cuotas}`,
        discountCode: globalFormData.paymentDetails.discountCode
          ? globalFormData.paymentDetails.discountCode
          : "",
      });

      const stockUpdatePromises = cart.map((item) =>
        axios.put("/api/product", {
          _id: item._id,
          nombre: item.size.toLowerCase(),
          stock: item.quantity,
        })
      );

      await Promise.all(stockUpdatePromises);

      const response = await axios.put(
        `/api/orders?_id=${createOrder_.data._id}`,
        {
          codGestion: cargaCliente.data.codGestion,

        }
      );
      response && push(`/orders/${createOrder_.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const generarToken = async () => {
    try {
      const apiKey = "16e8508ea61d4c4d8093f16d8ee9a3c2"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      // const apiKey = "vjzIsMxW2Yd43QoBP93SdmMzJMBbHXoS"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      const response = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/tokens",
        {
          card_number: globalFormData.paymentDetails.numeroTarjeta,
          card_expiration_month: globalFormData.paymentDetails.mesExpiracion,
          card_expiration_year: globalFormData.paymentDetails.anioExpiracion,
          security_code: globalFormData.paymentDetails.codigoSeguridad,
          card_holder_name: globalFormData.paymentDetails.nombreTitular,
          card_holder_identification: {
            type: "dni",
            number: globalFormData.paymentDetails.numeroIdentificacion,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey, // Usa la apiKey como un encabezado personalizado
          },
        }
      );
      response.data && getPayment(response.data.id);
      response.data && console.log("token generado");
    } catch (error) {
      console.error(error);

      gsap.to(".isError", {
        opacity: 1,
        ease: Power1.easeIn,
      });
      setTimeout(() => {
        gsap.to(".isError", {
          opacity: 0,
          ease: Power1.easeIn,
        });
      }, 10000);
    }
  };

  const submitGlobalForm = async () => {
    try {
      generarToken();
    } catch (err) {
      console.log(err);
    }
  };

  return { globalFormData, updateFormData, resetFormData, submitGlobalForm };
}

export default useGlobalForm;
