"use client"
/* eslint-disable @next/next/no-img-element */
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import CommonFooter from "@/core/common/footer/commonFooter";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import SalesDayChart from "../charts/salesdaychart";
import CustomerChart from "../charts/customerchart";
import SalesStatisticsChart from "../charts/salesstatisticschart";
import TopCategoryChart from "../charts/topcategory";
import HeatmapChart from "../charts/heartchat";
import { useDispatch, useSelector } from "react-redux";
import { getAllLowStocks } from "@/lib/redux/actions/lowStockAction";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { Stock } from "@/core/interfaces/Stock";
import { getOrders } from "@/lib/redux/actions/orderActions";

export default function NewDashboard() {
    const route = all_routes

    const dispatch = useDispatch<AppDispatch>();
  const { lowStocks, loading, error } = useSelector(
    (state: RootState) => state.lowstock
  );

const { orders, loading: ordersLoading, error: ordersError } = useSelector(
  (state: RootState) => state.orders
);

useEffect(() => {
  dispatch(getAllLowStocks());
  dispatch(getOrders()); // fetch recent sales data
}, [dispatch]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
          <div className="mb-3">
            <h1 className="mb-1">Welcome, Admin</h1>
            <p className="fw-medium">
              You have <span className="text-primary fw-bold">200+</span>{" "}
              Orders, Today
            </p>
          </div>
          <div className="input-icon-start position-relative mb-3">
            <span className="input-icon-addon fs-16 text-gray-9">
              <i className="ti ti-calendar" />
            </span>
            <PredefinedDateRanges />
          </div>
        </div>
        <div className="alert bg-orange-transparent alert-dismissible fade show mb-4">
          <div>
            <span>
              {" "}
              <i className="ti ti-info-circle fs-14 text-orange me-2" /> Your
              Product{" "}
            </span>
            <span className="text-orange fw-semibold">
              {" "}
              Apple Iphone 15 is running Low,{" "}
            </span>{" "}
            already below 5 Pcs.,
            <Link
              href="#"
              className="link-orange text-decoration-underline fw-semibold"
              data-bs-toggle="modal"
              data-bs-target="#add-stock"
            >
              Add Stock
            </Link>
          </div>
          <button
            type="button"
            className="btn-close text-gray-9 fs-14"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-skyblue sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-primary">
                  <i className="ti ti-file-text fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Sales</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">$48,988,078</h4>
                    <span className="badge badge-soft-primary">
                      <i className="ti ti-arrow-up me-1" />
                      +22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-secondary sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-secondary">
                  <i className="ti ti-repeat fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Sales Return</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">$16,478,145</h4>
                    <span className="badge badge-soft-danger">
                      <i className="ti ti-arrow-down me-1" />
                      -22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-teal sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-teal">
                  <i className="ti ti-gift fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Purchase</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">$24,145,789</h4>
                    <span className="badge badge-soft-success">
                      <i className="ti ti-arrow-up me-1" />
                      +22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-info sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-info">
                  <i className="ti ti-brand-pocket fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Purchase Return</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">$18,458,747</h4>
                    <span className="badge badge-soft-success">
                      <i className="ti ti-arrow-up me-1" />
                      +22%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Profit */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1">$8,458,798</h4>
                    <p>Profit</p>
                  </div>
                  <span className="revenue-icon bg-cyan-transparent text-cyan">
                    <i className="fa-solid fa-layer-group fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-success">+35%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={all_routes.profitloss}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Profit */}
          {/* Invoice */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1">$48,988,78</h4>
                    <p>Invoice Due</p>
                  </div>
                  <span className="revenue-icon bg-teal-transparent text-teal">
                    <i className="ti ti-chart-pie fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-success">+35%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={route.invoicereport}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Invoice */}
          {/* Expenses */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1">$8,980,097</h4>
                    <p>Total Expenses</p>
                  </div>
                  <span className="revenue-icon bg-orange-transparent text-orange">
                    <i className="ti ti-lifebuoy fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-success">+41%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={route.expenselist}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Expenses */}
          {/* Returns */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1">$78,458,798</h4>
                    <p>Total Payment Returns</p>
                  </div>
                  <span className="revenue-icon bg-indigo-transparent text-indigo">
                    <i className="ti ti-hash fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-danger">-20%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={route.salesreport}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Returns */}
        </div>
        <div className="row">
          <>
            {/* Sales & Purchase */}
            <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-inline-flex align-items-center">
                    <span className="title-icon bg-soft-primary fs-16 me-2">
                      <i className="ti ti-shopping-cart" />
                    </span>
                    <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
                  </div>
                  <ul className="nav btn-group custom-btn-group">
                    <Link className="btn btn-outline-light" href="#">
                      1D
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      1W
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      1M
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      3M
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      6M
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      1Y
                    </Link>
                  </ul>
                </div>
                <div className="card-body pb-0">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="border p-2 br-8">
                        <p className="d-inline-flex align-items-center mb-1">
                          <i className="ti ti-circle-filled fs-8 text-primary-300 me-1" />
                          Total Purchase
                        </p>
                        <h4>3K</h4>
                      </div>
                      <div className="border p-2 br-8">
                        <p className="d-inline-flex align-items-center mb-1">
                          <i className="ti ti-circle-filled fs-8 text-primary me-1" />
                          Total Sales
                        </p>
                        <h4>1K</h4>
                      </div>
                    </div>
                    <div id="sales-daychart">
                     <SalesDayChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Sales & Purchase */}
          </>

          {/* Top Selling Products */}
          <div className="col-xxl-4 col-xl-5 d-flex">
            <div className="card flex-fill">
              <div className="card-header">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-info fs-16 me-2">
                    <i className="ti ti-info-circle" />
                  </span>
                  <h5 className="card-title mb-0">Overall Information</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-info fs-24">
                        <i className="ti ti-user-check" />
                      </div>
                      <p className="mb-1">Suppliers</p>
                      <h5>6987</h5>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-orange fs-24">
                        <i className="ti ti-users" />
                      </div>
                      <p className="mb-1">Customer</p>
                      <h5>4896</h5>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-teal fs-24">
                        <i className="ti ti-shopping-cart" />
                      </div>
                      <p className="mb-1">Orders</p>
                      <h5>487</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer pb-sm-0">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <h6>Customers Overview</h6>
                  <div className="dropdown dropdown-wraper">
                    <Link
                      href="#"
                      className="dropdown-toggle btn btn-sm"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-calendar me-1" />
                      Today
                    </Link>
                    <ul className="dropdown-menu p-3">
                      <li>
                        <Link href="#" className="dropdown-item">
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item">
                          Weekly
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item">
                          Monthly
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-5">
                    <div id="customer-chart">
                      <CustomerChart />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="row gx-0">
                      <div className="col-sm-6">
                        <div className="text-center border-end">
                          <h2 className="mb-1">5.5K</h2>
                          <p className="text-orange mb-2">First Time</p>
                          <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                            <i className="ti ti-arrow-up-left me-1" />
                            25%
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-center">
                          <h2 className="mb-1">3.5K</h2>
                          <p className="text-teal mb-2">Return</p>
                          <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                            <i className="ti ti-arrow-up-left me-1" />
                            21%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Top Selling Products */}
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-pink fs-16 me-2">
                    <i className="ti ti-box" />
                  </span>
                  <h5 className="card-title mb-0">Top Selling Products</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    Today
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        Today
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Weekly
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Monthly
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body sell-product">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-01.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Charger Cable - Lighting</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$187</p>
                        <p>247+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-16.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Yves Saint Eau De Parfum</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$145</p>
                        <p>289+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-03.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Apple Airpods 2</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$458</p>
                        <p>300+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-04.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Vacuum Cleaner</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$139</p>
                        <p>225+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-danger badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-down-left me-1" />
                    21%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-05.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Samsung Galaxy S21 Fe 5g</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$898</p>
                        <p>365+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Top Selling Products */}
          {/* Low Stock Products */}
     

