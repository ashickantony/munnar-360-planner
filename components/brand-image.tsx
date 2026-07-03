import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Thin wrapper over next/image so every photo slot has consistent sizing, a
 * brand-tinted backdrop while loading, and a required alt.
 *
 * For the trial these point at gradient placeholders in /public/images. Because
 * the real photos will use the exact same filenames, swapping them is drop-in
 * (see /public/images/README.md).
 */
export function BrandImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-teal-water/20", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
