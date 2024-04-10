import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAlert } from "@/hook/useAlert";
import { AlertComponent } from "../ui/AlertComponent";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/register", data);
      if (response) {
        reset();
        window.location.href = "/DUBLINGROUP-SMB.pdf";
      }
    } catch (error) {
      console.error("Hubo un error al enviar el formulario: ", error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className="w-10/12 md:w-6/12 ">
      <form
        className="border-2 border-black bg-white p-5 rounded-xl mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Nombre completo"
          className="my-3"
          {...register("name")}
        />
        <Input placeholder="Celular" className="my-3" {...register("phone")} />
        <Input placeholder="Email" className="my-3" {...register("email")} />
        <Input placeholder="Ciudad" className="my-3" {...register("city")} />
        <Input
          placeholder="Provincia"
          className="my-3"
          {...register("provincia")}
        />
        <Button>Enviar</Button>
      </form>
    </div>
  );
};
