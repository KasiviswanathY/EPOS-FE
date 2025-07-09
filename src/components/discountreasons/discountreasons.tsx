
import React from "react";
import Link from "next/link";

const discountReasons = [
  { reason: "Wastage", value: "100.00%" },
  { reason: "Damaged Product", value: "40.00%" },
  { reason: "Manager approved", value: "0.00%" },
  { reason: "General", value: "10.00%" },
  { reason: "Caron disc", value: "12.00%" },
  { reason: "Staff Discount", value: "15.00%" },
  { reason: "Bulk Purchase", value: "5.00%" },
  { reason: "Seasonal Sale", value: "20.00%" },
  { reason: "Customer Loyalty", value: "30.00%" },
  { reason: "Promotional Offer", value: "25.00%" },
  { reason: "Clearance Sale", value: "50.00%" },
  { reason: "Referral Discount", value: "10.00%" },
  { reason: "First Time Purchase", value: "15.00%" },
  { reason: "Holiday Special", value: "20.00%" },
  { reason: "Volume Discount", value: "5.00%" },
  { reason: "Membership Discount", value: "10.00%" },
  { reason: "Feedback Reward", value: "5.00%" },
  { reason: "Birthday Discount", value: "15.00%" },
  { reason: "Anniversary Offer", value: "20.00%" },
  { reason: "Referral Program", value: "10.00%" }
];

export default function DiscountReasonsComponent() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <h2 className="fw-bold mb-4">Discount Reasons list:</h2>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Discount Reasons</h5>
            <Link href="/adddiscountreason" className="btn btn-primary">
  ADD DISCOUNT REASON
</Link>

          </div>

          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Reason</th>
                  <th className="text-end">Default Value</th>
                  <th style={{ width: "100px" }}></th>
                </tr>
              </thead>
              <tbody>
                {discountReasons.map((item, index) => (
                  <tr key={index}>
                    <td>{item.reason}</td>
                    <td className="text-end">{item.value}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary">EDIT</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
