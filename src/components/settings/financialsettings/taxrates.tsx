"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import SettingsSideBar from "../settingssidebar";
import AddTaxRates from "@/core/modals/settings/addtaxrates";
import EditTaxRates from "@/core/modals/settings/edittaxrates";
import { deleteTaxRate, getAllTaxRates, TaxRate } from "@/lib/redux/actions/taxratesAction";

export default function TaxRatesComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { taxRates, loading, page, totalPages } = useSelector(
    (state: RootState) => state.taxrates
  );

  const [taxToEdit, setTaxToEdit] = useState<TaxRate | null>(null);
  const [taxToDelete, setTaxToDelete] = useState<TaxRate | null>(null);

  useEffect(() => {
    dispatch(getAllTaxRates());
  }, [dispatch]);

  const refetchData = (pageNum = page) => {
    dispatch(getAllTaxRates());
  };

  const handleDeleteConfirm = () => {
    if (taxToDelete) {
      dispatch(deleteTaxRate(taxToDelete.id)).then(() => {
        setTaxToDelete(null);
        refetchData();
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    refetchData(newPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="card flex-fill mb-0 w-50">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4>Tax Rates</h4>
                    <Link
                      href="#"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#add-tax"
                    >
                      <i className="ti ti-circle-plus me-1" />
                      Add New Tax Rate
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table border">
                        <thead className="thead-light">
                          <tr>
                            <th>Tax Name</th>
                            <th>Tax Rate</th>
                            <th>Created On</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {loading && (
                            <tr>
                              <td colSpan={4} className="text-center">
                                Loading...
                              </td>
                            </tr>
                          )}
                          {!loading &&
                            taxRates.map((tax) => (
                              <tr key={tax.id}>
                                <td>{tax.name}</td>
                                <td>{tax.percentage}%</td>
                                <td>{formatDate(tax.createdAt)}</td>
                                <td className="action-table-data justify-content-end">
                                  <div className="edit-delete-action">
                                    <Link
                                      className="me-2 p-2"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-tax"
                                      onClick={() => setTaxToEdit(tax)}
                                    >
                                      <i
                                        data-feather="edit"
                                        className="feather-edit"
                                      />
                                    </Link>
                                    <Link
                                      className="p-2"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete-modal"
                                      onClick={() => setTaxToDelete(tax)}
                                    >
                                      <i
                                        data-feather="trash-2"
                                        className="feather-trash-2"
                                      />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {!loading && taxRates.length === 0 && (
                            <tr>
                              <td colSpan={4} className="text-center">
                                No tax rates found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        className="btn btn-outline-primary"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        Previous
                      </button>
                      <span>
                        Page {page} of {totalPages}
                      </span>
                      <button
                        className="btn btn-outline-primary"
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTaxRates onAddSuccess={() => refetchData()} />
      <EditTaxRates
        taxToEdit={taxToEdit}
        onClose={() => setTaxToEdit(null)}
        onEditSuccess={() => refetchData()}
      />

      {/* Delete Modal */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Tax Rate</h4>
                <p>
                  Are you sure you want to delete "
                  <strong>{taxToDelete?.name}</strong>"?
                </p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={handleDeleteConfirm}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
