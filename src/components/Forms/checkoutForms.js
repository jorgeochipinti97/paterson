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
import { formatPrice } from "@/lib/utils";
export const CheckoutForm = ({ total, products }) => {
  const { sendAdresss, sendPayment, setTotal, setProducts } = useForms();
  const { push } = useRouter();
  useEffect(() => {
    setTotal(total);
  }, [total]);

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
