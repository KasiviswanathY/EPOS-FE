
import React from "react";
import Link from "next/link";

const noSaleReasons = [
	{ reason: "Incorrect Change" },
	{ reason: "Customer Refused Sale" },
	{ reason: "Product Not Available" },
	{ reason: "Price Discrepancy" },
	{ reason: "Customer Request" },
	{ reason: "Technical Issue" },
	{ reason: "Other" },
	{ reason: "Staff Error" },
	{ reason: "Customer Complaint" },
	{ reason: "Payment Declined" },
	{ reason: "Product Expired" },
	{ reason: "Product Damaged" },
	{ reason: "Customer Unhappy with Service" },
	{ reason: "Customer Changed Mind" },
	{ reason: "Product Not in Stock" },
	{ reason: "Customer Request for Refund" },
	{ reason: "Customer Request for Exchange" },
	{ reason: "Customer Request for Price Match" },
	{ reason: "Customer Request for Special Order" },
	{ reason: "Customer Request for Hold" },
	{ reason: "Customer Request for Delivery" },
	{ reason: "Customer Request for Pickup" },
	{ reason: "Customer Request for Gift Wrapping" },
	{ reason: "Customer Request for Loyalty Points Redemption" },
	{ reason: "Customer Request for Receipt Reprint" },
	{ reason: "Customer Request for Price Adjustment" },
	{ reason: "Customer Request for Product Information" },
	{ reason: "Customer Request for Product Demonstration" },
	{ reason: "Customer Request for Product Sample" },
	{ reason: "Customer Request for Product Return" },
];

export default function NoSaleReason() {
	return (
		<div className="page-wrapper">
			<div className="content">
				<div className="d-flex justify-content-between align-items-center mb-3">
					<h4 className="fw-bold mb-0">No Sale Reasons</h4>
     <Link href="/addnosalereason" className="btn btn-primary"> ADD NO SALE REASON</Link>
				</div>
                <div className="card">
					<div className="card-body p-0">
						<table className="table mb-0">
							<thead className="table-light">
								<tr>
									<th className="text-start" style={{ width: "80%" }}>
										Reason
									</th>
									<th className="text-end" style={{ width: "20%" }}>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{noSaleReasons.map((item, index) => (
									<tr key={index}>
										<td className="text-start">{item.reason}</td>
										<td className="text-end">
											<div className="d-flex justify-content-end gap-2">
												<button className="btn btn-sm btn-outline-primary">
													EDIT
												</button>
												<button className="btn btn-sm btn-outline-danger">
													X
												</button>
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
