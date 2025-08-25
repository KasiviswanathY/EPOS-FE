"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  role?: string;
  createdon?: string;
  status?: string;
  description?: string;
  password?: string;
  permissions?: string[];
}

type EditUserForm = Omit<User, "id"> & {
  confirmPassword?: string;
};

export default function EditUserFormComponent() {
  const [submittedData, setSubmittedData] = useState<EditUserForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserForm>({
    defaultValues: {
      name: "", // 👈 Added this (mandatory field in User)
      username: "",
      phone: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      description: "",
      status: "",
      permissions: [], // 👈 Added permissions
    },
  });

  const onSubmit = (data: EditUserForm) => {
    setSubmittedData(data);
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            {...register("username")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            {...register("phone")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            {...register("role")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select {...register("status")} className="w-full border px-3 py-2 rounded">
            <option value="">Select status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {/* Permissions */}
        <div>
          <label className="block mb-1 font-medium">Permissions</label>
          <select
            multiple
            {...register("permissions")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="delete">Delete</option>
            <option value="update">Update</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold mb-2">Submitted Data:</h3>
          <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
