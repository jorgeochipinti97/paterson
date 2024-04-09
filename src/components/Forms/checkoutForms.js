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
export const CheckoutForm = ({ total, products }) => {
  const { sendAdresss, sendPayment, setTotal, setProducts } = useForms();

  useEffect(() => {
    setTotal(total);
  }, [total]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

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
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
