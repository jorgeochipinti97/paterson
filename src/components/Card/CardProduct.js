import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { CheckoutForm } from "../Forms/checkoutForms";
import useCartStore from "@/hook/useCartStore";
export const CardProduct = ({ product }) => {
  const agregarProducto = useCartStore((state) => state.agregarProducto);

  return (
    <Card className="relative w-10/12 md:w-8/12 my-5 md:my-0 cursor-pointer h-fit rounded-lg overflow-hidden shadow-lg bg-white/90 border-none">
      <div className="flex justify-center">
        <img
          src={product.images[0]}
          alt={"productName"}
          layout="fill"
          objectFit="cover"
          className="rounded-xl h-[200px] mt-5 "
        />
      </div>
      <CardContent className="">
        <CardTitle className=" text-md mt-2 font-geist  ">
          {product.title}
        </CardTitle>
        <CardDescription className="flex justify-around mt-2">
          <span className="text-red-700 text-xl  mr-2 line-through	">
            {" "}
            {formatPrice(product.price)}
          </span>
          <span className="font-bold  text-xl ">
            {" "}
            {formatPrice(product.discountPrice)}
          </span>
        </CardDescription>

        <div className="flex flex-col items-center justify-center mt-5">
          <div className="my-1">
            <CheckoutForm total={product.discountPrice} products={[product]} />
          </div>
          <div className="my-1">
            <Button
              variant="outline"
              onClick={() =>
                agregarProducto({
                  title: product.title,
                  price: product.discountPrice,
                  images: product.images,
                  _id: product._id,
                })
              }
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
