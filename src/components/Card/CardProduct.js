"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { CheckoutForm } from "../Forms/checkoutForms";
import useCartStore from "@/hook/useCartStore";
import gsap, { Power1 } from "gsap";
export const CardProduct = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState();
  useEffect(() => {
    console.log(product);
  }, [product]);
  const agregarProducto = useCartStore((state) => state.agregarProducto);

  const filteredSizes = product.sizes.filter(
    (size) => size.stock > 0 && !size.size.toLowerCase().includes("undefined")
  );

  const getButtonClass = (size) => {
    return size === selectedSize
      ? "bg-slate-300 text-black"
      : "bg-white text-black";
  };

  return (
    <Card className="relative w-10/12 shadowBoxLow md:w-8/12 my-5 md:my-0 cursor-pointer h-fit rounded-lg overflow-hidden shadow-lg bg-black/90 border-none">
      <CardContent className="">
        <div className="flex justify-center items-start">
          <img
            src={product.images[0]}
            alt={"productName"}
            layout="fill"
            objectFit="cover"
            className="rounded-xl  mt-5 "
          />
        </div>
        <CardTitle
          className=" text-xl mt-2 font-geist  text-white  
tracking-tighter"
        >
          {product.title}
        </CardTitle>
        <CardDescription className="flex justify-around mt-2">
          <span className="text-red-700 text-xl  mr-2 line-through	 font-geist tracking-tighter">
            {" "}
            {formatPrice(product.price)}
          </span>
          <span className="font-bold  text-xl  text-white font-geist tracking-tighter">
            {" "}
            {formatPrice(product.discountPrice)}
          </span>
        </CardDescription>
        <div className="flex mt-5 flex-wrap justify-start">
          {filteredSizes.length > 0 ? (
            filteredSizes.map((sizeObj, index) => (
              <Button
                key={index}
                onClick={() => setSelectedSize(sizeObj.size)}
                variant="icon"
                className={`${getButtonClass(
                  sizeObj.size
                )} border mx-1 border-black`}
              >
                {sizeObj.size.toUpperCase()}
              </Button>
            ))
          ) : (
            <p>No sizes available .</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center mt-5">
          <div className="my-1">
            <CheckoutForm
            size={selectedSize}
              total={product.discountPrice}
              products={[
                {
                  title: product.title,
                  price: product.price,
                  quantity: 1,
                },
              ]}
            />
          </div>
          <div className="my-1">
            <Button
            disabled={!selectedSize}
              variant="outline"
              className="text-md font-geist tracking-tighter"
              onClick={() => {
                agregarProducto({
                  title: product.title,
                  price: product.discountPrice,
                  images: product.images,
                  _id: product._id,
                  size: selectedSize,
                });
                gsap.to(".alerta", {
                  display: "block",
                });
                gsap.to(".alerta", {
                  opacity: 1,
                  ease: Power1.easeIn,
                });
                gsap.to(".alerta", {
                  delay: 1.5,
                  opacity: 0,
                  ease: Power1.easeIn,
                });
                gsap.to(".alerta", {
                  delay: 2,
                  display: "none",
                });
              }}
            >
              <svg
                width={25}
                className="mr-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.3 5H21l-2 7H7.377M20 16H8L6 3H3m6 17a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
              Agregar al carrito
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