{/* Low Stock Products */}
<div className="col-xxl-4 col-md-6 d-flex">
  <div className="card flex-fill shadow-sm">
    <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div className="d-inline-flex align-items-center">
        <span className="title-icon bg-soft-danger fs-16 me-2 rounded-circle p-2">
          <i className="ti ti-alert-triangle text-danger" />
        </span>
        <h5 className="card-title mb-0">Low Stock Products</h5>
      </div>
      <Link
        href={route.lowstock}
        className="fs-13 fw-bold text-decoration-underline text-primary"
      >
        View All
      </Link>
    </div>

    <div className="card-body">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && lowStocks.length === 0 && (
        <p className="text-muted">No low stock items found.</p>
      )}

      {/* ✅ Explicitly type item as Stock */}
      {lowStocks.slice(0, 5).map((item: Stock) => {
        const { id, product, quantity, location, minStockLevel } = item;
        const isCritical = quantity <= minStockLevel / 2;
        return (
          <div
            key={id}
            className="d-flex justify-content-between align-items-center py-2 border-bottom"
          >
            {/* Product and Location */}
            <div>
              <h6 className="fw-semibold mb-1 text-dark">
                {product?.name || "Unnamed Product"}
              </h6>
              <span className="badge bg-light text-muted me-2">
                {location?.name || "Unknown Location"}
              </span>
            </div>

            {/* Quantity Badge */}
            <div className="text-end">
              <span
                className={`badge px-3 py-2 rounded-pill fw-semibold ${
                  isCritical ? "bg-danger text-white" : "bg-warning text-dark"
                }`}
              >
                {quantity ?? 0} in stock
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

          {/* /Low Stock Products */}
   {/* Recent Sales */}
<div className="col-xxl-4 col-md-12 d-flex">
  <div className="card flex-fill">
    <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div className="d-inline-flex align-items-center">
        <span className="title-icon bg-soft-pink fs-16 me-2">
          <i className="ti ti-box" />
        </span>
        <h5 className="card-title mb-0">Recent Sales</h5>
      </div>
      <div className="dropdown">
        <Link
          href="#"
          className="dropdown-toggle btn btn-sm btn-white"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="ti ti-calendar me-1" />
          Weekly
        </Link>
        <ul className="dropdown-menu p-3">
          <li><Link href="#" className="dropdown-item">Today</Link></li>
          <li><Link href="#" className="dropdown-item">Weekly</Link></li>
          <li><Link href="#" className="dropdown-item">Monthly</Link></li>
        </ul>
      </div>
    </div>

    <div className="card-body">
      {loading && <p>Loading...</p>}
      {!loading && (!orders || orders.length === 0) && <p>No recent sales</p>}

      {!loading &&
        [...orders]
          .sort(
            (a, b) =>
              new Date(b.orderDate).getTime() -
              new Date(a.orderDate).getTime()
          )
          .slice(0, 5)
          .map((order) => {
            const firstItem = order.orderItems?.[0];
            const product = firstItem?.product;

            const imageUrl =
              product?.images?.find((img: { isPrimary: any; }) => img.isPrimary)?.imageUrl ||
              product?.images?.[0]?.imageUrl ||
              "assets/img/products/default.jpg";

            const amount = firstItem?.totalPrice?.toFixed(2) ?? "0.00";

            const badgeClass = {
              PENDING: "bg-purple",
              CONFIRMED: "badge-info",
              PROCESSING: "badge-warning",
              COMPLETED: "badge-success",
              CANCELLED: "badge-danger",
              REFUNDED: "badge-secondary",
            }[order.status] ?? "bg-secondary";

            return (
              <div
                key={order.id}
                className="d-flex align-items-center justify-content-between mb-4"
              >
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-lg">
                    <img src={imageUrl} alt={product?.name || "Product"} />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fw-bold mb-1">
                      <Link href="#">{product?.name || "Unnamed Product"}</Link>
                    </h6>
                    <div className="d-flex align-items-center item-list">
                      <p>{product?.category?.name || "General"}</p>
                      <p className="text-gray-9 ms-2">${amount}</p>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <p className="fs-13 mb-1">
                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <span
                    className={`badge ${badgeClass} badge-xs d-inline-flex align-items-center`}
                  >
                    <i className="ti ti-circle-filled fs-5 me-1" />
                    {order.status}
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  </div>
</div>

          {/* /Recent Sales */}
        </div>
        <div className="row">
          {/* Sales Statics */}
          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-danger fs-16 me-2">
                    <i className="ti ti-alert-triangle" />
                  </span>
                  <h5 className="card-title mb-0">Sales Statics</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    2025
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        2025
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        2022
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        2021
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body pb-0">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <div className="border p-2 br-8">
                    <h5 className="d-inline-flex align-items-center text-teal">
                      $12,189
                      <span className="badge badge-success badge-xs d-inline-flex align-items-center ms-2">
                        <i className="ti ti-arrow-up-left me-1" />
                        25%
                      </span>
                    </h5>
                    <p>Revenue</p>
                  </div>
                  <div className="border p-2 br-8">
                    <h5 className="d-inline-flex align-items-center text-orange">
                      $48,988,078
                      <span className="badge badge-danger badge-xs d-inline-flex align-items-center ms-2">
                        <i className="ti ti-arrow-down-right me-1" />
                        25%
                      </span>
                    </h5>
                    <p>Expense</p>
                  </div>
                </div>
                <div id="sales-statistics">
                  <SalesStatisticsChart />
                </div>
              </div>
            </div>
          </div>
          {/* /Sales Statics */}
          {/* Recent Transactions */}
          {/* ---------- RECENT TRANSACTIONS CARD ---------- */}
<div className="col-xl-6 col-sm-12 col-12 d-flex">
  <div className="card flex-fill">
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-3">
      <div className="d-inline-flex align-items-center">
        <span className="title-icon bg-soft-orange fs-16 me-2">
          <i className="ti ti-flag" />
        </span>
        <h5 className="card-title mb-0">Recent Transactions</h5>
      </div>
      <Link
        href={route.onlineorder}
        className="fs-13 fw-medium text-decoration-underline"
      >
        View All
      </Link>
    </div>

    <div className="card-body p-0">
      <ul className="nav nav-tabs nav-justified transaction-tab">
        <li className="nav-item">
          <Link className="nav-link active" href="#sale" data-bs-toggle="tab">
            Sale
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#purchase-transaction" data-bs-toggle="tab">
            Purchase
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#quotation" data-bs-toggle="tab">
            Quotation
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#expenses" data-bs-toggle="tab">
            Expenses
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#invoices" data-bs-toggle="tab">
            Invoices
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        {/* ---- SALE TAB (dynamic orders) ---- */}
        <div className="tab-pane show active" id="sale">
          <div className="table-responsive">
            <table className="table table-borderless custom-table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Order #</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ordersLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-3">Loading...</td>
                  </tr>
                ) : ordersError ? (
                  <tr>
                    <td colSpan={4} className="text-danger text-center py-3">
                      {ordersError}
                    </td>
                  </tr>
                ) : orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>#{order.orderNumber}</td>
                      <td>
                        <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                          <i className="ti ti-circle-filled fs-5 me-1" />
                          {order.status}
                        </span>
                      </td>
                      <td className="fs-16 fw-bold text-gray-9">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-3">
                      No recent transactions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- PURCHASE TAB ---- */}
        <div className="tab-pane fade" id="purchase-transaction">
          <div className="table-responsive">
            <table className="table table-borderless custom-table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Vendor</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    No purchase transactions
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- QUOTATION TAB ---- */}
        <div className="tab-pane fade" id="quotation">
          <div className="table-responsive">
            <table className="table table-borderless custom-table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Quote #</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    No quotations
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- EXPENSES TAB ---- */}
        <div className="tab-pane fade" id="expenses">
          <div className="table-responsive">
            <table className="table table-borderless custom-table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    No expenses recorded
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- INVOICES TAB ---- */}
        <div className="tab-pane fade" id="invoices">
          <div className="table-responsive">
            <table className="table table-borderless custom-table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Invoice #</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    No invoices available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* /Recent Transactions */}
        </div>
        <div className="row">
          {/* Top Customers */}
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-orange fs-16 me-2">
                    <i className="ti ti-users" />
                  </span>
                  <h5 className="card-title mb-0">Top Customers</h5>
                </div>
                <Link
                  href={route.customer}
                  className="fs-13 fw-medium text-decoration-underline"
                >
                  View All
                </Link>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer11.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Carlos Curran</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          USA
                        </p>
                        <p>24 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$8,9645</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer12.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Stan Gaunter</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          UAE
                        </p>
                        <p>22 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$16,985</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer13.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Richard Wilson</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          Germany
                        </p>
                        <p>14 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$5,366</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer14.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Mary Bronson</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          Belgium
                        </p>
                        <p>08 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$4,569</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer15.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Annie Tremblay</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          Greenland
                        </p>
                        <p>14 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$3,5698</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Top Customers */}
          {/* Top Categories */}
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-orange fs-16 me-2">
                    <i className="ti ti-users" />
                  </span>
                  <h5 className="card-title mb-0">Top Categories</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white d-flex align-items-center"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    Weekly
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        Today
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Weekly
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Monthly
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 mb-4">
                  <div>
                    <TopCategoryChart />
                  </div>
                  <div>
                    <div className="category-item category-primary">
                      <p className="fs-13 mb-1">Electronics</p>
                      <h2 className="d-flex align-items-center">
                        698
                        <span className="fs-13 fw-normal text-default ms-1">
                          Sales
                        </span>
                      </h2>
                    </div>
                    <div className="category-item category-orange">
                      <p className="fs-13 mb-1">Sports</p>
                      <h2 className="d-flex align-items-center">
                        545
                        <span className="fs-13 fw-normal text-default ms-1">
                          Sales
                        </span>
                      </h2>
                    </div>
                    <div className="category-item category-secondary">
                      <p className="fs-13 mb-1">Lifestyles</p>
                      <h2 className="d-flex align-items-center">
                        456
                        <span className="fs-13 fw-normal text-default ms-1">
                          Sales
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <h6 className="mb-2">Category Statistics</h6>
                <div className="border br-8">
                  <div className="d-flex align-items-center justify-content-between border-bottom p-2">
                    <p className="d-inline-flex align-items-center mb-0">
                      <i className="ti ti-square-rounded-filled text-indigo fs-8 me-2" />
                      Total Number Of Categories
                    </p>
                    <h5>698</h5>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2">
                    <p className="d-inline-flex align-items-center mb-0">
                      <i className="ti ti-square-rounded-filled text-orange fs-8 me-2" />
                      Total Number Of Products
                    </p>
                    <h5>7899</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Top Categories */}
          {/* Order Statistics */}
          <div className="col-xxl-4 col-md-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-indigo fs-16 me-2">
                    <i className="ti ti-package" />
                  </span>
                  <h5 className="card-title mb-0">Order Statistics</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    Weekly
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        Today
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Weekly
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Monthly
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body pb-0">
                <div id="heat_chart">
                 <HeatmapChart />
                </div>
              </div>
            </div>
          </div>
          {/* /Order Statistics */}
        </div>
      </div>
     <CommonFooter />
    </div>
  );
}
