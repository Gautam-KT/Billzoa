import Image from "next/image";

// Optimised images for real assets (webp/jpg/png/avif); SVG placeholders are served as-is.
export default function Media({ src, alt, sizes = "(min-width: 1200px) 1100px, 100vw", priority = false, className = "", ratio = "8 / 5" }) {
  const isSvg = src.endsWith(".svg");
  return (
    <div className={`media ${className}`} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={isSvg} className={`media__img object-contain ${className}`} />
    </div>
  );
}
