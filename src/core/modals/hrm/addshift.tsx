// components/hrm/AddShift.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/redux/store";

// adjust imports to your project files if necessary
 // or actual file path
import { getAllStaff } from "@/lib/redux/actions/staffActions";

import { createStaffHours } from "@/lib/redux/actions/staffHours";
import { clearCreateState } from "@/lib/redux/slices/staffHoursslice";
import { getAllClockingTypes } from "@/lib/redux/actions/clockingTypesActions";
import { getAllLocations } from "@/lib/redux/actions/locationsActions";

dayjs.extend(customParseFormat);

/**
 * Finds the first array anywhere inside the provided object.
 * This tries to be tolerant of multiple server/ slice shapes
 * (e.g. { data: [...] }, { payload: { data: [...] } }, etc.)
 */
function findFirstArray(obj: any, visited = new WeakSet()): any[] | null {
  if (!obj || typeof obj !== "object") return null;
  if (visited.has(obj)) return null;
  visited.add(obj);

  if (Array.isArray(obj)) return obj;
  // If object looks like a wrapper with keys likely containing arrays, check them first:
  const commonKeys = ["data", "result", "items", "list", "payload", "rows"];
  for (const k of commonKeys) {
    if (obj[k] !== undefined) {
      const arr = findFirstArray(obj[k], visited);
      if (arr) return arr;
    }
  }
  // Otherwise examine all properties shallowly (breadth-first-ish)
  for (const key of Object.keys(obj)) {
    try {
      const val = (obj as any)[key];
      if (Array.isArray(val)) return val;
      if (val && typeof val === "object") {
        const arr = findFirstArray(val, visited);
        if (arr) return arr;
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
}

const AddShift: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement | null>(null);

  // form state
  const [staffId, setStaffId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [clockingIn, setClockingIn] = useState<string>("");
  const [clockingOut, setClockingOut] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [clockingTypeId, setClockingTypeId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");

  // raw slices from store (matching your reducer keys)
  const rawClockingSlice = useSelector((s: RootState) => (s as any).clockingTypes);
  const rawStaffSlice = useSelector((s: RootState) => (s as any).staff);
  const rawLocationSlice = useSelector((s: RootState) => (s as any).locations);
  const rawStaffHoursSlice = useSelector((s: RootState) => (s as any).staffHours);

  // try to locate the arrays inside slices
  const clockingTypes = findFirstArray(rawClockingSlice) ?? [];
  const staffs = findFirstArray(rawStaffSlice) ?? [];
  const locations = findFirstArray(rawLocationSlice) ?? [];

  const createLoading = rawStaffHoursSlice?.createLoading ?? rawStaffHoursSlice?.loading ?? false;
  const createSuccess = rawStaffHoursSlice?.createSuccess ?? rawStaffHoursSlice?.success ?? false;
  const createError = rawStaffHoursSlice?.createError ?? rawStaffHoursSlice?.error ?? null;

  // --- debug logging to help pin down slice shapes
  useEffect(() => {
    console.group("[AddShift] slice shapes");
    console.log("rawClockingSlice:", rawClockingSlice);
    console.log("derived clockingTypes array (first array found):", clockingTypes);
    console.log("rawStaffSlice:", rawStaffSlice);
    console.log("derived staffs array (first array found):", staffs);
    console.log("rawLocationSlice:", rawLocationSlice);
    console.log("derived locations array (first array found):", locations);
    console.log("rawStaffHoursSlice:", rawStaffHoursSlice);
    console.groupEnd();
  }, [rawClockingSlice, rawStaffSlice, rawLocationSlice, rawStaffHoursSlice, clockingTypes, staffs, locations]);

  // fetch lists on mount and log thunk results
  useEffect(() => {
    // Dispatch and log returned payloads so you can see what's returned by thunk
    dispatch(getAllClockingTypes()).then((res: any) => {
      console.log("[getAllClockingTypes] dispatch result:", res);
    }).catch((e:any) => console.error("[getAllClockingTypes] dispatch error:", e));

    dispatch(getAllStaff()).then((res: any) => {
      console.log("[getAllStaff] dispatch result:", res);
    }).catch((e:any) => console.error("[getAllStaff] dispatch error:", e));

    dispatch(getAllLocations()).then((res: any) => {
      console.log("[getAllLocations] dispatch result:", res);
    }).catch((e:any) => console.error("[getAllLocations] dispatch error:", e));
  }, [dispatch]);

  // close modal and reset when create is successful
  useEffect(() => {
    if (createSuccess) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bs = (window as any).bootstrap;
        if (bs && modalRef.current) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const instance = bs.Modal.getInstance(modalRef.current) || new bs.Modal(modalRef.current);
          instance.hide();
        } else {
          // fallback manual hide
          if (modalRef.current) {
            modalRef.current.classList.remove("show");
            modalRef.current.style.display = "none";
            document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
          }
        }
      } catch {
        if (modalRef.current) {
          modalRef.current.classList.remove("show");
          modalRef.current.style.display = "none";
          document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
        }
      }

      // reset local inputs
      setStaffId("");
      setDate("");
      setClockingIn("");
      setClockingOut("");
      setNotes("");
      setClockingTypeId("");
      setLocationId("");

      const t = setTimeout(() => dispatch(clearCreateState()), 700);
      return () => clearTimeout(t);
    }
  }, [createSuccess, dispatch]);

  const handleClockingInChange = (value: any) => {
    if (!value) {
      setClockingIn("");
      return;
    }
    const timeStr = value.format ? value.format("HH:mm:ss") : String(value);
    const baseDate = date ? new Date(date) : new Date();
    const [h, m, s] = timeStr.split(":").map((v: string) => parseInt(v, 10));
    const dt = new Date(baseDate);
    dt.setHours(h, m, s || 0, 0);
    setClockingIn(dt.toISOString());
  };

  const handleClockingOutChange = (value: any) => {
    if (!value) {
      setClockingOut("");
      return;
    }
    const timeStr = value.format ? value.format("HH:mm:ss") : String(value);
    const baseDate = date ? new Date(date) : new Date();
    const [h, m, s] = timeStr.split(":").map((v: string) => parseInt(v, 10));
    const dt = new Date(baseDate);
    dt.setHours(h, m, s || 0, 0);
    setClockingOut(dt.toISOString());
  };

  useEffect(() => {
    if (!date) return;
    const applyNewDate = (iso?: string) => {
      if (!iso) return "";
      try {
        const t = new Date(iso);
        const newD = new Date(date);
        newD.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
        return newD.toISOString();
      } catch {
        return iso;
      }
    };
    if (clockingIn) setClockingIn((c) => applyNewDate(c));
    if (clockingOut) setClockingOut((c) => applyNewDate(c));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId) { alert("Please select staff"); return; }
    if (!locationId) { alert("Please select location"); return; }
    if (!clockingTypeId) { alert("Please select clocking type"); return; }

    const payload = {
      staffId,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      clockingIn: clockingIn || undefined,
      clockingOut: clockingOut || undefined,
      notes: notes || undefined,
      clockingTypeId,
      locationId,
    };

    try {
      // @ts-ignore unwrap
      await dispatch(createStaffHours(payload)).unwrap();
    } catch (err) {
      console.error("createStaffHours failed", err);
    }
  };

  const noDataNotice = (!clockingTypes.length || !staffs.length || !locations.length) ? (
    <div className="alert alert-warning">
      One or more dropdown lists are empty. Check console logs for slice shapes.
    </div>
  ) : null;

  return (
    <div>
      <div className="modal fade" id="add-shift" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title"><h4>Add Staff Hours</h4></div>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" disabled={createLoading}><span aria-hidden="true">×</span></button>
                </div>

                <div className="modal-body custom-modal-body">
                  {createError && <div className="alert alert-danger">{String(createError)}</div>}
                  {createSuccess && <div className="alert alert-success">Created successfully</div>}
                  {noDataNotice}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <label>Staff</label>
                        <select className="form-select" value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                          <option value="">Select staff</option>
                          {staffs.map((s: any) => <option key={s.id ?? s._id} value={s.id ?? s._id}>{s.name ?? s.fullName ?? s.label ?? s.email}</option>)}
                        </select>
                      </div>

                      <div className="col-lg-6">
                        <label>Location</label>
                        <select className="form-select" value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                          <option value="">Select location</option>
                          {locations.map((l: any) => <option key={l.id ?? l._id} value={l.id ?? l._id}>{l.name ?? l.title ?? l.address ?? l.label}</option>)}
                        </select>
                      </div>

                      <div className="col-lg-6">
                        <label>Clocking Type</label>
                        <select className="form-select" value={clockingTypeId} onChange={(e) => setClockingTypeId(e.target.value)}>
                          <option value="">Select clocking type</option>
                          {clockingTypes.map((ct: any) => <option key={ct.id ?? ct._id} value={ct.id ?? ct._id}>{ct.name ?? ct.label ?? ct.title}</option>)}
                        </select>
                      </div>

                      <div className="col-lg-6">
                        <label>Date (optional)</label>
                        <input type="datetime-local" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                      </div>

                      <div className="col-lg-6">
                        <label>Clocking In (time)</label>
                        <div className="form-icon">
                          <TimePicker className="input-group-text" onChange={handleClockingInChange} defaultValue={dayjs("00:00:00", "HH:mm:ss")} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label>Clocking Out (time)</label>
                        <div className="form-icon">
                          <TimePicker className="input-group-text" onChange={handleClockingOutChange} defaultValue={dayjs("00:00:00", "HH:mm:ss")} />
                        </div>
                      </div>

                      <div className="col-12">
                        <label>Notes</label>
                        <textarea className="form-control" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
                      </div>
                    </div>

                    <div className="modal-footer-btn mt-3">
                      <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal" disabled={createLoading}>Cancel</button>
                      <button type="submit" className="btn btn-submit" disabled={createLoading}>{createLoading ? "Saving..." : "Submit"}</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* /modal */}
    </div>
  );
};

export default AddShift;
