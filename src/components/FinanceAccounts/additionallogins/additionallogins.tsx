"use client";
import { useState } from "react";
import Link from "next/link";

interface AdditionalLogin {
  id: number;
  username: string;
  enabled: boolean;
}

export default function AdditionalLogins() {
  const [logins] = useState<AdditionalLogin[]>([]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">
            Additional Logins </h4>

          <Link href="/addadditionallogins" className="btn btn-primary">
            ADD ADDITIONAL LOGIN
          </Link>
        </div>
        <div className="card mb-3">
          <div className="card-header fw-semibold">Guide</div>
          <div className="card-body small">
            <p className="mb-1">
              An additional login <strong>may not</strong> edit key configuration information,
              but is able to perform day‑to‑day tasks and may be restricted to only
              have access to certain areas of the software.
            </p>
            <p className="mb-1">
              <strong>Note:</strong> The maximum number of additional logins you may create
              is twice the number of device licenses you own plus one. Therefore you may create 3
              additional logins.
            </p>
            <p className="mb-0">
              Once created, an additional login may be disabled by unchecking the corresponding
              box below. To create a new additional login, click the
              &nbsp;<em>"Add Additional Login"</em> button at the top of this page.
            </p>
          </div>
        </div>
        {logins.length === 0 ? (
          <div className="card">
            <div className="card-body py-2">
              No additional logins created. Please use the &quot;Add Additional Login&quot; button above.
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body p-0">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>User Name</th>
                    <th style={{ width: "140px" }}>Enabled</th>
                  </tr>
                </thead>
                <tbody>
                  {logins.map(({ id, username, enabled }) => (
                    <tr key={id}>
                      <td>{username}</td>
                      <td>
                        <input type="checkbox" defaultChecked={enabled} readOnly />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
