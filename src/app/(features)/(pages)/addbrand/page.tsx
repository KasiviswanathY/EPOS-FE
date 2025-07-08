"use client";
import { useRouter } from "next/navigation";

export default function AddBrandPage() {
  const router = useRouter();

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <h4 className="fw-bold">Add Brand</h4>
        </div>

        <div className="card">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">Description</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-danger" onClick={() => router.back()}>
              Cancel
            </button>
            <div>
              <button className="btn btn-outline-success me-2">Add Another</button>
              <button className="btn btn-success">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
