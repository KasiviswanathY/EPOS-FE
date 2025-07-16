"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdditionalMember {
  firstName: string;
  lastName: string;
  dob: string;
}

interface Address {
  name: string;
  address1: string;
  address2: string;
  town: string;
  state: string;
  zip: string;
}

interface Customer {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  mainAddress: string;
  contactNumber: string;
  contactNumber2: string;
  email: string;
  type: string;
  maxCredit: number;
  currentBalance: number;
  signUpDate: string;
  notes: string;
  signUpLocation: string;
  additionalMembers: AdditionalMember[];
  addresses: Address[];
}

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [newMember, setNewMember] = useState<AdditionalMember>({ firstName: "", lastName: "", dob: "" });
  const [newAddress, setNewAddress] = useState<Address>({
    name: "",
    address1: "",
    address2: "",
    town: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    const mockData: Customer = {
      id: params.id,
      title: "Mr",
      firstName: "Roger",
      lastName: "Flood",
      dob: "1980-01-01",
      mainAddress: "",
      contactNumber: "1234567890",
      contactNumber2: "",
      email: "roger@example.com",
      type: "",
      maxCredit: 300,
      currentBalance: -163.19,
      signUpDate: "2017-10-17T12:28:56",
      notes: "Some internal notes",
      signUpLocation: "New York Office",
      additionalMembers: [],
      addresses: [],
    };
    setCustomer(mockData);
  }, [params.id]);

  if (!customer) return <div className="content">Loading...</div>;

  const DetailRow = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="row mb-2">
      <label className="col-sm-2 col-form-label text-end fw-semibold">{label}:</label>
      <div className="col-sm-10 d-flex align-items-center">
        <span>{value || "—"}</span>
      </div>
    </div>
  );

  const handleAddMember = () => {
    if (newMember.firstName && newMember.lastName && newMember.dob) {
      setCustomer((prev) =>
        prev ? { ...prev, additionalMembers: [...prev.additionalMembers, newMember] } : prev
      );
      setNewMember({ firstName: "", lastName: "", dob: "" });
    }
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address1 && newAddress.town && newAddress.state && newAddress.zip) {
      setCustomer((prev) =>
        prev ? { ...prev, addresses: [...prev.addresses, newAddress] } : prev
      );
      setNewAddress({ name: "", address1: "", address2: "", town: "", state: "", zip: "" });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">View Customer Details</h4>
          <button className="btn btn-sm btn-primary" onClick={() => router.push("/customers")}>
            Edit
          </button>
        </div>

        {/* Customer Details */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Customer Details</h5>
            <DetailRow label="Title" value={customer.title} />
            <DetailRow label="First Name" value={customer.firstName} />
            <DetailRow label="Last Name" value={customer.lastName} />
            <DetailRow label="Date of Birth" value={customer.dob} />
            <DetailRow label="Main Address" value={customer.mainAddress || "No Main Address"} />
            <DetailRow label="Contact Number" value={customer.contactNumber} />
            <DetailRow label="Contact Number 2" value={customer.contactNumber2} />
            <DetailRow label="Email" value={customer.email} />
            <DetailRow label="Type" value={customer.type || "No Customer Type"} />
            <DetailRow label="Max Credit" value={`$${customer.maxCredit.toFixed(2)}`} />
            <DetailRow label="Current Balance" value={`$${customer.currentBalance.toFixed(2)}`} />
            <DetailRow label="Sign Up Date" value={new Date(customer.signUpDate).toLocaleString()} />
            <DetailRow label="Notes" value={customer.notes} />
            <DetailRow label="Sign Up Location" value={customer.signUpLocation} />
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Additional Card Members</h5>
            {customer.additionalMembers.length === 0 ? (
              <p>No additional members have been found.</p>
            ) : (
              customer.additionalMembers.map((m, i) => (
                <DetailRow key={i} label={`Member ${i + 1}`} value={`${m.firstName} ${m.lastName} (DOB: ${m.dob})`} />
              ))
            )}

            <hr className="my-4" />
            <h6 className="fw-bold mb-3">Add New Additional Member</h6>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label text-end">First name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={newMember.firstName}
                  onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label text-end">Last name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={newMember.lastName}
                  onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label text-end">Date of Birth</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  value={newMember.dob}
                  onChange={(e) => setNewMember({ ...newMember, dob: e.target.value })}
                />
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-success" onClick={handleAddMember}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Customer's Addresses</h5>
            {customer.addresses.length === 0 ? (
              <p>No customer addresses have been found.</p>
            ) : (
              customer.addresses.map((addr, i) => (
                <div key={i}>
                  <DetailRow label="Name" value={addr.name} />
                  <DetailRow label="Address 1" value={addr.address1} />
                  {addr.address2 && <DetailRow label="Address 2" value={addr.address2} />}
                  <DetailRow label="Town" value={addr.town} />
                  <DetailRow label="State" value={addr.state} />
                  <DetailRow label="Zip" value={addr.zip} />
                  <hr />
                </div>
              ))
            )}

            <hr className="my-4" />
            <h6 className="fw-bold mb-3">Add New Address</h6>

            {["name", "address1", "address2", "town", "state", "zip"].map((field) => (
              <div className="row mb-3" key={field}>
                <label className="col-sm-2 col-form-label text-end">
                  {field === "address1"
                    ? "Address Line 1"
                    : field === "address2"
                    ? "Address Line 2"
                    : field === "name"
                    ? "Address Name"
                    : field === "zip"
                    ? "Zip Code"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={(newAddress as any)[field]}
                    onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                  />
                </div>
              </div>
            ))}

            <div className="text-end">
              <button className="btn btn-success" onClick={handleAddAddress}>
                Add
              </button>
            </div>
          </div>
        </div>

        <button className="btn btn-danger" onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
}
