"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  createReceipt,
  fetchReceiptByCompanyId,
  updateReceipt,
} from "@/lib/redux/actions/receiptsActions";
import { getAllCompanies } from "@/lib/redux/actions/companiesActions";
import { Receipt } from "@/core/interfaces/Receipt";
import { getErrorMessage } from "@/core/utils/errorUtils";

import { useRouter } from "next/navigation";
import { updateCompanyState } from "@/lib/redux/slices/companySlice";

type ReceiptFormValues = {
  name: string;
  displayName: string;
  taxNumber: string;
  email: string;
  website: string;
  refundDays: number;
  message: string;
  showTaxBreakdown: boolean;
  sendEmailReceipt: boolean;
  showCustomerBalance: boolean;
  printCustomerAddress: boolean;
  showItemNodes: boolean;
  groupItemsByPromotions: boolean;
  groupItemOnPrint: boolean;
  useProductNameOnPrint: boolean;
  showBarCode: boolean;
  showProductName: boolean;
  showProductDescription: boolean;
  customFontSize: number;
  barCodeType: string;
  qrCodeLink: string;
  qrCodeDescription: string;
  guid: string;
  companyId: string;
};

export default function ReceiptsComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { company, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );
  const { loading, error, success } = useSelector(
    (state: RootState) => state.receipts
  );

  const [receiptId, setReceiptId] = useState<string | null>(null);
  const hasFetchedCompanies = useRef(false);

  console.log("company", company);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReceiptFormValues>();

  useEffect(() => {
    if (!company && !companyLoading && !hasFetchedCompanies.current) {
      dispatch(getAllCompanies())
        .unwrap()
        .then((companies) => {
          if (companies && companies.length > 0) {
            const firstCompany = companies[0];
            dispatch(updateCompanyState(firstCompany));
          }
        })
        .catch((error) => {
          console.error("Failed to fetch companies:", getErrorMessage(error));
          hasFetchedCompanies.current = false;
        });
    }
  }, []);

  useEffect(() => {
    if (company?.id) {
      dispatch(fetchReceiptByCompanyId({ companyId: company.id }))
        .unwrap()
        .then((fetchedReceipt) => {
          if (fetchedReceipt) {
            Object.keys(fetchedReceipt).forEach((key) => {
              if (
                fetchedReceipt[key as keyof Receipt] !== null &&
                fetchedReceipt[key as keyof Receipt] !== undefined
              ) {
                setValue(
                  key as keyof ReceiptFormValues,
                  fetchedReceipt[key as keyof Receipt] as
                    | string
                    | number
                    | boolean
                );
              }
            });
            setReceiptId(fetchedReceipt.id || null);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch receipt:", getErrorMessage(error));
        });
    }
  }, [dispatch, company?.id, setValue]);

  // Pre-fill company details
  useEffect(() => {
    if (company) {
      setValue("name", company.name || "");
      setValue("taxNumber", company.taxNumber || "");
    }
  }, [company, setValue]);

  const onSubmit = (data: ReceiptFormValues) => {
    if (!company || !company.id) {
      alert("Company ID is missing or company not loaded yet!");
      return;
    }

    const {
      name,
      displayName,
      taxNumber,
      email,
      website,
      refundDays,
      message,
      showTaxBreakdown,
      sendEmailReceipt,
      showCustomerBalance,
      printCustomerAddress,
      showItemNodes,
      groupItemsByPromotions,
      groupItemOnPrint,
      useProductNameOnPrint,
      showBarCode,
      showProductName,
      showProductDescription,
      customFontSize,
      barCodeType,
      qrCodeLink,
      qrCodeDescription,
      guid,
    } = data;

    const payload = {
      name,
      displayName,
      taxNumber,
      email,
      website,
      refundDays: Number(refundDays),
      message,
      showTaxBreakdown,
      sendEmailReceipt,
      showCustomerBalance,
      printCustomerAddress,
      showItemNodes,
      groupItemsByPromotions,
      groupItemOnPrint,
      useProductNameOnPrint,
      showBarCode,
      showProductName,
      showProductDescription,
      customFontSize: Number(customFontSize),
      barCodeType,
      qrCodeLink,
      qrCodeDescription,
      guid,
      companyId: company?.id,
    };

    if (receiptId) {
      dispatch(updateReceipt({ id: receiptId, data: payload }))
        .unwrap()
        .then(() => {
          console.log("Receipt updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update receipt:", getErrorMessage(error));
        });
    } else {
      dispatch(createReceipt(payload))
        .unwrap()
        .then((newReceipt) => {
          if (newReceipt?.id) setReceiptId(newReceipt.id);
          console.log("Receipt created successfully");
        })
        .catch((error) => {
          console.error("Failed to create receipt:", getErrorMessage(error));
        });
    }
  };

  const handleCancel = () => {
    router.push("/index");
  };

  if (companyLoading || (!company && !hasFetchedCompanies.current)) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading company details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!company?.id && hasFetchedCompanies.current && !companyLoading) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="alert alert-warning text-center mt-5">
            <h5>No Company Found</h5>
            <p>Please create a company first before setting up receipts.</p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/company-details")}
            >
              Go to Companies
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!company?.id) {
    return <p className="text-center mt-5">Loading company details...</p>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        {error && (
          <div className="alert alert-danger" role="alert">
            {getErrorMessage(error)}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            Receipt saved successfully!
          </div>
        )}
        <div className="card">
          <div className="card-header fw-bold">Receipt Settings</div>
          <div className="card-body">
            {loading && <div className="text-center">Loading...</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Text Fields */}
              {[
                { label: "Company Name", name: "name" },
                { label: "Display Name", name: "displayName" },
                { label: "Tax Number", name: "taxNumber" },
                { label: "Email", name: "email" },
                { label: "Website", name: "website" },
                { label: "Message", name: "message" },
                { label: "QR Code Link", name: "qrCodeLink" },
                { label: "QR Description", name: "qrCodeDescription" },
              ].map((field) => (
                <div className="row align-items-center mb-3" key={field.name}>
                  <label className="col-sm-3 col-form-label text-end">
                    {field.label}
                  </label>
                  <div className="col-sm-6">
                    <input
                      {...register(field.name as keyof ReceiptFormValues, {
                        required:
                          field.name === "name"
                            ? "Company name is required"
                            : false,
                      })}
                      className="form-control"
                      type="text"
                    />
                    {errors[field.name as keyof ReceiptFormValues] && (
                      <div className="text-danger small mt-1">
                        {errors[field.name as keyof ReceiptFormValues]?.message}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Numbers */}
              {[
                { label: "Refund Days", name: "refundDays" },
                { label: "Custom Font Size", name: "customFontSize" },
              ].map((field) => (
                <div className="row align-items-center mb-3" key={field.name}>
                  <label className="col-sm-3 col-form-label text-end">
                    {field.label}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="number"
                      {...register(field.name as keyof ReceiptFormValues)}
                      className="form-control"
                    />
                  </div>
                </div>
              ))}

              {/* Barcode Type */}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">
                  Barcode Type
                </label>
                <div className="col-sm-6">
                  <select {...register("barCodeType")} className="form-select">
                    <option value="CODE128">CODE128</option>
                    <option value="QRCODE">QR Code</option>
                    <option value="EAN13">EAN-13</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              {[
                { name: "showTaxBreakdown", label: "Show Tax Breakdown" },
                { name: "sendEmailReceipt", label: "Send Email Receipt" },
                { name: "showCustomerBalance", label: "Show Customer Balance" },
                {
                  name: "printCustomerAddress",
                  label: "Print Customer Address",
                },
                { name: "showItemNodes", label: "Show Item Notes" },
                {
                  name: "groupItemsByPromotions",
                  label: "Group Items by Promotions",
                },
                { name: "groupItemOnPrint", label: "Group Items on Print" },
                {
                  name: "useProductNameOnPrint",
                  label: "Use Product Name on Print",
                },
                { name: "showBarCode", label: "Show Barcode" },
                { name: "showProductName", label: "Show Product Name" },
                {
                  name: "showProductDescription",
                  label: "Show Product Description",
                },
              ].map((checkbox) => (
                <div className="row mb-2" key={checkbox.name}>
                  <div className="offset-sm-3 col-sm-9">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...register(checkbox.name as keyof ReceiptFormValues)}
                      />
                      <label className="form-check-label">
                        {checkbox.label}
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {/* GUID */}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">GUID</label>
                <div className="col-sm-6 pt-1">
                  <span className="text-muted">
                    {receiptId || "Auto-generated"}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="card-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {receiptId ? "SAVE" : "CREATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
