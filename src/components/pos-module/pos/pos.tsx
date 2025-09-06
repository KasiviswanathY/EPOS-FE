"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { getAllproducts } from "@/lib/redux/actions/productsAction";
import { getAllCateogry } from "@/lib/redux/actions/categoryActions";

import Link from "next/link";

import PosModals from "@/core/modals/pos-modal/posModals";
import { CartItems } from "@/core/interfaces/CartItems";
import Orders from "./orders";
import Products from "./Products";
import CategorySidebar from "./Categories";

export default function PosComponent() {
  const [activeTab, setActiveTab] = useState("all");
  const [cartItems, setCartItems] = useState<Array<CartItems>>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllproducts());
    dispatch(getAllCateogry());
  }, [dispatch]);

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <div className="main-wrapper pos-five">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          <div className="row pos-wrapper">
            <div className="col-md-12 col-lg-7 col-xl-8 d-flex">
              <div className="pos-categories tabs_wrapper p-0 flex-fill">
                <div className="content-wrap">
                  <CategorySidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <div className="tab-content-wrap">
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                      <div className="mb-3">
                        <h5 className="mb-1">Welcome</h5>
                      </div>
                    </div>
                    <div className="pos-products">
                      <div className="tabs_container">
                        <div
                          className={`tab_content active`}
                          data-tab={activeTab}
                        >
                          <Products
                            setCartItems={setCartItems}
                            activeTab={activeTab}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Orders
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
              orderTotal={orderTotal}
              setOrderTotal={setOrderTotal}
            />
          </div>
          <div className="pos-footer bg-white p-3 border-top">
            <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
              <Link
                href="#"
                className="btn btn-orange d-inline-flex align-items-center justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#hold-order"
              >
                <i className="ti ti-player-pause me-2" />
                Hold
              </Link>
              <Link
                href="#"
                className="btn btn-info d-inline-flex align-items-center justify-content-center"
              >
                <i className="ti ti-trash me-2" />
                Void
              </Link>
              <Link
                href="#"
                className="btn btn-cyan d-flex align-items-center justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#payment-completed"
              >
                <i className="ti ti-cash-banknote me-2" />
                Payment
              </Link>
              <Link
                href="#"
                className="btn btn-secondary d-inline-flex align-items-center justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#orders"
              >
                <i className="ti ti-shopping-cart me-2" />
                View Orders
              </Link>
              <Link
                href="#"
                className="btn btn-indigo d-inline-flex align-items-center justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#reset"
              >
                <i className="ti ti-reload me-2" />
                Reset
              </Link>
              <Link
                href="#"
                className="btn btn-danger d-inline-flex align-items-center justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#recents"
              >
                <i className="ti ti-refresh-dot me-2" />
                Transaction
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PosModals payingAmount={orderTotal} />
    </div>
  );
}
