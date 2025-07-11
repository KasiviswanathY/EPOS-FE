"use client";
import Link from 'next/link';
import { useState } from "react";

interface Reason {
  id: number;
  name: string;
}

export default function PayoutReasons() {
  const [reasons, setReasons] = useState<Reason[]>([
  { id: 1, name: "Lottery Payout" },
  { id: 1, name: "Coca Cola Payout" },
  { id: 2, name: "Hunt Brothers Pizza Payout" },
  { id: 3, name: "North State Payout" },
  { id: 4, name: "Albemarle Distributor Payout" },
  { id: 5, name: "Jackson Wholesale Payout" },
  { id: 6, name: "other" },
  { id: 7, name: "G & S Distributing (Little Debbie)" },
  { id: 8, name: "hersheys ice cream" },
  { id: 9, name: "Aldi" },
  { id: 10, name: "Walmart" },
  ]);
  const handleDelete = (id: number) => {
    setReasons(reasons.filter((r) => r.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Payout Reasons</h4>
          <Link href="/addpayoutreasons" className="btn btn-primary">
            ADD PAYOUT REASON
          </Link>
        </div>
        <div className="card mb-3">
          <div className="card-header fw-semibold">Payouts are typically used for lottery and scratch&nbsp;card wins.
            The payout reasons defined on this page are displayed on the Till
            when processing a payout.</div>
         
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Reasons</th>
                  <th className="text-end" style={{ width: "170px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reasons.map(({ id, name }) => (
                  <tr key={id}>
                    
                    <td>{name}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2">
                        EDIT
                      </button>  
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(id)}
                      >
                        X
                      </button>
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
