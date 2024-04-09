"use client";
import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProducts from "@/hook/useProducts";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductForm } from "../Forms/productForm";
import axios from "axios";
import { formatPrice } from "@/lib/utils";

export const TableProducts = () => {
  const { products, loading, error } = useProducts();
  useEffect(() => {
    products && console.log(products);
  }, [products]);

  const onDelete = async (_id) => {
    const response = await axios.delete(`/api/products?_id=${_id}`);
console.log(response)
  };
  return (
    <Table>
      <TableCaption>Lista de productos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=""></TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="">Categoria</TableHead>
          <TableHead className="">Subcategoria</TableHead>
          <TableHead className="">Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((e,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <img src={`${e.images[0]}`} className="w-[100px] rounded-xl" />
              </TableCell>
              <TableCell className="font-medium">{e.title}</TableCell>
              <TableCell>{formatPrice(e.price)}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell className="">{e.subcategory}</TableCell>
              <TableCell className="flex flex-col">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="my-1" size="sm">
                      Editar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <ProductForm product={e} />
                    <AlertDialogCancel>volver</AlertDialogCancel>
                  </AlertDialogContent>
                  <AlertDialogFooter></AlertDialogFooter>
                </AlertDialog>

                <Button
                  className="my-1"
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(e._id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
