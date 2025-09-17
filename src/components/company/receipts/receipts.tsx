"use client";

import { useEffect, useState } from "react";
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

type ReceiptFormValues = Omit<Receipt, "id" | "companyId"> & { guid: number | null };

// Auto-generate numeric GUID if left blank
const generateGuid = () => Math.floor(1000000000 + Math.random() * 9000000000);

export default function ReceiptsComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, loading: companiesLoading } = useSelector(
    (state: RootState) => state.company
  );

  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [lastFetchedReceipt, setLastFetchedReceipt] = useState<Receipt | null>(
    null
  );

  const { register, handleSubmit, reset, setValue } = useForm<ReceiptFormValues>({
    defaultValues: {
      name: "",
      displayName: "",
      taxNumber: "",
      email: "",
      website: "",
      refundDays: 7,
      message: "",
      showTaxBreakdown: false,
      sendEmailReceipt: false,
      showCustomerBalance: false,
      printCustomerAddress: false,
      showItemNodes: false,
      groupItemsByPromotions: false,
      groupItemOnPrint: false,
      useProductNameOnPrint: false,
      showBarCode: false,
      showProductName: false,
      showProductDescription: false,
      customFontSize: 14,
      barCodeType: "CODE128",
      qrCodeLink: "",
      qrCodeDescription: "",
      guid: 0,
    },
  });

  // Load companies on mount
  useEffect(() => {
    dispatch(getAllCompanies()).catch((err) =>
      console.error("Failed to load companies:", getErrorMessage(err as any))
    );
  }, [dispatch]);

  // Fetch receipt when company changes
  useEffect(() => {
    if (!selectedCompanyId) {
      reset();
      setReceiptId(null);
      setLastFetchedReceipt(null);
      return;
    }

    setLocalError(null);
    reset();
    setReceiptId(null);

    dispatch(fetchReceiptByCompanyId({ companyId: selectedCompanyId }))
      .unwrap()
      .then((fetchedReceipt: Receipt | null) => {
        if (!fetchedReceipt) {
          setLastFetchedReceipt(null);
          setReceiptId(null);
          return;
        }
        Object.entries(fetchedReceipt).forEach(([k, v]) => {
          if (v !== null && v !== undefined) setValue(k as any, v as any);
        });
        setReceiptId(fetchedReceipt.id ?? null);
        setLastFetchedReceipt(fetchedReceipt);
      })
      .catch((err) => {
        if ((err as any)?.status === 404) {
          setLastFetchedReceipt(null);
          setReceiptId(null);
        } else {
          setLocalError(getErrorMessage(err as any));
        }
      });
  }, [dispatch, selectedCompanyId, reset, setValue]);

  const onSubmit = async (data: ReceiptFormValues) => {
    if (!selectedCompanyId) {
      setLocalError("Please select a company first.");
      return;
    }

    setSaving(true);
    setSuccessMsg(null);
    setLocalError(null);

    // Use provided GUID or generate if null/invalid
   

    const payload = {
      name: data.name || "",
      displayName: data.displayName || "",
      taxNumber: data.taxNumber || "",
      email: data.email || "",
      website: data.website || "",
      refundDays: Number(data.refundDays || 7),
      message: data.message || "",
      showTaxBreakdown: Boolean(data.showTaxBreakdown),
      sendEmailReceipt: Boolean(data.sendEmailReceipt),
      showCustomerBalance: Boolean(data.showCustomerBalance),
      printCustomerAddress: Boolean(data.printCustomerAddress),
      showItemNodes: Boolean(data.showItemNodes),
      groupItemsByPromotions: Boolean(data.groupItemsByPromotions),
      groupItemOnPrint: Boolean(data.groupItemOnPrint),
      useProductNameOnPrint: Boolean(data.useProductNameOnPrint),
      showBarCode: Boolean(data.showBarCode),
      showProductName: Boolean(data.showProductName),
      showProductDescription: Boolean(data.showProductDescription),
      customFontSize: Number(data.customFontSize || 14),
      barCodeType: data.barCodeType || "CODE128",
      qrCodeLink: data.qrCodeLink || "",
      qrCodeDescription: data.qrCodeDescription || "",
      guid: 0,
      companyId: selectedCompanyId,
    };

    try {
      if (receiptId) {
        await dispatch(updateReceipt({ id: receiptId, data: payload })).unwrap();
        setSuccessMsg("Receipt updated successfully!");
      } else {
        const created = await dispatch(createReceipt(payload)).unwrap();
        setReceiptId(created?.id ?? null);
        setSuccessMsg("Receipt created successfully!");
      }

      const refetched = await dispatch(
        fetchReceiptByCompanyId({ companyId: selectedCompanyId })
      ).unwrap();
      if (refetched) {
        reset();
        Object.entries(refetched).forEach(([k, v]) => {
          if (v !== null && v !== undefined) setValue(k as any, v as any);
        });
        setReceiptId(refetched.id ?? null);
        setLastFetchedReceipt(refetched);
      }
    } catch (err) {
      setLocalError(getErrorMessage(err as any));
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleCancel = () => {
    if (lastFetchedReceipt) {
      reset();
      Object.entries(lastFetchedReceipt).forEach(([k, v]) => {
        if (v !== null && v !== undefined) setValue(k as any, v as any);
      });
    } else {
      reset();
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {companiesLoading && <p>Loading companies...</p>}
        {localError && <div className="alert alert-danger">{localError}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <div className="mb-3">
          <label className="form-label">Select Company</label>
          <select
            className="form-select"
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <option value="">-- Select a Company --</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCompanyId && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Text Fields */}
            {[
              ["name", "Name"],
              ["displayName", "Display Name"],
              ["taxNumber", "Tax Number"],
              ["email", "Email"],
              ["website", "Website"],
              ["message", "Message"],
              ["qrCodeLink", "QR Code Link"],
              ["qrCodeDescription", "QR Code Description"],
            ].map(([field, label]) => (
              <div className="row mb-3" key={field}>
                <label className="col-sm-3 col-form-label text-end">{label}</label>
                <div className="col-sm-6">
                  <input
                    {...register(field as keyof ReceiptFormValues)}
                    className="form-control"
                    type="text"
                  />
                </div>
              </div>
            ))}

            {/* Numbers */}
            {[
              ["refundDays", "Refund Days"],
              ["customFontSize", "Custom Font Size"],
              ["guid", "GUID"], // Number input for GUID
            ].map(([field, label]) => (
              <div className="row mb-3" key={field}>
                <label className="col-sm-3 col-form-label text-end">{label}</label>
                <div className="col-sm-6">
                  <input
                    {...register(field as keyof ReceiptFormValues, { valueAsNumber: true })}
                    className="form-control"
                    type="number"
                    placeholder={field === "guid" ? "Leave blank to auto-generate" : ""}
                  />
                </div>
              </div>
            ))}

            {/* Barcode Type */}
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label text-end">Barcode Type</label>
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
              ["showTaxBreakdown", "Show Tax Breakdown"],
              ["sendEmailReceipt", "Send Email Receipt"],
              ["showCustomerBalance", "Show Customer Balance"],
              ["printCustomerAddress", "Print Customer Address"],
              ["showItemNodes", "Show Item Notes"],
              ["groupItemsByPromotions", "Group Items by Promotions"],
              ["groupItemOnPrint", "Group Items on Print"],
              ["useProductNameOnPrint", "Use Product Name on Print"],
              ["showBarCode", "Show Barcode"],
              ["showProductName", "Show Product Name"],
              ["showProductDescription", "Show Product Description"],
            ].map(([field, label]) => (
              <div className="form-check ms-3" key={field}>
                <input
                  type="checkbox"
                  {...register(field as keyof ReceiptFormValues)}
                  className="form-check-input"
                />
                <label className="form-check-label">{label}</label>
              </div>
            ))}

            <div className="mt-3 d-flex gap-3">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        )}

        {!selectedCompanyId && !companiesLoading && (
          <div className="alert alert-info mt-4">
            Please select a company to view or create receipt settings.
          </div>
        )}
      </div>
    </div>
  );
}
