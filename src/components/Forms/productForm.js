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
import { ScrollArea } from "../ui/scroll-area";

export const ProductForm = ({ product }) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "AVIF", "WEBP"];
  const [images_, setImages_] = useState([]);
  const [sizes, setSizes] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      setValue("images", product.images);
      setValue("category", product.category);
    }
  }, [product, setValue]);

  useEffect(() => {
    const defaultSizes = [
      { size: "1", stock: 0 },
      { size: "2", stock: 0 },
      { size: "3", stock: 0 },
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
    ];

    if (product && product.sizes) {
      const productSizes = defaultSizes.map((defaultSize) => {
        const foundSize = product.sizes.find(
          (s) => s.size === defaultSize.size
        );
        return foundSize || defaultSize;
      });
      setSizes(productSizes);
    } else {
      setSizes(defaultSizes);
    }
  }, [product]);

  const handleSizeChange = (index, value) => {
    const newSizes = sizes.map((size, i) => {
      if (i === index) {
        return { ...size, stock: parseInt(value, 10) };
      }
      return size;
    });
    setSizes(newSizes);
  };

  useEffect(() => {
    product && setValue("images", product.images);
    product && setImages_(product.images);
    product && setValue("title", product.title);
    product && setValue("price", product.price);
    product && setValue("description", product.description);
    product && setValue("discountPrice", product.discountPrice);
    product && setValue("category", product.category);
  }, [product]);

  const handleFileChange = async (file) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dwupzgtpo/image/upload`,
        formData
      );
      const data = response.data;
      const currentImages = getValues("images");

      const updatedImages = currentImages
        ? [...currentImages, data.secure_url]
        : [data.secure_url];

      setValue("images", updatedImages);
      setImages_(updatedImages);
    } catch (er) {
      console.log(er);
    }
  };

  const deleteImage = (img) => {
    const newImages = images_.filter((e) => e != img);
    setImages_(newImages);
    setValue("images", newImages);
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      sizes,
    };

    if (!product) {
      // Lógica para crear un nuevo producto
      const response = await axios.post("/api/products", productData);
      console.log(response);
    } else {
      // Lógica para actualizar un producto existente
      const response = await axios.put("/api/products", {
        _id: product._id,
        ...productData,
      });
      console.log(response);
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
          images_.map((e, index) => (
            <div className="mx-2" key={index}>
              <img src={e} className="w-[50px]" />
              <Button
                variant="destructive"
                onClick={() => deleteImage(e)}
                size="sm"
              >
                Eliminar
              </Button>
            </div>
          ))}
      </div>
      <ScrollArea className="h-[70vh]">
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
          {sizes &&
            sizes.map((size, index) => (
              <div key={index} className="my-2">
                <label>{`Stock for size ${size.size}:`}</label>
                <Input
                  type="number"
                  value={size.stock}
                  onChange={(e) => handleSizeChange(index, e.target.value)}
                />
              </div>
            ))}
          <section className="my-2">
            <Select onValueChange={(e) => setValue("category", e)}
            value={watch('category')}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="hoodie">Hoodie</SelectItem>
                  <SelectItem value="remera">Remera</SelectItem>
                  <SelectItem value="accesorios">Accesorios</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <section>
            <Button className="mt-5">Enviar</Button>
          </section>
        </form>
      </ScrollArea>
    </div>
  );
};
