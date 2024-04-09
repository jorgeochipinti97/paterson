import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function formatPrice(price) {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // No mostrar decimales
    maximumFractionDigits: 0, // No mostrar decimales
  }).format(price);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() retorna un índice basado en cero, por lo tanto +1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}