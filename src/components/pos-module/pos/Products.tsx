/* eslint-disable @next/next/no-img-element */

import CartCounter from "@/core/common/counter/counter";
import { CartItems } from "@/core/interfaces/CartItems";
import { Product } from "@/core/interfaces/Products";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Products = ({
  activeTab,
  setCartItems,
}: {
  activeTab: string;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
}) => {
  const { products, loading, error } = useSelector(
    (state: RootState) =>
      state.products || { products: [], loading: false, error: null }
  );

  const filteredProducts = products.filter((product: Product) => {
    if (activeTab === "all") {
      return true;
    }

    return product.category?.name?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="row g-3">
      {loading ? (
        <div className="col-12 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="col-12 text-center">
          <p className="text-danger">Error loading products: {error}</p>
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product: Product, index: number) => (
          <div
            key={product.id || index}
            className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3"
          >
            <div className="product-info card mb-0" tabIndex={0}>
              <Link href="#" className="pro-img">
                <img
                  src={
                    product.image || "assets/img/products/pos-product-01.svg"
                  }
                  alt={product.name || "Product"}
                />
                <span>
                  <i className="ti ti-circle-check-filled" />
                </span>
              </Link>
              <h6 className="cat-name">
                <Link href="#">{product.category?.name || "Category"}</Link>
              </h6>
              <h6 className="product-name">
                <Link href="#">{product.name || "Product Name"}</Link>
              </h6>
              <div className="d-flex align-items-center justify-content-between price">
                <p className="text-gray-9 mb-0">${product.salePrice || "0"}</p>
                <div className="qty-item m-0">
                  <CartCounter product={product} setCartItems={setCartItems} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No products available</p>
        </div>
      )}
    </div>
  );
};

export default Products;
