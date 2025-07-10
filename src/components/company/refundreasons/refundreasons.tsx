
import React from "react";
import Link from "next/link";

const refundReasons = [
  {
    description: "Product is Faulty or Damaged",
    shortDescription: "Faulty",
    returnToStock: false,
  },
  {
    description: "Incorrect Size, Colour or Not Suitable",
    shortDescription: "Not Suitable",
    returnToStock: true,
  },
  {
    description: "return",
    shortDescription: "depends tha stuff",
    returnToStock: true,
  },
  {
    description: "Product is Not as Described",
    shortDescription: "Not as Described",
    returnToStock: false,
  },
  {
    description: "Customer Changed Mind",
    shortDescription: "Changed Mind",
    returnToStock: true,
  },
  {
    description: "Other",
    shortDescription: "Other",
    returnToStock: false,
  },
  {
    description: "Product Expired",
    shortDescription: "Expired",
    returnToStock: false,
  },
  {
    description: "Product was a Gift",
    shortDescription: "Gift",
    returnToStock: true,
  },
  {
    description: "Product was Not Received",
    shortDescription: "Not Received",
    returnToStock: false,
  },
  {
    description: "Product was Defective",
    shortDescription: "Defective",
    returnToStock: false,
  },
  {
    description: "Product was a Duplicate Order",
    shortDescription: "Duplicate Order",
    returnToStock: true,
  },
  {
    description: "Product was Not Wanted",
    shortDescription: "Not Wanted",
    returnToStock: true,
  },
  {
    description: "Product was Ordered by Mistake",
    shortDescription: "Ordered by Mistake",
    returnToStock: true,
  },
  {
    description: "Product was Not Compatible",
    shortDescription: "Not Compatible",
    returnToStock: false,
  },
];

export default function RefundReasons() {
  return (
    <div className="page-wrapper">
      <div className="content">

       
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Refund Reasons</h4>
<Link href="/addrefundreason" className="btn btn-primary">ADD REFUND REASON</Link>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "10%" }}></th>
                  <th>Description</th>
                  <th>Short Description</th>
                  <th className="text-center">Return to Stock</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {refundReasons.map((item, index) => (
                  <tr key={index}>
                    <td>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.shortDescription}</td>
                    <td className="text-center">
                      <input type="checkbox" checked={item.returnToStock} readOnly />
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary">EDIT</button>
                        <button className="btn btn-sm btn-outline-danger">X</button>
                      </div>
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
