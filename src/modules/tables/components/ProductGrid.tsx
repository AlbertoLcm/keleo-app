import { memo } from "react";
import type { Product } from "@/modules/menu/models/menu.model";
import GridCardsProducts from "./GridCardsProducts";
import CardProductSkeleton from "./CardProductSkeleton";
import CardProduct from "./CardProduct";
import { CardEmptyAdded } from "@/modules/shared";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
  isLocked?: boolean;
}

export const ProductGrid = memo(({ products, isLoading, onAddToCart, isLocked }: ProductGridProps) => {
  if (isLoading) {
    return (
      <GridCardsProducts>
        {Array.from({ length: 3 }).map((_, i) => (
          <CardProductSkeleton key={i} />
        ))}
      </GridCardsProducts>
    );
  }

  return (
    <GridCardsProducts>
      {products.map((product) => (
        <CardProduct
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          productId={product.id}
          onClick={() => onAddToCart(product)}
          isLocked={isLocked}
        />
      ))}
      {products.length === 0 && (
        <CardEmptyAdded
          onAction={() => console.log("Añadiendo Producto")}
          title="Añadir Producto"
          description="Registrar un nuevo producto"
        />
      )}
    </GridCardsProducts>
  );
});

ProductGrid.displayName = "ProductGrid";

export default ProductGrid;
