import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // No mostrar decimales
    maximumFractionDigits: 0, // No mostrar decimales
  }).format(price);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() retorna un índice basado en cero, por lo tanto +1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


export const calcularComisionMercadoPago = (precio) => {
  // Paso 1: Calcular el 6.5% del precio original
  const comisionBase = precio * 0.065;

  // Paso 2: Calcular el 21% de ese 6.5%
  const ivaComision = comisionBase * 0.21;

  // Paso 3: Sumar el 6.5% y el 21% del 6.5% al precio original
  const subtotal = precio + comisionBase + ivaComision;

  // Paso 4: Calcular el 21% del total resultante
  const ivaTotal = subtotal * 0.21;

  // Paso 5: Sumar ese 21% al total del paso 3 para obtener el precio final
  const precioFinal = subtotal + ivaTotal;

  return precioFinal;
};
