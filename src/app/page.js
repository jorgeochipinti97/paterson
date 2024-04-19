"use client";
import { Navbar } from "@/components/Navbar";
import { Boxes } from "@/components/ui/background-boxes";
import { CardProduct } from "@/components/Card/CardProduct";
import useProducts from "@/hook/useProducts";
import { Cart } from "@/components/Cart";
import { useEffect } from "react";
import gsap, { Power1 } from "gsap";
import Marquee from "react-fast-marquee";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { RegisterForm } from "@/components/Forms/registerForm";

export default function Home() {
  const { products } = useProducts();

  useEffect(() => {
    products &&
      gsap.to(".video", {
        opacity: 1,
        ease: Power1.easeIn,
        delay: 0.5,
        duration: 0.5,
      });
    products &&
      gsap.to(".text-one", {
        opacity: 1,
        ease: Power1.easeIn,
        delay: 0.2,
        duration: 0.5,
      });
    products &&
      gsap.to(".text-two", {
        opacity: 1,
        ease: Power1.easeIn,
        delay: 0.4,
        duration: 0.5,
      });
    products &&
      gsap.to(".text-three", {
        opacity: 1,
        ease: Power1.easeIn,
        delay: 0.7,
        duration: 0.5,
      });
  }, [products]);
  return (
    <div className=" bg-slate-950 min-h-screen">
      <Navbar />
      <Alert
        style={{ opacity: 0, display: "none" }}
        className="alerta fixed bottom-2 left-2 z-50 w-fit p-5"
      >
        <svg
          width={25}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <AlertTitle>Producto añadido con éxito</AlertTitle>
      </Alert>
      <div className="fixed right-2 z-50 bottom-3 md:hidden  mt-5 ">
        <Cart />
      </div>
      <div className="h-fit relative w-full overflow-hidden  py-10">


        <div className="flex justify-center mt-10 ">
          <video src="/video.mp4" className=" w-9/12 md:w-3/12 rounded-xl shadowBoxLow" autoPlay loop playsInline muted />
        </div>

        <section>
          <p
            style={{ opacity: 0.5 }}
            className="text-three text-7xl text-center text-white   font-extrabold uppercase tracking-tighter font-geist mt-20"
          >
            Oferta mensual
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-10 w-screen">
            {products &&
              products.map((e) => (
                <div key={e.title} className="flex justify-center">
                  <CardProduct product={e} />
                </div>
              ))}
          </div>
        </section>
      </div>

      <Marquee className="bg-white mt-5" autoFill>
        <div className="flex justify-center mx-5">
          <img src="/visa.png" className="w-[100px] md:w-[200px]" />
        </div>
        <div className="flex justify-center mx-5">
          <img src="/merca.png" className="w-[100px] md:w-[200px]" />
        </div>
        <div className="flex justify-center mx-5">
          <img src="/master.png" className="w-[100px] md:w-[200px]" />
        </div>
      </Marquee>
    </div>
  );
}
