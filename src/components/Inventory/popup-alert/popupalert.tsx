"use client";
import { useState } from "react";
import Link from "next/link";

const initialNotes = [
	{
		name: "ID VERIFICATION",
		message: "DID YOU VERIFY AGE ABOVE 21?",
		showOnce: true,
	},
	{
		name: "Age 21 verifica",
		message: "Did you verify age above 21?",
		showOnce: true,
	},
	{
		name: "Age 18 verifica",
		message: "Did you verify age above 18?",
		showOnce: false,
	},
	{
		name: "Age 16 verifica",
		message: "Did you verify age above 16?",
		showOnce: false,
	},
	{
		name: "Age 15 verifica",
		message: "Did you verify age above 15?",
		showOnce: true,
	},
];

export default function PopupNotes() {
	const [filter, setFilter] = useState("");
	const [notes, setNotes] = useState(initialNotes);

	const filteredNotes = notes.filter(
		(note) =>
			note.name.toLowerCase().includes(filter.toLowerCase()) ||
			note.message.toLowerCase().includes(filter.toLowerCase())
	);

	const deleteNote = (index: number) => {
		const updated = [...notes];
		updated.splice(index, 1);
		setNotes(updated);
	};

	return (
		<div className="page-wrapper">
			<div className="content">
				<div className="d-flex justify-content-between align-items-center mb-3">
					<h4 className="fw-bold mb-0">Popup Notes</h4>
					<Link
						href="/addpopupnote"
						className="btn text-white"
						style={{ background: "#FFA500", fontWeight: 600 }}
					>
						ADD POPUP NOTE
					</Link>
				</div>
				<div className="card mb-3">
					<div className="card-body">
						<p className="mb-1">
							<strong>Guide</strong>
						</p>
						<p className="mb-1">
							Popup Notes can be attached to a product. On this page you can
							view, edit and delete your Popup Notes. To add a new one, hit the
							'Add Popup Note' button at the top of the page.
						</p>
						<p className="mb-1">
							<strong>'Name'</strong> is used to identify this Popup Note when
							using the Back Office.
						</p>
						<p>
							<strong>'Message'</strong> will be displayed to the user when the
							product is added to the current transaction on the Till.
						</p>
					</div>
				</div>

				<div className="d-flex align-items-center gap-2 mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Filter by Name or Message"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
					<button
						className="btn text-white"
						style={{ background: "#FFA500", fontWeight: 600 }}
					>
						SEARCH
					</button>
				</div>

				<div className="table-responsive">
					<table className="table table-bordered align-middle">
						<thead>
							<tr>
								<th>Name</th>
								<th>Message</th>
								<th className="text-center">
									Show Once Per Transaction
								</th>
								<th style={{ width: "150px" }} className="text-center"></th>
							</tr>
						</thead>
						<tbody>
							{filteredNotes.length > 0 ? (
								filteredNotes.map((note, index) => (
									<tr key={index}>
										<td>{note.name}</td>
										<td>{note.message}</td>
										<td className="text-center">
											<input
												type="checkbox"
												checked={note.showOnce}
												readOnly
											/>
										</td>
										<td className="text-center">
											<button className="btn btn-outline-primary btn-sm me-2">
												EDIT
											</button>
											<button
												className="btn btn-outline-danger btn-sm"
												onClick={() => deleteNote(index)}
											>
												X
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="text-center">
										No popup notes found.
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
