"use client";
import axios from "axios";
import gsap, { Power1 } from "gsap";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useForms() {
  const [addressForm, setAddressForm] = useState({});
  const { push } = useRouter();
  const [total, setTotal] = useState(false);
  const [products, setProducts] = useState(false);

  const sendAdresss = (forms) => {
    setAddressForm(forms);
    gsap.to(".addressForm", {
      opacity: 0,
      duration: 0.4,
    });
    gsap.to(".addressForm", {
      display: "none",
      delay: 0.5,
    });
    gsap.to(".paymentForm", {
      display: "block",
      delay: 1,
      duration: 0.1,
    });
    gsap.to(".paymentForm", {
      opacity: 1,
      duration: 0.4,
      delay: 1,
    });
  };

  const sendPayment = (paymentForm) => {
    generateToken(paymentForm, addressForm);
    console.log(addressForm);
    console.log(paymentForm);
  };

  const generateToken = async (paymentForm, addressForm) => {
    try {
      const apiKey = "f43cdde833804e81913cdc5b917be6b5"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      const response = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/tokens",
        {
          card_number: paymentForm.cardNumber,
          card_expiration_month: paymentForm.expirationMonth,
          card_expiration_year: paymentForm.expirationYear,
          security_code: paymentForm.securityCode,
          card_holder_name: paymentForm.cardHoldername,
          card_holder_identification: {
            type: "dni",
            number: addressForm.Dni,
          },
          fraud_detection: {
            device_unique_identifier: "28031747",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey, // Usa la apiKey como un encabezado personalizado
          },
        }
      );
      response.data && getPayment(response.data.id, addressForm, paymentForm);
      response.data && console.log("token generado");

      console.log("token generado");
    } catch (error) {
      console.error(error);

      alert("algo ha salido mal");
    }
  };

  const getPayment = async (token, addressForm, paymentForm) => {
    const apikey = "f59af5c9cc694603aaf401a684e61d53";
    const amountToPay = total * 100;
    const datos = {
      customer: {
        id: addressForm.firstName,
        email: addressForm.email,
      },
      user_id: "customer",
      site_transaction_id: uuidv4(),
      token: token,
      payment_method_id: paymentForm.card,
      bin: "450799",
      // amount: 2900,
        amount: parseInt(amountToPay),
      currency: "ARS",
      site_id: "92109151",
      establishment_name: "Dublin Store",
      installments: paymentForm.installments,
      description: "Pagaste en Dublin Store",
      payment_type: "single",
      sub_payments: [],
      fraud_detection: {
        send_to_cs: true,
        channel: "Web/Mobile/Telefonica",
        bill_to: {
          city: addressForm.city,
          country: "AR",
          customer_id: uuidv4(),
          email: addressForm.email,
          first_name: addressForm.name,
          last_name: addressForm.lastName,
          phone_number: addressForm.phone,
          postal_code: addressForm.zipCode,
          state: "BA",
          street1: addressForm.address,
          street2: "",
        },
        purchase_totals: {
          currency: "ARS",
          amount: amountToPay,
        },
        customer_in_site: {
          days_in_site: 243,
          is_guest: false,
          password: "abracadabra",
          num_of_transactions: 1,
          cellphone_number: addressForm.phone,
          date_of_birth: "129412",
          street: addressForm.address,
        },
        retail_transaction_data: {
          ship_to: {
            city: "Buenos Aires",
            country: "AR",
            email: addressForm.email,
            first_name: addressForm.name,
            last_name: addressForm.lastName,
            phone_number: addressForm.phone,
            phone_number: addressForm.phone,
            postal_code: "1427",
            state: "BA",
            street1: addressForm.address,
            street2: "",
          },
          days_to_delivery: "55",
          dispatch_method: "storepickup",
          tax_voucher_required: true,
          customer_loyality_number: "123232",
          coupon_code: "",
          items: products.map((product) => ({
            code: product._id,
            description: "",
            name: product.title,
            sku: uuidv4(),
            total_amount: product.price,
            quantity: 1,
            unit_price: product.price,
          })),
        },
        csmdds: [
          {
            code: 17,
            description: "Campo MDD17",
          },
          {
            code: 18,
            description: "Campo MDD18",
          },
          {
            code: 19,
            description: "Campo MDD19",
          },
          {
            code: 20,
            description: "Campo MDD20",
          },
          {
            code: 21,
            description: "Campo MDD21",
          },
          {
            code: 22,
            description: "Campo MDD22",
          },
          {
            code: 23,
            description: "Campo MDD23",
          },
          {
            code: 24,
            description: "Campo MDD24",
          },
          {
            code: 25,
            description: "Campo MDD25",
          },
          {
            code: 26,
            description: "Campo MDD26",
          },
          {
            code: 27,
            description: "Campo MDD27",
          },
          {
            code: 28,
            description: "Campo MDD28",
          },
          {
            code: 29,
            description: "Campo MDD29",
          },
          {
            code: 30,
            description: "Campo MDD30",
          },
          {
            code: 31,
            description: "Campo MDD31",
          },
          {
            code: 32,
            description: "Campo MDD32",
          },
          {
            code: 33,
            description: "Campo MDD33",
          },
          {
            code: 34,
            description: "Campo MDD34",
          },
          {
            code: 43,
            description: "Campo MDD43",
          },
          {
            code: 44,
            description: "Campo MDD44",
          },
          {
            code: 45,
            description: "Campo MDD45",
          },
          {
            code: 46,
            description: "Campo MDD46",
          },
          {
            code: 47,
            description: "Campo MDD47",
          },
          {
            code: 48,
            description: "Campo MDD48",
          },
          {
            code: 49,
            description: "Campo MDD49",
          },
          {
            code: 50,
            description: "Campo MDD50",
          },
          {
            code: 51,
            description: "Campo MDD51",
          },
          {
            code: 52,
            description: "Campo MDD52",
          },
          {
            code: 53,
            description: "Campo MDD53",
          },
          {
            code: 54,
            description: "Campo MDD54",
          },
          {
            code: 55,
            description: "Campo MDD55",
          },
          {
            code: 56,
            description: "Campo MDD56",
          },
          {
            code: 57,
            description: "Campo MDD57",
          },
          {
            code: 58,
            description: "Campo MDD58",
          },
          {
            code: 59,
            description: "Campo MDD59",
          },
          {
            code: 60,
            description: "Campo MDD60",
          },
          {
            code: 61,
            description: "Campo MDD61",
          },
          {
            code: 62,
            description: "Campo MDD62",
          },
          {
            code: 63,
            description: "Campo MDD63",
          },
          {
            code: 64,
            description: "Campo MDD64",
          },
          {
            code: 65,
            description: "Campo MDD65",
          },
          {
            code: 66,
            description: "Campo MDD66",
          },
          {
            code: 67,
            description: "Campo MDD67",
          },
          {
            code: 68,
            description: "Campo MDD68",
          },
          {
            code: 69,
            description: "Campo MDD69",
          },
          {
            code: 70,
            description: "Campo MDD70",
          },
          {
            code: 71,
            description: "Campo MDD71",
          },
          {
            code: 72,
            description: "Campo MDD72",
          },
          {
            code: 73,
            description: "Campo MDD73",
          },
          {
            code: 74,
            description: "Campo MDD74",
          },
          {
            code: 75,
            description: "Campo MDD75",
          },
          {
            code: 76,
            description: "Campo MDD76",
          },
          {
            code: 77,
            description: "Campo MDD77",
          },
          {
            code: 78,
            description: "Campo MDD78",
          },
          {
            code: 79,
            description: "Campo MDD79",
          },
          {
            code: 80,
            description: "Campo MDD80",
          },
          {
            code: 81,
            description: "Campo MDD81",
          },
          {
            code: 82,
            description: "Campo MDD82",
          },
          {
            code: 83,
            description: "Campo MDD83",
          },
          {
            code: 84,
            description: "Campo MDD84",
          },
          {
            code: 85,
            description: "Campo MDD85",
          },
          {
            code: 86,
            description: "Campo MDD86",
          },
          {
            code: 87,
            description: "Campo MDD87",
          },
          {
            code: 88,
            description: "Campo MDD88",
          },
          {
            code: 89,
            description: "Campo MDD89",
          },
          {
            code: 90,
            description: "Campo MDD90",
          },
          {
            code: 91,
            description: "Campo MDD91",
          },
          {
            code: 92,
            description: "Campo MDD92",
          },
          {
            code: 93,
            description: "Campo MDD93",
          },
          {
            code: 94,
            description: "Campo MDD94",
          },
          {
            code: 95,
            description: "Campo MDD95",
          },
          {
            code: 96,
            description: "Campo MDD96",
          },
          {
            code: 97,
            description: "Campo MDD97",
          },
          {
            code: 98,
            description: "Campo MDD98",
          },
          {
            code: 99,
            description: "Campo MDD99",
          },
        ],
      },
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
          const order = {
            ...addressForm,
            transactionId: data.data.site_transaction_id,
            token: data.data.token,
            total: total,
            orderItems: products,
            name: `${addressForm.name} ${addressForm.lastName}`,
          };

          await createOrder(order);
          console.log(order);
        } catch (error) {
          console.error(
            "Error procesando el pago o la creación de la orden:",
            error
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async (order) => {
    const response = await axios.post("/api/orders", order);

    const mensaje = `Gracias por tu compra. Detalles: pedido nro ${response.data.data._id}. Pedido de ${order.name} - total: ${total}`;
    const mensajeUrlEncoded = encodeURIComponent(mensaje);
    const enlaceWaLink = `https://wa.me/5491122984742?text=${mensajeUrlEncoded}`;

    response && push(enlaceWaLink);
  };

  return { sendAdresss, sendPayment, setTotal, setProducts };
}

export default useForms;
