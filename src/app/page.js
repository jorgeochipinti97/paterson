"use client";
import { Navbar } from "@/components/Navbar";
import { Boxes } from "@/components/ui/background-boxes";
import { CardProduct } from "@/components/Card/CardProduct";
import useProducts from "@/hook/useProducts";
import { Cart } from "@/components/Cart";
import { useEffect } from "react";
import gsap, { Power1 } from "gsap";
import { useAlert } from "@/hook/useAlert";
import { AlertComponent } from "@/components/ui/AlertComponent";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const { products } = useProducts();
  const { alertProps } = useAlert();

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
    <div>
      <Alert
        style={{ opacity: 0, display: "none" }}
        className="alerta fixed bottom-2 right-2 z-50 w-fit p-5"
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
      <div className="fixed right-2 bottom-3 md:hidden  mt-5 ">
        <Cart />
      </div>
      <div className="h-fit relative w-full overflow-hidden bg-slate-900  py-10">
        <p className=" text-4xl  md:hidden uppercase textGradient  font-extrabold text-center tracking-tighter font-geist ">
          Dublin Store
        </p>
        <p
          style={{ opacity: 0.5 }}
          className=" text-one text-green-100 text-3xl md:text-5xl uppercase  font-extrabold text-center tracking-tighter font-geist mt-10 "
        >
          Tu socio comercial
        </p>
        <p
          style={{ opacity: 0.5 }}
          className=" text-two  text-xl uppercase text-teal-100  font-light text-center tracking-tighter font-mono mt-2"
        >
          Importaciones tecnológicas.
        </p>
        <div className="flex justify-center ">
          <video
            src="/video.mp4"
            className="h-[60vh] video rounded-xl mt-5 shadowBoxLow"
            style={{ opacity: 0 }}
            autoPlay
            playsInline
            muted
            loop
          />
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

      <Navbar />
    </div>
  );
}
