"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

import Link from "next/link";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import Table from "@/core/common/pagination/datatable";
import AddUsers from "@/core/modals/usermanagement/addusers";
import EditUser from "@/core/modals/usermanagement/edituser";
import { fetchUsersList } from "@/lib/redux/slices/authSlice";


export default function UsersComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    usersList,
    usersListLoading,
    usersListError,
  } = useSelector((state: RootState) => state.app); // ✅ from authSlice

  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  const dataSource = usersList;


console.log("Data Source:", dataSource);
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text: any) => (
        <span style={{ fontWeight: 500 }}>{text}</span>
      ),
      sorter: (a: any, b: any) => a.username.length - b.username.length,
    },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    { title: "Created On", dataIndex: "createdon" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any) => (
        <span className={`d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white fs-10 ${text === "Active" ? "bg-success" : "bg-danger"}`}>
          <i className="ti ti-point-filled me-1 fs-11"></i>{text}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" href="#">
              <i className="feather feather-eye action-eye"></i>
            </Link>
            <Link className="me-2 p-2" href="#" data-bs-toggle="modal" data-bs-target="#edit-units">
              <i className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" href="#">
              <i className="feather-trash-2" data-bs-toggle="modal" data-bs-target="#delete-modal"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>User List</h4>
              <h6>Manage Your Users</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <TooltipIcons />
            <RefreshIcon />
            <CollapesIcon />
          </ul>
          <div className="page-btn">
            <Link
              href="#"
              className="btn btn-added"
              data-bs-toggle="modal"
              data-bs-target="#add-units"
            >
              <i className="ti ti-circle-plus me-1"></i>
              Add New User
            </Link>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-responsive">
              {usersListLoading ? (
                <div>Loading...</div>
              ) : usersListError ? (
                <div>Error: {usersListError}</div>
              ) : (
                <Table columns={columns} dataSource={dataSource} />
              )}
            </div>
          </div>
        </div>
      </div>

      <AddUsers />
      <EditUser />
    </div>
  );
}
