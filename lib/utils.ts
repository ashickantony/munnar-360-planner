import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an INR integer as "from ₹4,500" using the en-IN locale.
 * Prices in content are plain integers (rupees).
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Just the "₹4,500" without the "from" prefix. */
export function priceFrom(amount: number): string {
  return `from ${formatPrice(amount)}`;
}
