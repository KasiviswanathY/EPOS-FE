"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  getAllPopups,
  deletePopups,
  updatePopups,
} from "@/lib/redux/actions/popupAction";
import { PopUps } from "@/core/interfaces/PopUps";

export default function PopupNotes() {
  const dispatch = useDispatch<AppDispatch>();
  const { popups, loading, error } = useSelector(
    (state: RootState) => state.popup
  );

  const [filter, setFilter] = useState("");
  const [editPopup, setEditPopup] = useState<PopUps | null>(null);
  const [deletePopup, setDeletePopup] = useState<PopUps | null>(null);

  // ✅ Fetch all popups on mount
  useEffect(() => {
    dispatch(getAllPopups());
  }, [dispatch]);

  // ✅ Ensure popups is always an array before filtering
  const filteredNotes = Array.isArray(popups)
    ? popups.filter(
        (note: PopUps) =>
          note.name?.toLowerCase().includes(filter.toLowerCase()) ||
          note.message?.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  // ✅ Save updated popup
  const handleSaveUpdate = () => {
    if (!editPopup) return;
    dispatch(
      updatePopups({
        id: editPopup.id!,
        data: {
          name: editPopup.name,
          message: editPopup.message,
          showOncePerTransaction: editPopup.showOncePerTransaction,
        },
      })
    );
    setEditPopup(null);
  };

  // ✅ Confirm delete
  const handleConfirmDelete = () => {
    if (!deletePopup) return;
    dispatch(deletePopups(deletePopup.id!));
    setDeletePopup(null);
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
              view, edit and delete your Popup Notes.
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
            onClick={() => dispatch(getAllPopups())}
          >
            SEARCH
          </button>
        </div>

        {loading && <p>Loading popups...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th className="text-center">Show Once Per Transaction</th>
                <th style={{ width: "150px" }} className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note: PopUps) => (
                  <tr key={note.id}>
                    <td>{note.name}</td>
                    <td>{note.message}</td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={note.showOncePerTransaction}
                        readOnly
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => setEditPopup(note)}
                      >
                        EDIT
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setDeletePopup(note)}
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

      {/* ✅ Edit Modal */}
      {editPopup && (
        <div className="modal fade show d-block" style={{ background: "#0008" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Edit Popup</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditPopup(null)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={editPopup.name}
                    onChange={(e) =>
                      setEditPopup({ ...editPopup, name: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    value={editPopup.message}
                    onChange={(e) =>
                      setEditPopup({ ...editPopup, message: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    checked={editPopup.showOncePerTransaction}
                    onChange={(e) =>
                      setEditPopup({
                        ...editPopup,
                        showOncePerTransaction: e.target.checked,
                      })
                    }
                    className="form-check-input"
                    id="showOnceCheck"
                  />
                  <label htmlFor="showOnceCheck" className="form-check-label">
                    Show Once Per Transaction
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditPopup(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSaveUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {deletePopup && (
        <div className="modal fade show d-block" style={{ background: "#0008" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setDeletePopup(null)}
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>{deletePopup.name}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeletePopup(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
