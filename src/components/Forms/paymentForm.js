"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PaymentForm = ({ onSubmit, total }) => {
  const [card, setCard] = useState("");
  const [installments, setInstallments] = useState(1);
  const tarjetas = [
    { name: "Visa Crédito", value: 1 },
    { name: "Visa Débito", value: 31 },
    { name: "MasterCard Débito", value: 105 },
    { name: "MasterCard Crédito", value: 104 },
    { name: "Maestro Débito", value: 106 },
    { name: "Cabal Débito", value: 108 },
    { name: "Cabal Crédito", value: 63 },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Verifica que card tenga un valor antes de intentar convertirlo y usar setValue
    if (card) {
      const cardValueAsNumber = Number(card); // Convierte card a número
      setValue("card", cardValueAsNumber); // Ahora se pasa como número
      console.log(cardValueAsNumber);
      card == 31 ||
        card == 105 ||
        card == 108 ||
        (card == 106 && setInstallments(1));
    }
  }, [card]);

  useEffect(() => {
    // Verifica que card tenga un valor antes de intentar convertirlo y usar setValue
    if (installments) {
      const installmentsNumber = Number(installments); // Convierte card a número
      setValue("installments", installmentsNumber); // Ahora se pasa como número
      console.log(installmentsNumber);
      console.log(installments);
    }
  }, [installments]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Select onValueChange={(e) => setCard(e)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Selecciona una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria</SelectLabel>
              {tarjetas.map((e, index) => (
                <SelectItem key={index} value={`${e.value}`}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          onValueChange={(e) => setInstallments(e)}
          disabled={card == 31 || card == 105 || card == 108}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Selecciona las cuotas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria</SelectLabel>

              <SelectItem value="1">
                1 cuota de ${(total + total * 0.2).toFixed(2)} | +20%
              </SelectItem>
              <SelectItem value="2">
                2 cuotas de ${(total + total * 0.22).toFixed(2)} | +22%
              </SelectItem>
              <SelectItem value="3">
                3 cuotas de ${(total + total * 0.25).toFixed(2)} | +25%
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Input
        className="my-1"
        placeholder="Nombre de la tarjeta"
        {...register("cardHoldername")}
      />
      <Input
        className="my-1"
        placeholder="Numero de tarjeta"
        {...register("cardNumber")}
      />
      <div className="flex">
        <Input
          className="my-1 w-6/12"
          placeholder="mes de expiración"
          {...register("expirationMonth")}
        />
        <Input
          className="my-1 w-6/12"
          placeholder="año de expiración"
          {...register("expirationYear")}
        />
      </div>
      <Input className="my-1" placeholder="CVV" {...register("securityCode")} />

      <Button className="mt-2">Enviar</Button>
    </form>
  );
};
