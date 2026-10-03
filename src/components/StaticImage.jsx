import images from "@/data/optimized-images.json";

// Build-time image variants need no image server or client-side hydration.
export default function StaticImage({ src, alt, width, height, loading = "lazy", ...props }) {
    const image = images[src];
    const variants = image?.variants;
    const fallback = variants?.find(variant => variant.width >= width) || variants?.[variants.length - 1];
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            {...props}
            src={fallback?.src || src}
            srcSet={variants?.map(variant => `${variant.src} ${variant.width}w`).join(", ")}
            alt={alt}
            width={width || image?.width}
            height={height || image?.height}
            loading={loading}
            decoding="async"
        />
    );
}
