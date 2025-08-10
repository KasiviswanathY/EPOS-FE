"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Link from "next/link";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import Table from "@/core/common/pagination/datatable";
import AddUsers from "@/core/modals/usermanagement/addusers";
import EditUser from "@/core/modals/usermanagement/edituser";
import { fetchUsersList } from "@/lib/redux/actions/getallusersAction";
import { deleteUser } from "@/lib/redux/actions/deleteUserAction";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
export default function UsersComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const { usersList, usersListLoading, usersListError } = useSelector(
    (state: RootState) => state.app
  );
const handlerefresh = () => {
    dispatch(fetchUsersList());
  }
  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      dispatch(deleteUser({ id: userToDelete.id }));
      setUserToDelete(null);
    }
  };

  const dataSource = usersList.map((user: { id: any; }, index: any) => ({
    ...user,
    key: user.id || index,
  }));

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text: any) => <span style={{ fontWeight: 500 }}>{text}</span>,
      sorter: (a: any, b: any) => a.username?.length - b.username?.length,
    },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "permissions" },
    { title: "Created On", dataIndex: "createdAt" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any) => (
        <span
          className={`d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white fs-10 ${
            text === "Active" ? "bg-success" : "bg-danger"
          }`}
        >
          <i className="ti ti-point-filled me-1 fs-11"></i>
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" href="#">
              <i className="feather feather-eye action-eye"></i>
            </Link>
            <Link
              className="me-2 p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              onClick={() => setSelectedUser(record)}
            >
              <i className="feather-edit"></i>
            </Link>
            <Link
              className="confirm-text p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setUserToDelete(record)}
            >
              <i className="feather-trash-2"></i>
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
            <span onClick={handlerefresh}><RefreshIcon /></span>
            
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
      <EditUser user={selectedUser} />
      <CommonDeleteModal
        title="Delete User"
        description={`Are you sure you want to delete "${userToDelete?.username}"?`}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
