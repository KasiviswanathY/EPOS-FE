"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
export default function EditHours() {
  const router = useRouter();
  const today = new Date().toISOString().substring(0, 10);
  const [fromDate, setFromDate]         = useState(today);
  const [toDate, setToDate]             = useState(today);
  const [locationFilter, setLocation]   = useState("all");
  const [staffFilter, setStaff]         = useState("all");
  const [clockTypeFilter, setClockType] = useState("all");

  const resetFilters = () => {
    setFromDate(today);
    setToDate(today);
    setLocation("all");
    setStaff("all");
    setClockType("all");
  };

  const applyFilters = (e: FormEvent) => {
    e.preventDefault();
  };
  const [row, setRow] = useState({
    staff: "Felisha",
    location: "Main Outlet",
    clockIn: "2019-04-27T15:55",
    clockOut: "",
    hoursWorked: "",
    clockType: "None",
    notes: "",
  });

  useEffect(() => {
    if (row.clockIn && row.clockOut) {
      const diffMs =
        new Date(row.clockOut).getTime() - new Date(row.clockIn).getTime();
      const hrs = (diffMs / 1000 / 60 / 60).toFixed(2);
      setRow((r) => ({ ...r, hoursWorked: isNaN(+hrs) ? "" : hrs }));
    }
  }, [row.clockIn, row.clockOut]);

  
  const handleUpdate = () => {
    alert("Hours updated!");
    router.push("/hours");
  };

  const handleCancel = () => router.push("/hours");

  const handleDelete = () => {
    if (confirm("Remove this line?")) {
      router.push("/hours");
    }
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">
            Hours <small className="ms-2 text-info"></small>
          </h4>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/hours")}
          >
             ADD HOURS
          </button>
        </div>
        <form onSubmit={applyFilters} className="mb-4">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <label className="form-label">Filter by Location</label>
              <select
                className="form-select"
                value={locationFilter}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="main">Main Outlet</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Filter by Staff</label>
              <select
                className="form-select"
                value={staffFilter}
                onChange={(e) => setStaff(e.target.value)}
              >
                <option value="all">All Staff</option>
                <option value="felisha">Felisha</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Filter by Clocking Type</label>
              <select
                className="form-select"
                value={clockTypeFilter}
                onChange={(e) => setClockType(e.target.value)}
              >
                <option value="all">All Clocking Types</option>
                <option value="normal">Normal</option>
                <option value="overtime">Overtime</option>
              </select>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={resetFilters}
              >
                RESET
              </button>
              <button type="submit" className="btn btn-primary">
                APPLY
              </button>
            </div>
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 120 }}></th>
                <th>STAFF NAME</th>
                <th>LOCATION</th>
                <th>CLOCKING IN DATE & TIME</th>
                <th>CLOCKING OUT DATE & TIME</th>
                <th>HOURS WORKED</th>
                <th>CLOCKING TYPE</th>
                <th>NOTES</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="text-center">
                  <button
                    className="btn btn-success me-2 "
                    onClick={handleUpdate}
                  >
                    UPDATE
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleCancel}
                  >
                    CANCEL
                    
                  </button>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={row.staff}
                    onChange={(e) =>
                      setRow({ ...row, staff: e.target.value })
                    }
                  >
                    <option value="Felisha">Felisha</option>
                    <option value="John">John</option>
                  </select>
                </td>

                <td>
                  <select
                    className="form-select"
                    value={row.location}
                    onChange={(e) =>
                      setRow({ ...row, location: e.target.value })
                    }
                  >
                    <option value="Main Outlet">Main Outlet</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                </td>

                <td>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={row.clockIn}
                    onChange={(e) =>
                      setRow({ ...row, clockIn: e.target.value })
                    }
                  />
                </td>

                <td>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={row.clockOut}
                    onChange={(e) =>
                      setRow({ ...row, clockOut: e.target.value })
                    }
                  />
                </td>

                <td>
                  <input
                    readOnly
                    className="form-control-plaintext"
                    value={row.hoursWorked}
                  />
                </td>

                <td>
                  <select
                    className="form-select"
                    value={row.clockType}
                    onChange={(e) =>
                      setRow({ ...row, clockType: e.target.value })
                    }
                  >
                    <option value="None">None</option>
                    <option value="Normal">Normal</option>
                    <option value="Overtime">Overtime</option>
                  </select>
                </td>

                <td>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={row.notes}
                    onChange={(e) =>
                      setRow({ ...row, notes: e.target.value })
                    }
                  />
                </td>

                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleDelete}
                    title="Remove row"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
