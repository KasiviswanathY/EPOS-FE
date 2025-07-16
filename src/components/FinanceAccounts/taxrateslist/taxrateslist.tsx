"use client";
import Link from 'next/link';
import { useState } from "react";

export default function TaxRates() {
  const [taxRates, setTaxRates] = useState([
    { name: "Tax Free", description: "Non Taxable", code: "03", rate: 0.0 },
    { name: "Sales Tax (6.75%)", description: "STATE TAX", code: "01", rate: 6.75 },
    { name: "Sales Tax (2%)", description: "LOCAL TAX", code: "02", rate: 2.0 },
    { name: "VAT (5%)", description: "Value Added Tax", code: "04", rate: 5.0 },
    { name: "Service Tax (1.5%)", description: "Service Related", code: "05", rate: 1.5 },
    { name: "Luxury Tax (9%)", description: "Luxury Products", code: "06", rate: 9.0 },
    { name: "Eco Fee (0.25%)", description: "Environmental Fee", code: "07", rate: 0.25 },
  ]);

  const handleDelete = (index: number) => {
    const updated = [...taxRates];
    updated.splice(index, 1);
    setTaxRates(updated);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">
            Tax Rates
          </h4><Link href="/addtaxrate" className="btn btn-primary">ADD TAX RATE</Link>        </div>
        <div className="alert alert-light border d-flex justify-content-between align-items-center p-3 mb-4">
          <div>
            <strong>Guide:</strong> This is the rate of tax that will be added to the products you have. You can add a Tax Rate when creating a new product or you can edit the current tax rate of a product that has already
            been added.
          </div>
          <button className="btn-close" aria-label="Close" />
        </div>
        <div className="table-responsive card">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>TAX CODE</th>
                <th>RATE</th>
                <th className="text-end" style={{ width: "200px" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {taxRates.map((tax, index) => (
                <tr key={index}>
                  <td>{tax.name}</td>
                  <td>{tax.description}</td>
                  <td>{tax.code}</td>
                  <td>{tax.rate.toFixed(3)}%</td>
                  <td className="text-end">
                    <button className="btn btn-outline-primary btn-sm me-2">EDIT</button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
              {taxRates.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No tax rates available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
