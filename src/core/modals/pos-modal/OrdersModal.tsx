"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Order } from "@/core/interfaces/Order";
import { getOrders } from "@/lib/redux/actions/orderActions";

const OrdersModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const filteredOrders =
    (orders?.length &&
      orders?.filter((order: Order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
    [];

  const getFilteredOrdersByStatus = (status: Order["status"]) => {
    return (
      filteredOrders?.filter((order: Order) => order.status === status) || []
    );
  };

  const renderOrderCard = (order: Order) => (
    <div className="card bg-light mb-3" key={order.id}>
      <div className="card-body">
        <h6 className="mb-2">Order #{order.orderNumber}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted d-block">Status: {order.status}</small>
            <small className="text-muted d-block">
              Date: {new Date(order.orderDate).toLocaleString()}
            </small>
          </div>
          <div className="d-flex gap-2">
            <Link href="#" className="btn btn-sm btn-orange">
              Open
            </Link>
            <Link
              href="#"
              className="btn btn-sm btn-teal"
              data-bs-dismiss="modal"
              data-bs-toggle="modal"
              data-bs-target="#products"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="modal fade pos-modal"
      id="orders"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Orders</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="tabs-sets">
              <ul className="nav nav-tabs" id="myTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pending-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pending"
                    type="button"
                    aria-controls="pending"
                    aria-selected="true"
                    role="tab"
                  >
                    Pending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="completed-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#completed"
                    type="button"
                    aria-controls="completed"
                    aria-selected="false"
                    role="tab"
                  >
                    Completed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="cancelled-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#cancelled"
                    type="button"
                    aria-controls="cancelled"
                    aria-selected="false"
                    role="tab"
                  >
                    Cancelled
                  </button>
                </li>
              </ul>
              <div className="tab-content pt-3">
                <div className="input-icon-start pos-search position-relative mb-3">
                  <span className="input-icon-addon">
                    <i className="ti ti-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Order"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {loading ? (
                  <div className="text-center py-4">Loading orders...</div>
                ) : (
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="pending"
                      role="tabpanel"
                    >
                      <div className="order-body">
                        {getFilteredOrdersByStatus("PENDING").length > 0 ? (
                          getFilteredOrdersByStatus("PENDING").map(
                            renderOrderCard
                          )
                        ) : (
                          <div className="text-center py-3">
                            No pending orders found
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="completed"
                      role="tabpanel"
                    >
                      <div className="order-body">
                        {getFilteredOrdersByStatus("COMPLETED").length > 0 ? (
                          getFilteredOrdersByStatus("COMPLETED").map(
                            renderOrderCard
                          )
                        ) : (
                          <div className="text-center py-3">
                            No completed orders found
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="cancelled"
                      role="tabpanel"
                    >
                      <div className="order-body">
                        {getFilteredOrdersByStatus("CANCELLED").length > 0 ? (
                          getFilteredOrdersByStatus("CANCELLED").map(
                            renderOrderCard
                          )
                        ) : (
                          <div className="text-center py-3">
                            No cancelled orders found
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
