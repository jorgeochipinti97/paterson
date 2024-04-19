"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const AddressForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input className="my-1" placeholder="Nombre" {...register("name")} />
      <Input
        className="my-1"
        placeholder="Apellido"
        {...register("lastName")}
      />
      <Input className="my-1" placeholder="DNI" {...register("dni")} />
      <Input
        className="my-1"
        placeholder="Email"
        {...register("email")}
        required
      />
      <Input
        className="my-1"
        placeholder="Celular"
        {...register("phone")}
        required
      />
      <Input
        required
        className="my-1"
        placeholder="Dirección"
        {...register("address")}
      />
      <Input
        className="my-1"
        placeholder="Código postal"
        {...register("zipCode")}
        required
      />
      <Input
        className="my-1"
        placeholder="Ciudad"
        {...register("city")}
        required
      />
      <Input
        required
        className="my-1"
        placeholder="Provincia"
        {...register("provincia")}
      />
      <Textarea placeholder="observación" {...register("message")} />
      <Button className="mt-2">Enviar</Button>
    </form>
  );
};
