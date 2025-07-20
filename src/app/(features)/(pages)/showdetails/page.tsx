"use client";
import { useSearchParams } from "next/navigation";

export default function PayoutsDetailsPage() {
  const reason = useSearchParams().get("reason") || "Unknown";

  const details = [
    { datetime: "7/15/2025 8:46:43 PM", staff: "Jagrut", till: "Till1", total: -40 },
    { datetime: "7/15/2025 6:59:31 PM", staff: "Jagrut", till: "Till1", total: -5 },
    { datetime: "7/15/2025 6:41:39 PM", staff: "Jagrut", till: "Till1", total: -5 },
    { datetime: "7/15/2025 6:40:54 PM", staff: "Jagrut", till: "Till1", total: -2 },
    { datetime: "7/15/2025 6:38:29 PM", staff: "Jagrut", till: "Till1", total: -2 },
    { datetime: "7/15/2025 6:09:27 PM", staff: "Jagrut", till: "Till1", total: -50 },
    { datetime: "7/10/2025 11:51:45 AM", staff: "Jagrut", till: "Till1", total: -5 },
    { datetime: "7/10/2025 11:50:46 AM", staff: "Jagrut", till: "Till1", total: -10 },
    { datetime: "7/10/2025 11:50:25 AM", staff: "Jagrut", till: "Till1", total: -5 },
    { datetime: "7/10/2025 11:42:09 AM", staff: "Jagrut", till: "Till1", total: -55 },
    { datetime: "7/10/2025 8:34:49 AM", staff: "Jagrut", till: "Till1", total: -150 },
    { datetime: "7/10/2025 8:33:12 AM", staff: "Jagrut", till: "Till1", total: -100 },
    { datetime: "7/10/2025 6:05:53 AM", staff: "Jagrut", till: "Till1", total: -1 },
  ];

  const total = details.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-4">Payout Details: {reason}</h4>

        <div className="table-responsive card">
          <table className="table table-bordered mb-0 align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>DATE/TIME</th>
                <th>STAFF</th>
                <th>TILL</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {details.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.datetime}</td>
                  <td>{entry.staff}</td>
                  <td>{entry.till}</td>
                  <td>${entry.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold text-white">
                <td colSpan={3}>Total:</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
