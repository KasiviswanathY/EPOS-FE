"use client";
import { useState } from "react";

const pageSlice = <T,>(arr: T[], p: number, size: number) => arr.slice((p - 1) * size, p * size);
const pageSize = 8;

const data: Record<string, (string | number)[][]> = {
  "Deleted Products": [
    ["2154703", "Twist 16.9 oz", "Drinks", "8478100", "Brand A", "Supplier A"],
    ["2484587", "Quaker Cereal", "Snacks", "1234567", "Quaker", "Supplier B"],
    ["2419155", "Polar 8 oz Bar", "Ice Cream", "310011", "", ""],
    ["2339777", "BMI JAZZ PACK", "Tobacco", "07919752", "", ""],
    ["2137006", "Gatorade Flt 9 Oz", "Drinks", "5115", "", ""],
    ["2315004", "Starbucks Consumm 16 oz", "Drinks", "00119", "", ""],
  ],
  "Deleted Miscellaneous Products": [
    ["1001", "Mix", "Tax Free"],
    ["1450", "Sugar Cones", "Tax Free"],
  ],
  Customers: [],
  "Deleted Categories": [
    ["45889", "Previous Balance", "", "", ""],
    ["21940", "Money Transfer", "", "", ""],
  ],
  "Deleted Staff": [
    ["6208", "Samantha", "Main", "Cashier"],
    ["5708", "Natasha", "Main", "Manager"],
  ],
  "Deleted Promotions": [
    ["475", "Carton Discount", "Carton Discount", "X for Y", "Mix", "Enabled"],
  ],
  "Deleted Tender Types": [
    ["1876", "Card", "Debit, Credit"],
    ["21863", "personal check", "personal check"],
  ],
  "Deleted Tax Rates": [
    ["5784", "State Tax", "CA sales", "CA01", "6.5%"],
  ],
  "Deleted Customer Types": [
    ["1071", "Qty", "Ucu", "20%", 30],
  ],
  "Deleted Refund Reasons": [],
  "Deleted Discount Reasons": [["7480", "return", "100%"]],
};

const columns: Record<string, string[]> = {
  "Deleted Products": ["ID", "Name", "Category", "Barcode", "Brand", "Supplier"],
  "Deleted Miscellaneous Products": ["ID", "Name", "Tax Rate"],
  Customers: ["ID", "Name"],
  "Deleted Categories": ["ID", "Name", "Description", "Parent", "Printer Type"],
  "Deleted Staff": ["ID", "Name", "Main Location", "Role"],
  "Deleted Promotions": ["ID", "Name", "Description", "Type", "Mix Match", "Enabled"],
  "Deleted Tender Types": ["ID", "Name", "Description"],
  "Deleted Tax Rates": ["ID", "Name", "Description", "Tax Code", "Rate"],
  "Deleted Customer Types": ["ID", "Name", "Description", "Discount", "Expiry Days"],
  "Deleted Refund Reasons": ["ID", "Reason"],
  "Deleted Discount Reasons": ["ID", "Reason", "Default Value"],
};

function Section({ section, rows, page, setPage }: {
  section: string;
  rows: (string | number)[][];
  page: number;
  setPage: (n: number) => void;
}) {
  const total = Math.max(1, Math.ceil(rows.length / pageSize));
  const slice = pageSlice(rows, page, pageSize);
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-8 border border-slate-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{section}</h2>
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-slate-100 text-gray-700">
            <tr>
              {columns[section]?.map(c => (
                <th key={c} className="px-4 py-2 border-b border-gray-200">{c}</th>
              ))}
              <th className="px-4 py-2 border-b border-gray-200 text-center">Restore</th>
            </tr>
          </thead>
          <tbody>
            {slice.length ? (
              slice.map((r, i) => {
                const key = `${section}-${(page - 1) * pageSize + i}`;
                return (
                  <tr key={key} className="hover:bg-gray-50">
                    {r.map((cell, j) => (
                      <td key={j} className="px-4 py-2 border-b">{cell}</td>
                    ))}
                    <td className="px-4 py-2 text-center border-b">
                      <input type="checkbox" className="accent-orange-500" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={(columns[section]?.length || 0) + 1} className="px-4 py-4 text-center text-gray-500">
                  No deleted {section.toLowerCase()}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > 1 && (
        <div className="flex justify-end items-center gap-2 mt-3">
          <button
            className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">{page} / {total}</span>
          <button
            className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={page === total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function RestorePage() {
  const [pages, setPages] = useState<Record<string, number>>(
    Object.fromEntries(Object.keys(data).map(k => [k, 1]))
  );
  const setPage = (sec: string, n: number) => setPages(p => ({ ...p, [sec]: n }));

  return (
     <div className="page-wrapper">
      <div className="content">
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-white sticky top-0 z-10 rounded-xl shadow-md p-6 mb-6 border border-slate-200">
        <h1 className="text-2xl font-bold text-gray-800">Restore Data</h1>
        <p className="text-sm text-gray-600 mt-2">
          On this page you can view and restore data items that have been deleted.
          Select the checkbox for the items and click the <b>Restore</b> button.
        </p>
      </div>

      {Object.entries(data).map(([sec, rows]) =>
        sec !== "Deleted Locations" && (
          <Section key={sec} section={sec} rows={rows} page={pages[sec]} setPage={(n) => setPage(sec, n)} />
        )
      )}

      <div className="bg-white rounded-xl shadow-md p-4 mb-24 border border-slate-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Deleted Locations</h2>
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-slate-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b text-center">Restore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                  No deleted locations.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Button - fixed at bottom right */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-orange hover: text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-200">
          RESTORE
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}
