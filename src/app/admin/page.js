"use client";
import { ProductForm } from "@/components/Forms/productForm";
import { TableGuide } from "@/components/Tables/guiaTable";
import TableOrders from "@/components/Tables/ordersTable";
import { TableProducts } from "@/components/Tables/productTable";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Page = () => {
  const password = "ferro123";
  const [password_, setPassword_] = useState();
  useEffect(() => {
    if (password == password_) {
      // Primero, anima la opacidad de .admin
      gsap.to(".admin", {
        opacity: 1,
        delay: 1,
        onComplete: function () {
          // Cambia display después de que la animación de opacidad se complete
          document.querySelector(".admin").style.display = "flex";
        },
      });

      // Anima la desaparición de .bye y luego cambia su display a none
      gsap.to(".bye", {
        opacity: 0,
        duration: 0.4,
        onComplete: function () {
          document.querySelector(".bye").style.display = "none";
        },
      });

      console.log("iguales");
    }
  }, [password_]);

  return (
    <div className="bg-black">
      <div className="bye h-screen w-screen flex items-center justify-center">
        <Input
          className="w-6/12 bg-white"
          onChange={(e) => setPassword_(e.target.value)}
        />
      </div>
      <div
        className="h-screen  items-center justify-center bg-black admin "
        style={{ display: "none", opacity: "none" }}
      >
        <ScrollArea className="h-80vh w-12/12 md:w-10/12 h-[80vh] p-5 bg-white rounded-xl flex justify-center">
          <Tabs defaultValue="account" className="h-[60vh] w-11/12">
            <TabsList className="flex justify-center">
              <TabsTrigger value="account">Crear Producto</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="orders">Ordenes</TabsTrigger>
              <TabsTrigger value="guia">Guia</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <ProductForm />
            </TabsContent>
            <TabsContent value="products">
              <TableProducts />
            </TabsContent>
            <TabsContent value="orders">
              <TableOrders />
            </TabsContent>
            <TabsContent value="guia">
              <TableGuide />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
