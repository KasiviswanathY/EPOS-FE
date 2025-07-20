"use client";
import { useParams } from "next/navigation";

export default function TenderDetailsPage() {
  const params = useParams();
  const ref = params?.ref;

  return (
    <div className="page-wrapper">
         <div className="content">
        
      <h4 className="fw-bold mb-4">Tender Breakdown for Reference: {ref}</h4>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Tender Type Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Tender Type</th><th>Expected</th><th>Actual</th><th>Variance</th></tr>
          </thead>
          <tbody>
            <tr><td>Cash</td><td>$1,669.05</td><td>$0.00</td><td>-$1,669.05</td></tr>
            <tr><td>CC/FS</td><td>$769.76</td><td>$0.00</td><td>-$769.76</td></tr>
            <tr><td>Credit Cards</td><td>$0.00</td><td>$0.00</td><td>$0.00</td></tr>
            <tr><td>House Account</td><td>$0.00</td><td>$0.00</td><td>$0.00</td></tr>
            <tr className="fw-bold text-primary"><td colSpan={3}>Total:</td><td>-$2,438.81</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Note</h5>
        <p>No notes</p>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Sales Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Type</th><th>Quantity</th><th>Discount</th><th>Average</th><th>Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Transactions</td><td>218</td><td>$5.84</td><td>$11.19</td><td>$2,438.81</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Wet Dry Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Discount</th><th>Net</th><th>Tax</th><th>Total</th><th>% Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Dry</td><td>$5.84</td><td>$2,855.22</td><td>$103.59</td><td>$2,958.81</td><td>100%</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Sales by Product Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Product</th><th>Quantity</th><th>Discount</th><th>Net</th><th>Tax</th><th>Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Ice 10 Lb.</td><td>3</td><td>$0.00</td><td>$8.97</td><td>$0.60</td><td>$9.57</td></tr>
            <tr><td>Lunch $5.99</td><td>3</td><td>$0.00</td><td>$29.97</td><td>$2.02</td><td>$31.99</td></tr>
            <tr><td>Burritos</td><td>14</td><td>$0.00</td><td>$97.86</td><td>$6.58</td><td>$104.44</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Sales by Employee Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Quantity</th><th>Discount</th><th>Net</th><th>Tax</th><th>Total</th><th>% Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Jagrut</td><td>486</td><td>$5.84</td><td>$2,335.22</td><td>$103.59</td><td>$2,438.81</td><td>100%</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Refund Breakdown</h5>
        <p>No results</p>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Sales by Category Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Quantity</th><th>Discount</th><th>Net</th><th>Tax</th><th>Total</th><th>% Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Accessories</td><td>8</td><td>$0.00</td><td>$41.72</td><td>$2.80</td><td>$44.52</td><td>1.83%</td></tr>
            <tr><td>Lottery</td><td>127</td><td>$0.00</td><td>$1318.50</td><td>$0.00</td><td>$1318.50</td><td>54.06%</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Void Summary Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Product</th><th>Type</th><th>Staff</th><th>Quantity</th><th>Net</th><th>Tax</th><th>Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Pizza</td><td>delete</td><td>Jagrut</td><td>1</td><td>$11.99</td><td>$0.81</td><td>$12.80</td></tr>
            <tr><td>$5 Scratch Off</td><td>delete</td><td>Jagrut</td><td>2</td><td>$10.00</td><td>$0.00</td><td>$10.00</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Tax Summary Breakdown</h5>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Rate</th><th>Quantity</th><th>Net</th><th>Tax</th><th>Total</th><th>% Total</th></tr>
          </thead>
          <tbody>
            <tr><td>Sales Tax (6.75%)</td><td>6.75%</td><td>335</td><td>$1534.14</td><td>$103.53</td><td>$1637.67</td><td>99.94%</td></tr>
            <tr><td>Sales Tax (2%)</td><td>2%</td><td>2</td><td>$2.58</td><td>$0.06</td><td>$2.64</td><td>0.06%</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Credit Purchased Breakdown</h5>
        <p>No results</p>
      </section>

      <section className="card p-3">
        <h5 className="fw-bold mb-3">Credit Spent Breakdown</h5>
        <p>No results</p>
      </section>

      <button className="btn btn-primary mt-3">Reprint Report</button>
    </div>
    </div>
  );
}
