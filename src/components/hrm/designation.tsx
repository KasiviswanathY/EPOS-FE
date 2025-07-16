import CommonFooter from '@/core/common/footer/commonFooter'
import CollapesIcon from '@/core/common/tooltip-content/collapes'
import RefreshIcon from '@/core/common/tooltip-content/refresh'
import TooltipIcons from '@/core/common/tooltip-content/tooltipIcons'
import AddDesignation from '@/core/modals/hrm/adddesignation'
import EditDesignation from '@/core/modals/hrm/editdesignation'
import Link from 'next/link'
import React from 'react'
export default function DesignationComponent (){
return (
    <>
  <div className="page-wrapper">
  <div className="content">
              <div className="page-header">
  <div className="add-item d-flex">
              <div className="page-title">
                <h3>Roles</h3>
              </div>
            </div>
  <div className="d-flex justify-content-end mb-3">
  <Link
      href="addstaff"                   
      className="btn btn-success flex items-center gap-1">Add Roles</Link></div>
</div>
<div style={{ overflowX: "auto" }}>
  <table className="table table-bordered align-middle text-center" style={{ minWidth: "1000px", width: "100%" }}>
    <thead className="bg-light">
      <tr>
        <th>Designation</th>
        <th>Description</th>
        <th>Back Office</th>
        <th>Till</th>
        <th>Admin Access on Till</th>
        <th>Till Settings</th>
        <th>Quick Add Setting</th>
        <th>Clock In/Out Info</th>
       <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Manager</td>
        <td>Full access to all till functions</td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
       <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
      <tr>
        <td>Cashier</td>
        <td>Cashier</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
      <tr>
        <td>Sales Manager</td>
        <td>Sales Manager</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
      <tr>
        <td>Inventory Manager</td>
        <td>Inventory Manager</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
      <tr>
        <td>Accountant</td>
        <td>Accountant</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
      <tr>
        <td>System Administrator</td>
        <td>System Administrator</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
      <tr>
        <td>Hr Manager</td>
        <td>Hr Manager</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
       <tr>
        <td>Marketing Manager</td>
        <td>Marketing Manager</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
       <tr>
        <td>QA Analyst</td>
        <td>QA Analyst</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
       <tr>
        <td>Research Analyst</td>
        <td>Research Analyst</td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td><input type="checkbox" /></td>
        <td><input type="checkbox" defaultChecked /></td>
        <td>
          <button className="btn btn-outline-warning btn-sm fw-bold">EDIT</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div className="d-flex justify-content-start mt-4" >
 <Link href="/employees-grid"className="btn btn-success flex items-center gap-1" ><span className="text-lg leading-none" ></span>Edit Staff</Link>
</div>
</div>
</div>
</>
)
}