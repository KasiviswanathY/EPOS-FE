"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store"; // adjust path as per your store
import { createPopup } from "@/lib/redux/actions/popupAction";
import { PopUps } from "@/core/interfaces/PopUps";

export default function AddPopupNote() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.popup
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PopUps>();

  const onSubmit = async (data: PopUps) => {
    await dispatch(createPopup(data));
    reset(); // clear form after submission
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-3">Popup Notes </h4>
        <div className="card mb-3">
          <div className="card-body">
            <p>
              <strong>'Name'</strong> is used to identify this popup note when
              using the Back Office.
            </p>
            <p>
              <strong>'Message'</strong> will be displayed to the user when the
              product is added to the current transaction on the Till.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Popup Note</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name.message}</span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">
                  Message
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <span className="text-danger">
                      {errors.message.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end">
                  Show Once Per Transaction
                </label>
                <div className="col-sm-10">
                  <input
                    type="checkbox"
                    {...register("showOncePerTransaction")}
                  />
                </div>
              </div>

              {error && <p className="text-danger">{error}</p>}
              {success && (
                <p className="text-success">Popup created successfully!</p>
              )}

              <div className="card-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => router.back()}
                >
                  CANCEL
                </button>
                <div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={handleSubmit(onSubmit)}
                  >
                    ADD ANOTHER
                  </button>
                  <button type="submit" className="btn btn-success">
                    {loading ? "Adding..." : "ADD"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
