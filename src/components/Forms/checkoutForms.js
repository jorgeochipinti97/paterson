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

export const CheckoutForm = ({ total, products, size }) => {
  const { setTotal, setProducts } = useForms();
  const { push } = useRouter();
  useEffect(() => {
    setTotal(total);
  }, [total]);

  const mensaje = `Hola! recien compre estos productos ${products.map(
    (e) => `${e.title}`
  )}  por mercadopago, `;

  const mensajeUrlEncoded_ = encodeURIComponent(mensaje);
  const enlaceWaLink_ = `https://wa.me/5491132548116?text=${mensajeUrlEncoded_}`;

  useEffect(() => {
    try {
      initMercadoPago("APP_USR-c18016c5-8a68-40bc-b35e-d6acb1195f15");
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
          failure: "https://www.paterson.vercel.app", // URL de fallo
          pending: "https://www.paterson.vercel.app", // URL pendiente
        },
      };

      // Realiza la petición POST a la API de MercadoPago
      const data = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer APP_USR-6130203189119483-041700-1fc5e9eb66d0b739c7aa2875f45d3cd5-797888604`, // Usa el Access Token del usuario
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

  return (
    <div className="">
      <div className="flex justify-center">
        <Button
          disabled={!size}
          variant="outline"
          className="w-fit py-5 text-md tracking-tighter"
          onClick={getPayment}
          size="lg"
        >
          <img src="/merca.png" className="w-[25px] mr-5" />
          Pagar con MercadoPago
        </Button>
      </div>
    </div>
  );
};
