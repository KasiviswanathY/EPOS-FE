"use client";
/* eslint-disable @next/next/no-img-element */

import CommonFooter from "@/core/common/footer/commonFooter";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import { brandlistdata } from "@/core/json/brandlistdata";
import Link from "next/link";
import { useState } from "react";

export default function BrandListComponent() {
  const [filter, setFilter] = useState("");
  const data = brandlistdata.filter((item: any) =>
    item.brand.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div className="page-title">
              <h4 className="fw-bold">Brands</h4>
            </div>
            <div className="page-btn">
              <Link
                href="#"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add-brand"
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Brand
              </Link>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Brand or Description"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="card">
            <div className="card-body table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{ width: "100px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.brand}</td>
                      <td>{item.brand}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-brand"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#delete-modal"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-start mt-3">
                <ul className="pagination mb-0">
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><a className="page-link" href="#">5</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <CommonFooter />
      </div>
      <div className="modal fade" id="add-brand">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Brand</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Brand Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" data-bs-dismiss="modal">
                Add Brand
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit-brand">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Brand</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Brand Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" data-bs-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <CommonDeleteModal />
    </div>
  );
}
