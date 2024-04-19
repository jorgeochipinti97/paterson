"use client";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";

import axios from "axios";
import { formatDate, formatPrice } from "@/lib/utils";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const TableGuide = () => {
  const [registers, setRegisters] = useState([]);

  const getRegister = async () => {
    const response = await axios.get("/api/register");
    setRegisters(response.data.data);
  };

  useEffect(() => {
    getRegister();
  }, []);

  return (
    <Table className=" ">
      <TableCaption>Lista de productos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead className="">Email</TableHead>
          <TableHead>Celular</TableHead>
          <TableHead className="">Ciudad</TableHead>
          <TableHead className="">Provincia</TableHead>
          <TableHead className="">-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {registers &&
          registers.map((e, index_) => (
            <TableRow key={index_}>
              <TableCell className="text-xs">{e.name}</TableCell>
              <TableCell className="text-xs">{e.email}</TableCell>
              <TableCell className=" text-xs">{e.phone}</TableCell>
              <TableCell className="text-xs">{e.email}</TableCell>
              <TableCell className="text-xs">{e.provincia}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
