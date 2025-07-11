"use client";
import { useState } from "react";
import Link from "next/link";

interface Reason {
  id: number;
  name: string;
}

const allReasons: Reason[] = [
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
  // add more if needed …
];

export default function PettyCashReasons() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(allReasons.length / pageSize));
  const paged = allReasons.slice((page - 1) * pageSize, page * pageSize);
  const handleDelete = (id: number) => {
    alert(`Delete reason #${id}`);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Petty Cash Reasons</h4>
          <Link href="/addpettycashreasons" className="btn btn-primary">
            ADD PETTY CASH REASON
          </Link>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Reason</th>
                  <th className="text-end" style={{ width: "160px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(({ id, name }) => (
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

          <div className="card-footer d-flex justify-content-start">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`btn btn-sm me-1 ${n === page ? "btn-primary" : "btn-light"}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
