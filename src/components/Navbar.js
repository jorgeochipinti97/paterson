"use client";
import React, { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";
import { Button } from "./ui/button";
import { Cart } from "./Cart";

const pillTabs = ["Home", "Productos", "FAQS"];

export const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const tabsComponents = pillTabs.map((text, i) => {
    return (
      <span
        key={text}
        onMouseEnter={() => setHoveredIndex(i)}
        style={{
          position: "relative",
          padding: "0.65rem 0.75rem",
          color: "#f5f5f7",
          background: "rgba(163, 230, 53, .7)",
        }}
        className="rounded-xl cursor-pointer font-geist tracking-tighter"
      >
        {hoveredIndex === i && (
          <MagicTabSelect
            id="pillTabs"
            transition={{ type: "spring", bounce: 0.35 }}
          >
            <span
              className="rounded-xl font-geist  "
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: "rgba(110, 231, 183, .2)",
              }}
            />
          </MagicTabSelect>
        )}
        {text}
      </span>
    );
  });
  return (
    <nav
      className="md:flex justify-between top-0 w-screen fixed hidden  z-20  "
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className=" items-center  ml-5 md:flex  justify-center ">
        <p className=" text-4xl uppercase textGradient  font-extrabold text-center tracking-tighter font-geist ">
          Dublin Store
        </p>
      </div>

      <div className="fixed right-2 md:top-3  mt-5 z-50">
        <Cart />
      </div>
    </nav>
  );
};
