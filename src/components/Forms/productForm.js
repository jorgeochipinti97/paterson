"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export const ProductForm = ({ product }) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "AVIF", "WEBP"];
  const [images_,setImages_] =useState([])
  useEffect(() => {
    product && setValue("images", product.images);
    product && setImages_(product.images);
    product && setValue("title", product.title);
    product && setValue("price", product.price);
    product && setValue("description", product.description);
    product && setValue("discountPrice", product.discountPrice);
    product && setValue("category", product.category);
    product && setValue("subcategory", product.subcategory);
  }, [product]);

  const handleFileChange = async (file) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dplhpsznx/image/upload`,
        formData
      );
      const data = response.data;
      const currentImages = getValues("images");

      const updatedImages = currentImages
        ? [...currentImages, data.secure_url]
        : [data.secure_url];

      setValue("images", updatedImages);
      setImages_( updatedImages);
    } catch (er) {
      console.log(er);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!product) {
      const response = await axios.post("/api/products", data);
      console.log(response);
      console.log(data);
    } else {
      const response = await axios.put("/api/products", {
        _id: product._id,
        ...data,
      });
      console.log(response);
      console.log(data);
    }
  };

  return (
    <div>
      <section className="my-5">
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
          maxSize={4}
        />
      </section>
      <div className="flex justify-start flex-wrap">
        {images_ &&
          images_.map((e,index) => (
            <div className="mx-2" key={index}>
              <img src={e}  className="w-[50px]"/>
            </div>
          ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Titulo" className="my-2" {...register("title")} />
        <Input
          placeholder="Precio"
          type="number"
          className="my-2"
          {...register("price")}
        />
        <Input
          placeholder="Precio con descuento"
          type="number"
          className="my-2"
          {...register("discountPrice")}
        />
        <Input
          placeholder="descripcion"
          className="my-2"
          {...register("description")}
        />
        <section className="my-2">
          <Select
            onValueChange={(e) => setValue("category", e)}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecciona una categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categoria</SelectLabel>
                <SelectItem value="informatico">
                  Componentes Informaticos
                </SelectItem>
                <SelectItem value="gaming">Consolas Gaming</SelectItem>
                <SelectItem value="tablet">Tablets</SelectItem>
                <SelectItem value="notebook">Notebooks</SelectItem>
                <SelectItem value="sonido">Sonido</SelectItem>
                <SelectItem value="accesorios">Accesorios</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>

        <section>
          <Select
            onValueChange={(e) => setValue("subcategory", e)}

          >
            {" "}
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecciona una subcategoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categoria</SelectLabel>
                <SelectItem value="informatico">
                  Componentes Informaticos
                </SelectItem>
                <SelectItem value="gabinete">Gabinete</SelectItem>
                <SelectItem value="tablet">Tables</SelectItem>
                <SelectItem value="notebook">Notebooks</SelectItem>
                <SelectItem value="sonido">Sonido</SelectItem>
                <SelectItem value="motherboard">Motherboard</SelectItem>
                <SelectItem value="placa">Placa de video</SelectItem>
                <SelectItem value="procesador">Procesador</SelectItem>
                <SelectItem value="ram">Memoria Ram</SelectItem>
                <SelectItem value="discosolido">Disco Solido</SelectItem>
                <SelectItem value="ipad">IPad</SelectItem>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="applewatch">Apple Watch</SelectItem>
                <SelectItem value="airpods">AirPods</SelectItem>
                <SelectItem value="bose">Bose</SelectItem>
                <SelectItem value="amazonecho">Amazon Echo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>

        <section>
          <Button className="mt-5">Enviar</Button>
        </section>
      </form>
    </div>
  );
};
