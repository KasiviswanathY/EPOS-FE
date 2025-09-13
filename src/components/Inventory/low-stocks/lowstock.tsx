"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Table from "@/core/common/pagination/datatable";
import EditLowStock from "@/core/modals/inventory/editlowstock";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { deleteLowStock, getAllLowStocks } from "@/lib/redux/actions/lowStockAction";
import { Stock } from "@/core/interfaces/Stock"; // ✅ Import your Stock interface

export default function LowStockComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { lowStocks, loading, error } = useSelector(
    (state: RootState) => state.lowstock
  );

  useEffect(() => {
    dispatch(getAllLowStocks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteLowStock(id)).then(() => dispatch(getAllLowStocks()));
  };

  // ✅ Updated columns to only include 6 fields
  const columns = [
    {
      title: "Product Name",
      dataIndex: "product",
      render: (product: Stock["product"]) => product?.name || "-",
      sorter: (a: Stock, b: Stock) =>
        (a.product?.name || "").localeCompare(b.product?.name || ""),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (location: Stock["location"]) => location?.name || "-",
      sorter: (a: Stock, b: Stock) =>
        (a.location?.name || "").localeCompare(b.location?.name || ""),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a: Stock, b: Stock) => a.quantity - b.quantity,
    },
    {
      title: "Min Stock Level",
      dataIndex: "minStockLevel",
      sorter: (a: Stock, b: Stock) => a.minStockLevel - b.minStockLevel,
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      render: (_: any, record: Stock) => record.product?.salePrice ?? "-",
      sorter: (a: Stock, b: Stock) =>
        (a.product?.salePrice || 0) - (b.product?.salePrice || 0),
    },
    {
      title: "Low Stock",
      dataIndex: "isLowStock",
      render: (isLowStock: boolean) =>
        isLowStock ? (
          <span className="text-danger fw-bold">Yes</span>
        ) : (
          <span className="text-success fw-bold">No</span>
        ),
      sorter: (a: Stock, b: Stock) =>
        Number(a.isLowStock) - Number(b.isLowStock),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: Stock) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-stock"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              href="#"
              className="p-2"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => handleDelete(record.id)}
            >
              <i data-feather="trash-2" className="feather-trash-2"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title me-auto">
              <h4 className="fw-bold">Low Stocks</h4>
              <h6>Manage your low stocks</h6>
            </div>
            <ul className="table-top-head low-stock-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <Link
                  href="#"
                  className="btn btn-secondary w-auto shadow-none"
                  data-bs-toggle="modal"
                  data-bs-target="#send-email"
                >
                  <i data-feather="mail" className="feather-mail me-1" />
                  Send Email
                </Link>
              </li>
            </ul>
          </div>

          <div className="table-tab">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
              {/* Filters remain unchanged */}
            </div>

            <div className="tab-content" id="pills-tabContent">
              {/* ✅ Low Stock Tab */}
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
              >
                <div className="card table-list-card">
                  <div className="card-body">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!loading && !error && (
                      <div className="table-responsive">
                        <Table columns={columns} dataSource={lowStocks || []} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ✅ Out of Stocks tab remains unchanged */}
              <div className="tab-pane fade" id="pills-profile" role="tabpanel">
                <div className="card table-list-card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table columns={columns} dataSource={[]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* ✅ Modals */}
      <div className="modal fade" id="send-email">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="success-email-send modal-body text-center">
              <span className="rounded-circle d-inline-flex p-2 bg-success-transparent mb-2">
                <i className="ti ti-checks fs-24 text-success" />
              </span>
              <h4 className="fs-20 fw-semibold">Success</h4>
              <p>Email Sent Successfully</p>
              <Link
                href="#"
                className="btn btn-primary p-1 px-2 fs-13 fw-normal"
                data-bs-dismiss="modal"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>

      <EditLowStock />
      <CommonDeleteModal />
    </div>
  );
}
