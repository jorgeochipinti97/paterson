"use client";
import { Navbar } from "@/components/Navbar";
import { Boxes } from "@/components/ui/background-boxes";
import { CardProduct } from "@/components/Card/CardProduct";
import useProducts from "@/hook/useProducts";
import { Cart } from "@/components/Cart";
import { useEffect } from "react";
import gsap, { Power1 } from "gsap";

export default function Home() {
  const { products } = useProducts();
  useEffect(() => {
    gsap.to(".video", {
      opacity: 1,
      ease: Power1.easeIn,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(".text-one", {
      opacity: 1,
      ease: Power1.easeIn,
      delay: 0.2,
      duration: 0.5,
    });
    gsap.to(".text-two", {
      opacity: 1,
      ease: Power1.easeIn,
      delay: 0.4,
      duration: 0.5,
    });
    gsap.to(".text-three", {
      opacity: 1,
      ease: Power1.easeIn,
      delay: 0.7,
      duration: 0.5,
    });
  }, []);
  return (
    <div>
      <div className="fixed right-2 bottom-3 md:hidden  mt-5 z-50">
        <Cart />
      </div>
      <div className="h-fit relative w-full overflow-hidden bg-slate-900  py-10">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="relative z-20">
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
          <div className="flex justify-center -z-40">
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
        <Boxes />

        <Navbar />
      </div>
    </div>
  );
}
