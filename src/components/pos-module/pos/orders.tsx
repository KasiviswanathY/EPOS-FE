/* eslint-disable @next/next/no-img-element */
import CartCounter from "@/core/common/counter/counter";
import { CartItems } from "@/core/interfaces/CartItems";
import { Product } from "@/core/interfaces/Products";
import Link from "next/link";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { createOrder } from "@/lib/redux/actions/orderActions";
import { OrderItem } from "@/core/interfaces/Order";
import { clearOrderState } from "@/lib/redux/slices/orderSlice";

const options = [{ value: "1", label: "Walk in Customer" }];

const Orders = ({
  cartItems,
  setCartItems,
  removeFromCart,
  orderTotal,
  setOrderTotal,
  selectedLocationId,
  selectedStaffId,
  onCartReset,
}: {
  cartItems: CartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  removeFromCart: (id: string) => void;
  orderTotal: number;
  setOrderTotal: React.Dispatch<React.SetStateAction<number>>;
  selectedLocationId: string;
  selectedStaffId: string;
  onCartReset?: () => void;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"CASH" | "CARD" | "CREDIT" | "BANK_TRANSFER" | "MOBILE_PAYMENT">("CASH");

  const dispatch = useDispatch<AppDispatch>();
  const {
    loading: orderLoading,
    error: orderError,
    success: orderSuccess,
    currentOrder,
  } = useSelector((state: RootState) => state.orders);

  const shippingCost = 0;
  const couponDiscount = 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalTaxRate = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return (
        total + (item?.taxRate?.percentage || 0) * 100 * (item.quantity || 0)
      );
    }, 0);
  }, [cartItems]);

  const calculateTotal = useCallback(() => {
    const itemTotal = cartItems.reduce((total, item) => {
      return total + (item.salePrice || 0) * item.quantity;
    }, 0);

    const orderTotal = itemTotal + totalTaxRate - shippingCost - couponDiscount;
    return orderTotal;
  }, [cartItems, totalTaxRate]);

  const orderTotalRaw = calculateTotal();
  const roundedOff = Math.round(orderTotalRaw * 100) / 100;
  const hasRoundoff = Math.abs(roundedOff - orderTotalRaw) > 0.001;

  const [useRoundoff, setUseRoundoff] = React.useState(false);

  React.useEffect(() => {
    setUseRoundoff(hasRoundoff);
  }, [hasRoundoff]);

  React.useEffect(() => {
    setOrderTotal(useRoundoff ? roundedOff : orderTotalRaw);
  }, [useRoundoff, orderTotalRaw, roundedOff, setOrderTotal]);

  React.useEffect(() => {
    if (orderSuccess || orderError) {
      // Scroll to top to ensure messages are visible
      window.scrollTo({ top: 0, behavior: "smooth" });

      const timer = setTimeout(() => {
        dispatch(clearOrderState());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [orderSuccess, orderError, dispatch]);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Please add items to cart before placing order");
      return;
    }

    if (!selectedLocationId) {
      alert("Please select a location before placing order");
      return;
    }

    try {
      const subTotal = cartItems.reduce((total, item) => {
        return total + (item.salePrice || 0) * item.quantity;
      }, 0);

      const orderItems: OrderItem[] = cartItems.map((item) => {
        // Calculate tax amount based on tax rate percentage
        const taxAmount = (item.taxRate?.percentage || 0) * (item.salePrice || 0) * item.quantity;
        
        return {
          productId: item.id || "",
          quantity: item.quantity,
          unitPrice: Math.round((item.salePrice || 0) * 100) / 100,
          taxAmount: Math.round(taxAmount * 100) / 100,
          discountAmount: 0, // Set default discount amount
          totalPrice: Math.round((item.salePrice || 0) * item.quantity * 100) / 100,
        };
      });

      // Prepare order data
      const orderData = {
        orderNumber: `ORD${Date.now()}`,
        status: "PENDING" as const,
        orderDate: new Date().toISOString(),
        totalAmount: Math.round(orderTotal * 100) / 100,
        subTotal: Math.round(subTotal * 100) / 100,
        taxAmount: Math.round(totalTaxRate * 100) / 100,
        discountAmount: Math.round(couponDiscount * 100) / 100,
        finalAmount: Math.round(orderTotal * 100) / 100,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: "PENDING" as const,
        notes: "",
        // customerId: null, // Optional, set if customer is selected
        locationId: selectedLocationId,
        processedByStaffId: selectedStaffId,
        orderItems: orderItems,
      };

      // Dispatch the create order action
      const result = await dispatch(createOrder(orderData)).unwrap();

      if (result) {
        // Clear cart after successful order
        setCartItems([]);
        setOrderTotal(0);
        
        // Reset cart counters
        if (onCartReset) {
          onCartReset();
        }

        // Scroll to top to show the success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Failed to place order:", error);

      // Scroll to top to show the error message
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="col-md-12 col-lg-5 col-xl-4 ps-0 theiaStickySidebar d-lg-flex">
      <aside className="product-order-list bg-secondary-transparent flex-fill">
        {orderError && (
          <div
            className="alert alert-danger alert-dismissible fade show mb-3 position-sticky top-0 shadow-sm"
            role="alert"
            style={{ zIndex: 100 }}
          >
            <strong>Order Error:</strong> {orderError}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearOrderState())}
              aria-label="Close"
            ></button>
          </div>
        )}
        {orderSuccess && currentOrder && (
          <div
            className="alert alert-success alert-dismissible fade show mb-3 position-sticky top-0 shadow-sm"
            role="alert"
            style={{ zIndex: 100 }}
          >
            <strong>Success:</strong> Order placed successfully! Order ID:{" "}
            {currentOrder.id}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearOrderState())}
              aria-label="Close"
            ></button>
          </div>
        )}
        <div className="card">
          <div className="card-body">
            <div className="order-head d-flex align-items-center justify-content-between w-100">
              <div>
                <h3>Order List</h3>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge badge-dark fs-10 fw-medium badge-xs">
                  #ORD123
                </span>
                <Link className="link-danger fs-16" href="#">
                  <i className="ti ti-trash-x-filled" />
                </Link>
              </div>
            </div>
            <div className="customer-info block-section">
              <h5 className="mb-2">Customer Information</h5>
              <div className="d-flex align-items-center gap-2">
                <div className="flex-grow-1">
                  {isClient && (
                    <Select
                      options={options}
                      classNamePrefix="react-select select"
                      placeholder="Choose a Name"
                      defaultValue={options[0]}
                    />
                  )}
                </div>
                <Link
                  href="#"
                  className="btn btn-teal btn-icon fs-20"
                  data-bs-toggle="modal"
                  data-bs-target="#create"
                >
                  <i className="ti ti-user-plus" />
                </Link>
                <Link
                  href="#"
                  className="btn btn-info btn-icon fs-20"
                  data-bs-toggle="modal"
                  data-bs-target="#barcode"
                >
                  <i className="ti ti-scan" />
                </Link>
              </div>

              <div className="customer-item border border-orange bg-orange-100 d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
                <div>
                  <h6 className="fs-16 fw-bold mb-1">James Anderson</h6>
                  <div className="d-inline-flex align-items-center gap-2 customer-bonus">
                    <p className="fs-13 d-inline-flex align-items-center gap-1">
                      Bonus :
                      <span className="badge bg-cyan fs-13 fw-bold p-1">
                        148
                      </span>{" "}
                    </p>
                    <p className="fs-13 d-inline-flex align-items-center gap-1">
                      Loyality :
                      <span className="badge bg-teal fs-13 fw-bold p-1">
                        $20
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <Link href="#" className="btn btn-orange btn-sm">
                  Apply
                </Link>
                <Link href="#" className="close-icon">
                  <i className="ti ti-x" />
                </Link>
              </div>
            </div>
            <div className="product-added block-section">
              <div className="head-text d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <h5 className="me-2">Order Details</h5>
                  <div className="badge bg-light text-gray-9 fs-12 fw-semibold py-2 border rounded">
                    Items :{" "}
                    <span className="text-teal">{cartItems.length}</span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="d-flex align-items-center clear-icon fs-10 fw-medium"
                >
                  Clear all
                </Link>
              </div>
              <div className="product-wrap">
                {cartItems.length === 0 && (
                  <div className="empty-cart">
                    <div className="fs-24 mb-1">
                      <i className="ti ti-shopping-cart" />
                    </div>
                    <p className="fw-bold">No Products Selected</p>
                  </div>
                )}
                <div className="product-list border-0 p-0">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th className="fw-bold bg-light">Item</th>
                          <th className="fw-bold bg-light">QTY</th>
                          <th className="fw-bold bg-light text-end">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.length > 0 ? (
                          cartItems.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Link
                                    className="delete-icon"
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      removeFromCart(item.id || "");
                                    }}
                                  >
                                    <i className="ti ti-trash-x-filled" />
                                  </Link>
                                  <h6 className="fs-13 fw-normal">
                                    <Link
                                      href="#"
                                      className=" link-default"
                                      data-bs-toggle="modal"
                                      data-bs-target="#products"
                                    >
                                      {item.name}
                                    </Link>
                                  </h6>
                                </div>
                              </td>
                              <td>
                                <div className="qty-item m-0">
                                  <CartCounter
                                    product={item as Product}
                                    setCartItems={setCartItems}
                                    initialQuantity={item.quantity}
                                  />
                                </div>
                              </td>
                              <td className="fs-13 fw-semibold text-gray-9 text-end">
                                ${(item.salePrice || 0) * item.quantity}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="text-center">
                              No items in cart
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="discount-item d-flex align-items-center justify-content-between  bg-purple-transparent mt-3 flex-wrap gap-2">
                <div className="d-flex align-items-center">
                  <span className="bg-purple discount-icon br-5 flex-shrink-0 me-2">
                    <img src="assets/img/icons/discount-icon.svg" alt="img" />
                  </span>
                  <div>
                    <h6 className="fs-14 fw-bold text-purple mb-1">
                      Discount 5%
                    </h6>
                    <p className="mb-0">For $20 Minimum Purchase, all Items</p>
                    <p></p>
                  </div>
                </div>
                <Link href="#" className="close-icon">
                  <i className="ti ti-trash" />
                </Link>
              </div>
            </div>
            <div className="order-total bg-total bg-white p-0">
              <h5 className="mb-3">Payment Summary</h5>
              <table className="table table-responsive table-borderless">
                <tbody>
                  <tr>
                    <td>
                      Shipping
                      <Link
                        href="#"
                        className="ms-3 link-default"
                        data-bs-toggle="modal"
                        data-bs-target="#shipping-cost"
                      >
                        <i className="ti ti-edit" />
                      </Link>
                    </td>
                    <td className="text-gray-9 text-end">$0</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td className="text-gray-9 text-end">{totalTaxRate}</td>
                  </tr>
                  <tr>
                    <td>
                      Coupon
                      <Link
                        href="#"
                        className="ms-3 link-default"
                        data-bs-toggle="modal"
                        data-bs-target="#coupon-code"
                      >
                        <i className="ti ti-edit" />
                      </Link>
                    </td>
                    <td className="text-gray-9 text-end">$0</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-danger">Discount</span>
                    </td>
                    <td className="text-danger text-end">$0</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="round"
                          checked={useRoundoff}
                          disabled={!hasRoundoff}
                          onChange={(e) => setUseRoundoff(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="round">
                          Roundoff
                        </label>
                      </div>
                    </td>
                    <td className="text-gray-9 text-end">
                      {hasRoundoff
                        ? `+${(roundedOff - orderTotalRaw).toFixed(2)}`
                        : "+0.00"}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Sub Total</td>
                    <td className="text-gray-9 text-end">$60,454</td>
                  </tr> */}
                  <tr>
                    <td className="fw-bold border-top border-dashed">
                      Total Payable
                    </td>
                    <td className="text-gray-9 fw-bold text-end border-top border-dashed">
                      {orderTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card payment-method">
          <div className="card-body">
            <h5 className="mb-3">Select Payment</h5>
            <div className="row align-items-center methods g-2">
              <div className="col-sm-6 col-md-4 d-flex">
                <Link
                  href="#"
                  className="payment-item d-flex align-items-center justify-content-center p-2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#payment-cash"
                  onClick={() => {
                    setSelectedPaymentMethod("CASH");
                  }}
                >
                  <img
                    src="assets/img/icons/cash-icon.svg"
                    className="me-2"
                    alt="img"
                  />
                  <p className="fs-14 fw-medium">Cash</p>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 d-flex">
                <Link
                  href="#"
                  className="payment-item d-flex align-items-center justify-content-center p-2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#payment-card"
                  onClick={() => {
                    setSelectedPaymentMethod("CARD");
                  }}
                >
                  <img
                    src="assets/img/icons/card.svg"
                    className="me-2"
                    alt="img"
                  />
                  <p className="fs-14 fw-medium">Card</p>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 d-flex">
                <Link
                  href="#"
                  className="payment-item d-flex align-items-center justify-content-center p-2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#payment-credit"
                  onClick={() => {
                    setSelectedPaymentMethod("CREDIT");
                  }}
                >
                  <img
                    src="assets/img/icons/points.svg"
                    className="me-2"
                    alt="img"
                  />
                  <p className="fs-14 fw-medium">Credit</p>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 d-flex">
                <Link
                  href="#"
                  className="payment-item d-flex align-items-center justify-content-center p-2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#payment-bank"
                  onClick={() => {
                    setSelectedPaymentMethod("BANK_TRANSFER");
                  }}
                >
                  <img
                    src="assets/img/icons/deposit.svg"
                    className="me-2"
                    alt="img"
                  />
                  <p className="fs-14 fw-medium">Bank Transfer</p>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 d-flex">
                <Link
                  href="#"
                  className="payment-item d-flex align-items-center justify-content-center p-2 flex-fill"
                  data-bs-toggle="modal"
                  data-bs-target="#payment-mobile"
                  onClick={() => {
                    setSelectedPaymentMethod("MOBILE_PAYMENT");
                  }}
                >
                  <img
                    src="assets/img/icons/scan-icon.svg"
                    className="me-2"
                    alt="img"
                  />
                  <p className="fs-14 fw-medium">Mobile Payment</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-row d-flex align-items-center justify-content-between gap-3">
          <Link
            href="#"
            className="btn btn-white d-flex align-items-center justify-content-center flex-fill m-0"
            data-bs-toggle="modal"
            data-bs-target="#hold-order"
          >
            <i className="ti ti-printer me-2" />
            Print Order
          </Link>
          <Link
            href="#"
            className={`btn ${
              orderLoading ? "btn-warning" : "btn-secondary"
            } d-flex align-items-center justify-content-center flex-fill m-0`}
            onClick={(e) => {
              e.preventDefault();
              if (!orderLoading) {
                handlePlaceOrder();
              }
            }}
            style={{
              cursor: orderLoading ? "not-allowed" : "pointer",
            }}
          >
            <i
              className={`ti ${
                orderLoading ? "ti-loader ti-spin" : "ti-shopping-cart"
              } me-2`}
            />
            {orderLoading ? "Processing..." : "Place Order"}
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Orders;
