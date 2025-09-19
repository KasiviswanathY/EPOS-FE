import React from "react";
import { ProductImage } from "@/core/interfaces/Products";

interface ProductImageProps {
  productId: string;
  image: ProductImage;
  altText?: string;
  className?: string;
}

const ProductImageComponent: React.FC<ProductImageProps> = ({
  productId,
  image,
  altText = "Product Image",
  className = "",
}) => {
  // Use the correct path to our Next.js API route
  const imageSrc = `/api/products/${productId}/images/${image.id}`;

  return (
    <img
      src={imageSrc}
      alt={image.altText || altText}
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null; // Prevent infinite loop
        e.currentTarget.src = "/assets/img/products/pos-product-01.svg";
      }}
    />
  );
};

export default ProductImageComponent;
