"use client";
import { useState } from "react";

const buyingData = [
	{
		name: "Extra Egg",
		previousCost: "$0.25",
		previousMargin: "89.08%",
		previousSale: "$2.44458",
		currentCost: "$0.75",
		taxRate: "6.75%",
		currentMargin: "49.66%",
		currentSale: "$1.59058",
	},
	{
		name: "Breakfast 2",
		previousCost: "$2.50",
		previousMargin: "49.9%",
		previousSale: "$5.32683",
		currentCost: "$2.50",
		taxRate: "6.75%",
		currentMargin: "44.32%",
		currentSale: "$4.79308",
	},
	{
        name: "Wrap",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "BLT",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Toast",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Bacon",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Sausage",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Hash Brown",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Beans",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Mushrooms",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
    {
        name: "Extra Tomato",
        previousCost: "$2.50",
        previousMargin: "49.9%",
        previousSale: "$5.32683",
        currentCost: "$2.50",
        taxRate: "6.75%",
        currentMargin: "44.32%",
        currentSale: "$4.79308",
    },
];

export default function BuyingReview() {
	const [filter, setFilter] = useState("");

	return (
		<div className="page-wrapper">
			<div className="content">
				
				<div className="d-flex justify-content-between align-items-center mb-3">
					<h4 className="fw-bold mb-0">
						Buying Review{" "}
					</h4>
					<button className="btn btn-success">DONE</button>
				</div>

				
				<div className="card mb-3">
					<div className="card-body py-2 small text-muted">
						Provides a list of products whose cost price has changed during the
						specified time period allowing you to adjust sale prices to ensure
						margins are maintained.
					</div>
				</div>

				
				<div className="d-flex flex-wrap gap-2 align-items-center mb-3">
					<select className="form-select w-auto">
						<option>Last 7 Days</option>
						<option>Today</option>
						<option>This Month</option>
					</select>

					<input
						type="date"
						className="form-control w-auto"
						defaultValue="2025-07-01"
					/>
					<input
						type="time"
						className="form-control w-auto"
						defaultValue="05:00"
					/>

					<input
						type="date"
						className="form-control w-auto"
						defaultValue="2025-07-08"
					/>
					<input
						type="time"
						className="form-control w-auto"
						defaultValue="05:00"
					/>

					<div
						className="ms-auto d-flex align-items-center"
						style={{ minWidth: 320 }}
					>
						<input
							type="text"
							className="form-control ms-auto"
							placeholder="Search"
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
						/>
						<button className="btn btn-outline-secondary ms-2">FILTERS</button>
					</div>
				</div>

				
				<div className="card">
					<div className="card-body table-responsive">
						<table className="table table-bordered align-middle">
							<thead>
								<tr>
									<th>Product Name</th>
									<th>Previous Cost Price</th>
									<th>Previous Margin</th>
									<th>Previous Sale Price</th>
									<th>Current Cost Price (Exc Tax)</th>
									<th>Tax Rate</th>
									<th>Current Margin</th>
									<th>Current Sale Price (Inc Tax)</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{buyingData
									.filter((item) =>
										item.name.toLowerCase().includes(filter.toLowerCase())
									)
									.map((item, index) => (
										<tr key={index}>
											<td>{item.name}</td>
											<td>{item.previousCost}</td>
											<td>{item.previousMargin}</td>
											<td>{item.previousSale}</td>
											<td>{item.currentCost}</td>
											<td>{item.taxRate}</td>
											<td>{item.currentMargin}</td>
											<td>{item.currentSale}</td>
											<td className="text-center">
												<i
													className="ti ti-pencil text-primary"
													style={{ cursor: "pointer" }}
												></i>
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
