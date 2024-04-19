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
const TableOrders = () => {
  const getOrders = async () => {
    const response = await axios.get("/api/orders");
    setOrders(response.data.data);
    console.log(response.data.data);
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Table className=" ">
      <TableCaption>Lista de productos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead className="">Total</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="">Email</TableHead>
          <TableHead className="">Celular</TableHead>
          <TableHead className="">-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders &&
          orders.map((e,index_) => (
            <TableRow key={index_}>
              <TableCell className="text-xs">{e._id}</TableCell>
              <TableCell>{e.name}</TableCell>
              <TableCell className="flex flex-col">
                {formatPrice(e.total)}
              </TableCell>
              <TableCell className="">{formatDate(e.createdAt)}</TableCell>
              <TableCell className="">{e.email}</TableCell>
              <TableCell className="">{e.phone}</TableCell>
              <TableCell className="">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Ver</Button>
                  </DrawerTrigger>
                  <DrawerContent className="pb-20">
                    <div className="flex justify-center flex-col items-center ">
                      <p className="font-geist font-semibold tracking-tighter">
                        {e._id}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.name}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.email}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.address}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.city}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.provincia}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.phone}
                      </p>
                      <p className="font-geist font-semibold tracking-tighter">
                        {e.transactionId}
                      </p>
                    </div>
                    <div className="flex justify-around">
                      {e.orderItems.map((o,index) => (
                        <div key={index}>
                          {o.images && (
                            <div>
                              <img
                                src={o.images[0]}
                                alt=""
                                className="w-[100px]"
                              />
                            </div>
                          )}

                          <p>{o.title}</p>
                          <p>{o.price}</p>
                          <p>Cantidad: {o.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </DrawerContent>
                </Drawer>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TableOrders;
