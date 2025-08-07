'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { createReceipt, getReceipt, updateReceipt } from '@/lib/redux/actions/createReceiptsAction';
import { getCompany } from '@/lib/redux/actions/createCompany';
import { useRouter } from 'next/navigation';

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
};

export default function ReceiptsComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const reduxToken = useSelector((state: RootState) => state.app.token);
  const company = useSelector((state: RootState) => state.app.company);

  const [token, setToken] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReceiptFormValues>();

  // Get token from localStorage or Redux
  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    setToken(localToken || reduxToken || null);
  }, [reduxToken]);

  // Fetch company details if not already in Redux
  useEffect(() => {
    if (!company && token) {
      dispatch(getCompany({ token }));
    }
  }, [dispatch, token, company]);

  // Load receipt data if company ID exists
  useEffect(() => {
    if (token && company?.id) {
      dispatch(getReceipt({ token, id: company.id })).then((res: any) => {
        if (res?.payload) {
          const receipt = res.payload;
          Object.keys(receipt).forEach((key) => {
            if (receipt[key] !== null && receipt[key] !== undefined) {
              setValue(key as keyof ReceiptFormValues, receipt[key]);
            }
          });
          setReceiptId(receipt.id);
        }
      });
    }
  }, [dispatch, token, company?.id, setValue]);
  // Pre-fill company details
  useEffect(() => {
    if (company) {
     
      setValue("name", company.name || "");
      setValue("taxNumber", company.taxNumber || "");
    }
  }, [company, setValue]);

  const onSubmit = (data: ReceiptFormValues) => {
    if (!token) {
      alert("Token missing!");
      return;
    }

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
  companyId: company.id,
};
  
    if (receiptId) {
      
      dispatch(updateReceipt({ id: receiptId, payload, token }));

    } else {
      dispatch(createReceipt({ payload, token })).then((res: any) => {
        if (res?.payload?.id) setReceiptId(res.payload.id);
      });
    }
  };

  const handleCancel = () => {
    router.push('/index');
  };

  if (!company?.id) {
    return <p className="text-center mt-5">Loading company details...</p>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <div className="card-header fw-bold">Receipt Settings</div>
          <div className="card-body">
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
                  <label className="col-sm-3 col-form-label text-end">{field.label}</label>
                  <div className="col-sm-6">
                    <input {...register(field.name as keyof ReceiptFormValues)} className="form-control" type="text" />
                  </div>
                </div>
              ))}

              {/* Numbers */}
              {[
                { label: "Refund Days", name: "refundDays" },
                { label: "Custom Font Size", name: "customFontSize" },
              ].map((field) => (
                <div className="row align-items-center mb-3" key={field.name}>
                  <label className="col-sm-3 col-form-label text-end">{field.label}</label>
                  <div className="col-sm-6">
                    <input type="number" {...register(field.name as keyof ReceiptFormValues)} className="form-control" />
                  </div>
                </div>
              ))}

              {/* Barcode Type */}
              <div className="row align-items-center mb-3">
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
                { name: "showTaxBreakdown", label: "Show Tax Breakdown" },
                { name: "sendEmailReceipt", label: "Send Email Receipt" },
                { name: "showCustomerBalance", label: "Show Customer Balance" },
                { name: "printCustomerAddress", label: "Print Customer Address" },
                { name: "showItemNodes", label: "Show Item Notes" },
                { name: "groupItemsByPromotions", label: "Group Items by Promotions" },
                { name: "groupItemOnPrint", label: "Group Items on Print" },
                { name: "useProductNameOnPrint", label: "Use Product Name on Print" },
                { name: "showBarCode", label: "Show Barcode" },
                { name: "showProductName", label: "Show Product Name" },
                { name: "showProductDescription", label: "Show Product Description" },
              ].map((checkbox) => (
                <div className="row mb-2" key={checkbox.name}>
                  <div className="offset-sm-3 col-sm-9">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...register(checkbox.name as keyof ReceiptFormValues)}
                      />
                      <label className="form-check-label">{checkbox.label}</label>
                    </div>
                  </div>
                </div>
              ))}

              {/* GUID */}
              <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label text-end">GUID</label>
                <div className="col-sm-6 pt-1">
                  <span className="text-muted">{receiptId || 'Auto-generated'}</span>
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
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
