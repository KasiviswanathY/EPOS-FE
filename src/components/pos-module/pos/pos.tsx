"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getAllproducts } from "@/lib/redux/actions/productsAction";
import { getAllCateogry } from "@/lib/redux/actions/categoryActions";
import { getAllLocations } from "@/lib/redux/actions/locationsActions";
import { getAllStaff } from "@/lib/redux/actions/staffActions";

import Link from "next/link";

import PosModals from "@/core/modals/pos-modal/posModals";
import { CartItems } from "@/core/interfaces/CartItems";
import { Staff } from "@/core/interfaces/Staff";
import Orders from "./orders";
import Products from "./Products";
import CategorySidebar from "./Categories";

export default function PosComponent() {
  const [activeTab, setActiveTab] = useState("all");
  const [cartItems, setCartItems] = useState<Array<CartItems>>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [selectedStaffId, setSelectedStaffId] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { locations } = useSelector((state: RootState) => state.locations);
  const { staff } = useSelector((state: RootState) => state.staff);

  useEffect(() => {
    setIsClient(true);
    dispatch(getAllproducts());
    dispatch(getAllCateogry());
    dispatch(getAllLocations());
    dispatch(getAllStaff());
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

                    {/* Location and Staff Selection */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          Select Location <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${
                            !selectedLocationId ? "border-warning" : ""
                          }`}
                          value={selectedLocationId}
                          onChange={(e) =>
                            setSelectedLocationId(e.target.value)
                          }
                        >
                          <option value="">Choose Location...</option>
                          {isClient &&
                            locations.map((location) => (
                              <option key={location.id} value={location.id}>
                                {location.name}
                              </option>
                            ))}
                        </select>
                        {!selectedLocationId && (
                          <small className="text-warning">
                            Please select a location
                          </small>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Select Staff <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${
                            !selectedStaffId ? "border-warning" : ""
                          }`}
                          value={selectedStaffId}
                          onChange={(e) => setSelectedStaffId(e.target.value)}
                        >
                          <option value="">Choose Staff...</option>
                          {isClient &&
                            staff &&
                            staff?.map((staffMember: Staff) => (
                              <option
                                key={staffMember.id}
                                value={staffMember.id}
                              >
                                {staffMember.name}
                              </option>
                            ))}
                        </select>
                        {!selectedStaffId && (
                          <small className="text-warning">
                            Please select a staff member
                          </small>
                        )}
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
              selectedLocationId={selectedLocationId}
              selectedStaffId={selectedStaffId}
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
