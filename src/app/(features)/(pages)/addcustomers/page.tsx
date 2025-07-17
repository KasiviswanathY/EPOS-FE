"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type CustomerForm = {
  title: string;
  firstName: string;
  lastName: string;
  business: string;
  dob: string;
  phone1: string;
  phone2: string;
  email: string;
  type: string;
  credit: string;
  balance: string;
  notes: string;
  location: string;
};

type MemberForm = Omit<CustomerForm, "title" | "business" | "phone2" | "email">;
type AddressForm = {
  name: string;
  line1: string;
  line2: string;
  town: string;
  state: string;
  zip: string;
};

const blankCustomer: CustomerForm = {
  title: "",
  firstName: "",
  lastName: "",
  business: "",
  dob: "",
  phone1: "",
  phone2: "",
  email: "",
  type: "None",
  credit: "",
  balance: "",
  notes: "",
  location: "",
};

const blankAddress: AddressForm = {
  name: "",
  line1: "",
  line2: "",
  town: "",
  state: "",
  zip: "",
};

export default function AddCustomerPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerForm>(blankCustomer);
  const [members, setMembers] = useState<MemberForm[]>([]);
  const [addresses, setAddresses] = useState<AddressForm[]>([blankAddress]);

  const handleCust = (field: keyof CustomerForm, v: string) =>
    setCustomer((c) => ({ ...c, [field]: v }));

  const handleMember = (
    idx: number,
    field: keyof MemberForm,
    v: string,
  ) =>
    setMembers((arr) =>
      arr.map((m, i) => (i === idx ? { ...m, [field]: v } : m)),
    );

  const handleAddr = (
    idx: number,
    field: keyof AddressForm,
    v: string,
  ) =>
    setAddresses((arr) =>
      arr.map((a, i) => (i === idx ? { ...a, [field]: v } : a)),
    );

  const save = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { customer, members, addresses };
    // await fetch("/api/customers", { method: "POST", body: JSON.stringify(payload) });
    router.push("/customers");
  };

  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="row mb-3">
      <label className="col-md-3 col-xl-2 col-form-label text-md-end">
        {label}
      </label>
      <div className="col-md-9 col-xl-10">{children}</div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="fw-bold mb-4">Add a new Customer</h4>

        <form onSubmit={save}>
          <div className="card mb-4">
            <div className="card-header fw-semibold py-2">Customer</div>
            <div className="card-body">
              <Field label="Title">
                <select
                  className="form-select"
                  value={customer.title}
                  onChange={(e) => handleCust("title", e.target.value)}
                >
                  <option value=""></option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                  <option>Dr</option>
                </select>
              </Field>

              <Field label="First name">
                <input
                  className="form-control"
                  value={customer.firstName}
                  onChange={(e) => handleCust("firstName", e.target.value)}
                />
              </Field>

              <Field label="Last name">
                <input
                  className="form-control"
                  value={customer.lastName}
                  onChange={(e) => handleCust("lastName", e.target.value)}
                />
              </Field>

              <Field label="Business Name">
                <input
                  className="form-control"
                  value={customer.business}
                  onChange={(e) => handleCust("business", e.target.value)}
                />
              </Field>

              <Field label="Date of Birth">
                <input
                  type="date"
                  className="form-control"
                  value={customer.dob}
                  onChange={(e) => handleCust("dob", e.target.value)}
                />
              </Field>

              <Field label="Contact Number">
                <input
                  className="form-control"
                  value={customer.phone1}
                  onChange={(e) => handleCust("phone1", e.target.value)}
                />
              </Field>

              <Field label="Contact Number 2">
                <input
                  className="form-control"
                  value={customer.phone2}
                  onChange={(e) => handleCust("phone2", e.target.value)}
                />
              </Field>

              <Field label="Email Address">
                <input
                  type="email"
                  className="form-control"
                  value={customer.email}
                  onChange={(e) => handleCust("email", e.target.value)}
                />
              </Field>

              <Field label="Type">
                <div className="d-flex">
                  <select
                    className="form-select"
                    value={customer.type}
                    onChange={(e) => handleCust("type", e.target.value)}
                  >
                    <option>None</option>
                    <option>Retail</option>
                    <option>Trade</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={() => alert("Launch type‑creation modal")}>CREATE TYPE</button>
                </div>
              </Field>

              <Field label="Max Credit">
                <input
                  className="form-control"
                  value={customer.credit}
                  onChange={(e) => handleCust("credit", e.target.value)}
                />
              </Field>

              <Field label="Current Balance">
                <input
                  className="form-control"
                  value={customer.balance}
                  onChange={(e) => handleCust("balance", e.target.value)}
                />
              </Field>

              <Field label="Notes">
                <textarea
                  rows={3}
                  className="form-control"
                  value={customer.notes}
                  onChange={(e) => handleCust("notes", e.target.value)}
                />
              </Field>

              <Field label="Sign Up Location">
                <select
                  className="form-select"
                  value={customer.location}
                  onChange={(e) => handleCust("location", e.target.value)}
                >
                  <option></option>
                  <option>Store A</option>
                  <option>Store B</option>
                </select>
              </Field>
            </div>
          </div>
          {members.map((m, idx) => (
            <div className="card mb-4" key={idx}>
              <div className="card-header fw-semibold py-2">
                Add New Additional Member #{idx + 1}
                <button
                  type="button"
                  className="btn-close float-end"
                  onClick={() =>
                    setMembers((arr) => arr.filter((_, i) => i !== idx))
                  }
                />
              </div>
              <div className="card-body">
                <Field label="First name">
                  <input
                    className="form-control"
                    value={m.firstName}
                    onChange={(e) =>
                      handleMember(idx, "firstName", e.target.value)
                    }
                  />
                </Field>

                <Field label="Last name">
                  <input
                    className="form-control"
                    value={m.lastName}
                    onChange={(e) =>
                      handleMember(idx, "lastName", e.target.value)
                    }
                  />
                </Field>

                <Field label="Date of Birth">
                  <input
                    type="date"
                    className="form-control"
                    value={m.dob}
                    onChange={(e) => handleMember(idx, "dob", e.target.value)}
                  />
                </Field>

                <Field label="Type">
                  <div className="d-flex">
                    <select
                      className="form-select"
                      value={m.type}
                      onChange={(e) =>
                        handleMember(idx, "type", e.target.value)
                      }
                    >
                      <option>None</option>
                      <option>Retail</option>
                      <option>Trade</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-primary ms-2"
                      onClick={() => alert("Launch type‑creation modal")}
                    >
                      CREATE TYPE
                    </button>
                  </div>
                </Field>

                <Field label="Max Credit">
                  <input
                    className="form-control"
                    value={m.credit}
                    onChange={(e) =>
                      handleMember(idx, "credit", e.target.value)
                    }
                  />
                </Field>

                <Field label="Current Balance">
                  <input
                    className="form-control"
                    value={m.balance}
                    onChange={(e) =>
                      handleMember(idx, "balance", e.target.value)
                    }
                  />
                </Field>

                <Field label="Notes">
                  <textarea
                    rows={3}
                    className="form-control"
                    value={m.notes}
                    onChange={(e) =>
                      handleMember(idx, "notes", e.target.value)
                    }
                  />
                </Field>

                <Field label="Sign Up Location">
                  <select
                    className="form-select"
                    value={m.location}
                    onChange={(e) =>
                      handleMember(idx, "location", e.target.value)
                    }
                  >
                    <option></option>
                    <option>Store A</option>
                    <option>Store B</option>
                  </select>
                </Field>
              </div>
            </div>
          ))}
          {addresses.map((a, idx) => (
            <div className="card mb-4" key={idx}>
              <div className="card-header fw-semibold py-2">
                Add New Address {addresses.length > 1 && `#${idx + 1}`}
                {addresses.length > 1 && (
                  <button
                    type="button"
                    className="btn-close float-end"
                    onClick={() =>
                      setAddresses((arr) => arr.filter((_, i) => i !== idx))
                    }
                  />
                )}
              </div>
              <div className="card-body">
                <Field label="Address Name">
                  <input
                    className="form-control"
                    value={a.name}
                    onChange={(e) => handleAddr(idx, "name", e.target.value)}
                  />
                </Field>

                <Field label="Address Line 1">
                  <input
                    className="form-control"
                    value={a.line1}
                    onChange={(e) => handleAddr(idx, "line1", e.target.value)}
                  />
                </Field>

                <Field label="Address Line 2">
                  <input
                    className="form-control"
                    value={a.line2}
                    onChange={(e) => handleAddr(idx, "line2", e.target.value)}
                  />
                </Field>

                <Field label="Town">
                  <input
                    className="form-control"
                    value={a.town}
                    onChange={(e) => handleAddr(idx, "town", e.target.value)}
                  />
                </Field>

                <Field label="State">
                  <input
                    className="form-control"
                    value={a.state}
                    onChange={(e) => handleAddr(idx, "state", e.target.value)}
                  />
                </Field>

                <Field label="Zip Code">
                  <div className="d-flex">
                    <input
                      className="form-control"
                      value={a.zip}
                      onChange={(e) => handleAddr(idx, "zip", e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary ms-2"
                      onClick={() => alert("Lookup / complete address")}
                    >
                      COMPLETE ADDRESS
                    </button>
                  </div>
                </Field>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => router.push("/customers")}
                >
                  CANCEL
                </button>
                <div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() => setAddresses((arr) => [...arr, blankAddress])}
                  >
                    ADD ANOTHER
                  </button>
                  <button type="submit" className="btn btn-success">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
