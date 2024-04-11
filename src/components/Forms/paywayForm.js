import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { AddressForm } from "./addressForm";
import { PaymentForm } from "./paymentForm";

export const Paywayform = ({ sendAdresss, sendPayment, total }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>
          <svg
            width={20}
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <g fill="#0F1729">
              <path d="M5 16a1 1 0 011-1h2a1 1 0 110 2H6a1 1 0 01-1-1zM11 15a1 1 0 100 2h1a1 1 0 100-2h-1z"></path>
              <path
                fillRule="evenodd"
                d="M6.788 3c-.819 0-1.494 0-2.044.046-.571.047-1.096.149-1.588.404A4 4 0 001.45 5.156c-.255.492-.357 1.017-.404 1.588C1 7.294 1 7.969 1 8.788v6.424c0 .819 0 1.494.046 2.044.047.571.149 1.096.404 1.588a4 4 0 001.706 1.706c.492.255 1.017.357 1.588.404.55.046 1.225.046 2.044.046h10.424c.819 0 1.494 0 2.044-.046.571-.047 1.096-.149 1.588-.404a4 4 0 001.706-1.706c.255-.492.357-1.017.404-1.588.046-.55.046-1.226.046-2.044V8.788c0-.819 0-1.494-.046-2.044-.047-.571-.149-1.096-.404-1.588a4 4 0 00-1.706-1.706c-.492-.255-1.017-.357-1.588-.404C18.706 3 18.03 3 17.212 3H6.788zm-2.71 2.225c.159-.082.386-.15.831-.186C5.367 5 5.96 5 6.83 5h10.34c.871 0 1.463 0 1.92.039.446.037.673.104.832.186a2 2 0 01.853.853c.082.159.15.386.186.831.025.295.034.646.037 1.091H3.002c.003-.445.012-.796.037-1.09.037-.446.104-.673.186-.832a2 2 0 01.853-.853zM3 10v5.17c0 .871 0 1.463.039 1.92.037.446.104.673.186.832a2 2 0 00.853.853c.159.082.386.15.831.186C5.367 19 5.96 19 6.83 19h10.34c.871 0 1.463 0 1.92-.039.446-.037.673-.104.832-.186a2 2 0 00.853-.853c.082-.159.15-.386.186-.831.038-.458.039-1.05.039-1.921V10H3z"
                clipRule="evenodd"
              ></path>
            </g>
          </svg>
          Comprar con tarjeta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <div>
          <div className="addressForm w-full">
            <AddressForm onSubmit={sendAdresss} />
          </div>
          <div
            className="paymentForm w-full"
            style={{ opacity: 0, display: "none" }}
          >
            <PaymentForm onSubmit={sendPayment} total={total} />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
