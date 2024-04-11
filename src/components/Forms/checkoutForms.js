"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { AddressForm } from "./addressForm";
import { PaymentForm } from "./paymentForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useForms from "@/hook/useForms";
import { useRouter } from "next/navigation";
import { calcularComisionMercadoPago, formatPrice } from "@/lib/utils";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";

export const CheckoutForm = ({ total, products }) => {
  const { sendAdresss, sendPayment, setTotal, setProducts } = useForms();
  const { push } = useRouter();
  useEffect(() => {
    setTotal(total);
  }, [total]);

  const mensaje = `Hola! recien compre estos productos ${products.map(
    (e) => `${e.title}`
  )}  por mercadopago, `;

  const mensajeUrlEncoded_ = encodeURIComponent(mensaje);
  const enlaceWaLink_ = `https://wa.me/5491122984742?text=${mensajeUrlEncoded_}`;

  useEffect(() => {
    try {
      initMercadoPago("APP_USR-af6bf798-40ed-4497-9598-947b789d93eb");
    } catch (error) {
      console.error("Error al inicializar MercadoPago", error);
    }
  }, []);

  const items = products.map((product) => ({
    title: product.title, // Nombre del producto
    quantity: product.quantity, // Cantidad fijada a 1 en este ejemplo
    unit_price: calcularComisionMercadoPago(product.price), // Aplica la comisión de MercadoPago
  }));

  const getPayment = async () => {
    try {
      const preference = {
        items: items,
        back_urls: {
          success: enlaceWaLink_, // URL de éxito
          failure: "https://www.dublingroup.store/", // URL de fallo
          pending: "https://www.dublingroup.store/", // URL pendiente
        },
      };

      // Realiza la petición POST a la API de MercadoPago
      const data = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer APP_USR-4135961235158632-040814-0b2e67dd427a2a5af293215120176896-331030041`, // Usa el Access Token del usuario
          },
        }
      );

      // Si la petición es exitosa, redirige al usuario al 'init_point'
      if (data) {
        push(data.data.init_point);
      }
    } catch (err) {
      console.log(err); // Maneja cualquier error que ocurra durante la petición
    }
  };

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const sendMessage = () => {
    const mensaje = `Hola! Queria consultar para pagar ${products.map(
      (e) => `${e.title} `
    )} por transferencia`;
    const mensajeUrlEncoded = encodeURIComponent(mensaje);
    const enlaceWaLink = `https://wa.me/5491122984742?text=${mensajeUrlEncoded}`;
    push(enlaceWaLink);
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Comprar ahora</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="">
          <div className="addressForm w-full">
            <AddressForm onSubmit={sendAdresss} />
          </div>
          <div
            className="paymentForm w-full"
            style={{ opacity: 0, display: "none" }}
          >
            <PaymentForm onSubmit={sendPayment} total={total} />
          </div>
          <div>
            <Button
              variant="outline"
              className="w-fit py-2"
              onClick={getPayment}
            >
              <img src="/merca.png" className="w-[25px] m-2" />
              Pagar con MercadoPago
            </Button>
          </div>
          <div>
            <Button variant="outline" onClick={sendMessage}>
              Quiero pagar {formatPrice(total)} por transferencia
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
