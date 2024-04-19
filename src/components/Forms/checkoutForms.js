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
import { Paywayform } from "./paywayForm";

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
          <div>
            <Paywayform total={total} sendAdresss={sendAdresss} sendPayment={sendPayment}  products={products}/>
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
            <svg 
            width={20}
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <g>
        <path d="M14.75 2.5H1.25A1.2 1.2 0 000 3.64v8.72a1.2 1.2 0 001.25 1.14h13.5A1.2 1.2 0 0016 12.36V3.64a1.2 1.2 0 00-1.25-1.14zm0 9.75H1.25v-8.5h13.5z"></path>
        <path d="M7 8.62h2a.34.34 0 01.33.38.33.33 0 01-.33.29H7.08A.33.33 0 016.75 9H5.49a1.58 1.58 0 001.58 1.54h.31v1.26h1.24v-1.26H9A1.58 1.58 0 0010.56 9a1.51 1.51 0 00-.34-1A1.59 1.59 0 009 7.38H7A.34.34 0 016.69 7a.13.13 0 01.01 0 .34.34 0 01.3-.3h1.94a.34.34 0 01.33.3h1.25a1.59 1.59 0 00-1.58-1.55h-.32V4.2H7.37v1.25H7A1.6 1.6 0 005.44 7a1.55 1.55 0 00.35 1A1.59 1.59 0 007 8.62z"></path>
      </g>
    </svg>   Quiero pagar {formatPrice(total)} por transferencia
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
