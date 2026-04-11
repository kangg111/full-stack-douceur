// app/(auth)/account/AccountClient.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useFormValidation, VALIDATION } from "@/lib/use-form-validation";
import ErrorMessage from "../../components/ui/ErrorMessage";
import type { Address, AccountProps } from "../../types";

const MY_STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
];

const emptyAddress = {
  firstName: "",
  lastName: "",
  company: "",
  address: "",
  apartment: "",
  postcode: "",
  city: "",
  state: "Selangor",
  phone: "+60",
  isDefault: false,
};

const BRAND = "#4f0d0d";

// ── Address Form ──
function AddressForm({
  form,
  onChange,
  errors = {},
  clearError,
}: {
  form: AddressFormType;
  // onChange: (field: string, value: string | boolean) => void;
  onChange: (field: keyof AddressFormType, value: string | boolean) => void;
  // errors?: Partial<Record<string, any>>;
  errors?: Partial<Record<keyof AddressFormType, string>>;
  // clearError?: (field: keyof typeof emptyAddress) => void;
  clearError?: (field: keyof AddressFormType) => void;
}) {
  const fc = (field: keyof AddressFormType) =>
    `border rounded-xl px-4 py-3 text-sm outline-none transition-all text-gray-800 placeholder:text-gray-400 ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"
    }`;

  const onFocusStyle = (
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof AddressFormType,
  ) => {
    if (!errors[field]) e.target.style.borderColor = BRAND;
  };
  const onBlurStyle = (
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof AddressFormType,
  ) => {
    if (!errors[field]) e.target.style.borderColor = "#e5e7eb";
  };

  return (
    <div className="space-y-4">
      {/* Country */}
      <div className="border border-gray-200 rounded-xl px-4 py-3">
        <p className="text-xs text-gray-400 mb-1">Country/region</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">Malaysia</p>
          <span className="text-gray-400 text-xs">▾</span>
        </div>
      </div>

      {/* First + Last name */}
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => {
              onChange("firstName", e.target.value);
              clearError?.("firstName");
            }}
            className={`w-full ${fc("firstName")}`}
            onFocus={(e) => onFocusStyle(e, "firstName")}
            onBlur={(e) => onBlurStyle(e, "firstName")}
          />
          <ErrorMessage message={errors.firstName} />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => {
              onChange("lastName", e.target.value);
              clearError?.("lastName");
            }}
            className={`w-full ${fc("lastName")}`}
            onFocus={(e) => onFocusStyle(e, "lastName")}
            onBlur={(e) => onBlurStyle(e, "lastName")}
          />
          <ErrorMessage message={errors.lastName} />
        </div>
      </div>

      {/* Company */}
      <input
        type="text"
        placeholder="Company"
        value={form.company}
        onChange={(e) => onChange("company", e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-all text-gray-800 placeholder:text-gray-400"
        onFocus={(e) => (e.target.style.borderColor = BRAND)}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
      />

      {/* Address */}
      <div>
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => {
            onChange("address", e.target.value);
            clearError?.("address");
          }}
          className={`w-full ${fc("address")}`}
          onFocus={(e) => onFocusStyle(e, "address")}
          onBlur={(e) => onBlurStyle(e, "address")}
        />
        <ErrorMessage message={errors.address} />
      </div>

      {/* Apartment */}
      <input
        type="text"
        placeholder="Apartment, suite, etc (optional)"
        value={form.apartment}
        onChange={(e) => onChange("apartment", e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-all text-gray-800 placeholder:text-gray-400"
        onFocus={(e) => (e.target.style.borderColor = BRAND)}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
      />

      {/* Postcode + City + State */}
      <div className="flex gap-3">
        <div className="w-1/4">
          <input
            type="text"
            placeholder="Postcode"
            value={form.postcode}
            onChange={(e) => {
              onChange("postcode", e.target.value);
              clearError?.("postcode");
            }}
            className={`w-full ${fc("postcode")}`}
            onFocus={(e) => onFocusStyle(e, "postcode")}
            onBlur={(e) => onBlurStyle(e, "postcode")}
          />
          <ErrorMessage message={errors.postcode} />
        </div>
        <div className="w-1/3">
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => {
              onChange("city", e.target.value);
              clearError?.("city");
            }}
            className={`w-full ${fc("city")}`}
            onFocus={(e) => onFocusStyle(e, "city")}
            onBlur={(e) => onBlurStyle(e, "city")}
          />
          <ErrorMessage message={errors.city} />
        </div>
        <div className="flex-1 border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">State/territory</p>
          <select
            value={form.state}
            onChange={(e) => onChange("state", e.target.value)}
            className="w-full text-sm outline-none bg-transparent text-gray-700"
          >
            {MY_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Phone */}
      <div>
        <div
          className={`border rounded-xl px-4 py-3 ${
            errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"
          }`}
        >
          <p className="text-xs text-gray-400 mb-1">Phone</p>
          <div className="flex items-center gap-2">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => {
                onChange("phone", e.target.value);
                clearError?.("phone");
              }}
              className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
              placeholder="+60123456789"
            />
            <span className="text-lg">🇲🇾</span>
          </div>
        </div>
        <ErrorMessage message={errors.phone} />
      </div>

      {/* Default checkbox */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => onChange("isDefault", e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 accent-[#4f0d0d]"
        />
        <span className="text-sm text-gray-600">
          This is my default address
        </span>
      </label>
    </div>
  );
}

// ── Avatar ──
function Avatar({
  initials,
  size = "sm",
}: {
  initials: string | null;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "w-9 h-9 text-sm" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}
      style={{
        backgroundColor: initials ? `${BRAND}15` : "transparent",
        color: BRAND,
        border: `1.5px solid ${BRAND}30`,
      }}
    >
      {initials ?? (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      )}
    </div>
  );
}

const addressValidationRules = {
  firstName: VALIDATION.firstName,
  lastName: VALIDATION.lastName,
  address: VALIDATION.address,
  postcode: VALIDATION.postcode,
  city: VALIDATION.city,
  phone: VALIDATION.phoneRequired,
};

type AddressFormType = typeof emptyAddress;

export default function AccountClient({
  user,
  initialAddresses,
}: AccountProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [mockOrders, setMockOrders] = useState<any[]>([]);

  // Profile
  const [editOpen, setEditOpen] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [saving, setSaving] = useState(false);
  const [displayFirst, setDisplayFirst] = useState(user.firstName ?? "");
  const [displayLast, setDisplayLast] = useState(user.lastName ?? "");

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [savingAddress, setSavingAddress] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [editAddressForm, setEditAddressForm] = useState<
    typeof emptyAddress & { id?: number }
  >(emptyAddress);
  const [savingEditAddress, setSavingEditAddress] = useState(false);

  // Validation hooks
  const {
    errors: profileErrors,
    validate: validateProfile,
    clearError: clearProfileError,
  } = useFormValidation<{ firstName: string; lastName: string }>({
    firstName: VALIDATION.firstName,
  });

  const {
    errors: addErrors,
    validate: validateAdd,
    clearError: clearAddError,
    clearAll: clearAllAdd,
  } = useFormValidation<AddressFormType>(addressValidationRules);

  const {
    errors: editErrors,
    validate: validateEdit,
    clearError: clearEditError,
    clearAll: clearAllEdit,
  } = useFormValidation<AddressFormType>(addressValidationRules);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getInitials = () => {
    const first = displayFirst.trim();
    const last = displayLast.trim();
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    if (first) return first[0].toUpperCase();
    if (last) return last[0].toUpperCase();
    return null;
  };
  const initials = getInitials();
  const displayName =
    [displayFirst, displayLast].filter(Boolean).join(" ") || null;
  const fullName = displayName;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mock-orders") || "[]");
    setMockOrders(stored);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setTimeout(() => {
      router.push("/collections");
      router.refresh();
    }, 1500);
  };

  const handleSignOutEverywhere = async () => {
    setDropdownOpen(false);
    setSigningOut(true);
    await fetch("/api/auth/logout-everywhere", { method: "POST" });
    setTimeout(() => {
      router.push("/collections");
      router.refresh();
    }, 1500);
  };

  const handleSaveProfile = async () => {
    if (!validateProfile({ firstName, lastName })) return;
    setSaving(true);
    const res = await fetch("/api/account/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    });
    if (res.ok) {
      setDisplayFirst(firstName);
      setDisplayLast(lastName);
      setEditOpen(false);
    }
    setSaving(false);
  };

  const updateAddressField = (field: string, value: string | boolean) =>
    setAddressForm((prev) => ({ ...prev, [field]: value }));

  const updateEditAddressField = (field: string, value: string | boolean) =>
    setEditAddressForm((prev) => ({ ...prev, [field]: value }));

  const handleSaveAddress = async () => {
    if (!validateAdd(addressForm)) return;
    setSavingAddress(true);
    const res = await fetch("/api/account/add-address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressForm),
    });
    if (res.ok) {
      const data = await res.json();
      setAddresses((prev) =>
        addressForm.isDefault
          ? [...prev.map((a) => ({ ...a, isDefault: false })), data.address]
          : [...prev, data.address],
      );
      setAddressForm(emptyAddress);
      clearAllAdd();
      setAddAddressOpen(false);
    }
    setSavingAddress(false);
  };

  const openEditAddress = (addr: Address) => {
    setEditAddressForm({
      id: addr.id,
      firstName: addr.firstName,
      lastName: addr.lastName,
      company: addr.company ?? "",
      address: addr.address,
      apartment: addr.apartment ?? "",
      postcode: addr.postcode,
      city: addr.city,
      state: addr.state,
      phone: addr.phone,
      isDefault: addr.isDefault,
    });
    clearAllEdit();
    setEditAddressOpen(true);
  };

  const handleSaveEditAddress = async () => {
    if (!validateEdit(editAddressForm)) return;
    setSavingEditAddress(true);
    const res = await fetch("/api/account/edit-address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editAddressForm),
    });
    if (res.ok) {
      const data = await res.json();
      setAddresses((prev) =>
        editAddressForm.isDefault
          ? prev.map((a) =>
              a.id === data.address.id
                ? data.address
                : { ...a, isDefault: false },
            )
          : prev.map((a) => (a.id === data.address.id ? data.address : a)),
      );
      setEditAddressOpen(false);
    }
    setSavingEditAddress(false);
  };

  const btnPrimary =
    "px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50";
  const btnSecondary =
    "px-6 py-2.5 rounded-xl text-sm transition-all hover:bg-gray-50 disabled:opacity-50";

  return (
    <>
      {/* Signing out overlay */}
      {signingOut && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl px-12 py-10 flex flex-col items-center gap-4">
            <div
              className="w-10 h-10 border-4 border-gray-100 rounded-full animate-spin"
              style={{ borderTopColor: BRAND }}
            />
            <p className="text-gray-700 font-medium tracking-wide">
              Signing out...
            </p>
          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ── */}
      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit profile
              </h2>
              <button
                onClick={() => setEditOpen(false)}
                className="text-gray-300 hover:text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3 mb-1">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearProfileError("firstName");
                  }}
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all text-gray-800 placeholder:text-gray-400 ${
                    profileErrors.firstName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  onFocus={(e) =>
                    !profileErrors.firstName &&
                    (e.target.style.borderColor = BRAND)
                  }
                  onBlur={(e) =>
                    !profileErrors.firstName &&
                    (e.target.style.borderColor = "#e5e7eb")
                  }
                />
                <ErrorMessage message={profileErrors.firstName} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  onFocus={(e) => (e.target.style.borderColor = BRAND)}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl px-4 py-3 mb-1 bg-gray-50 mt-4">
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
            <p className="text-xs text-gray-400 mb-6 px-1">
              This email is used for sign-in and order updates.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className={`${btnSecondary} border border-gray-200 text-gray-600`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className={btnPrimary}
                style={{ backgroundColor: BRAND }}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Address Modal ── */}
      {addAddressOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 flex flex-col max-h-[90vh]">
            <div className="overflow-y-auto p-8 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add address
                </h2>
                <button
                  onClick={() => {
                    setAddAddressOpen(false);
                    clearAllAdd();
                  }}
                  className="text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <AddressForm
                form={addressForm}
                onChange={updateAddressField}
                errors={addErrors}
                clearError={clearAddError}
              />
            </div>
            <div className="border-t border-gray-100 px-8 py-4 flex justify-end gap-3 bg-white rounded-b-2xl">
              <button
                onClick={() => {
                  setAddAddressOpen(false);
                  setAddressForm(emptyAddress);
                  clearAllAdd();
                }}
                className={`${btnSecondary} text-gray-500`}
                style={{ color: BRAND }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={savingAddress}
                className={btnPrimary}
                style={{ backgroundColor: BRAND }}
              >
                {savingAddress ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Address Modal ── */}
      {editAddressOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 flex flex-col max-h-[90vh]">
            <div className="overflow-y-auto p-8 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit address
                </h2>
                <button
                  onClick={() => setEditAddressOpen(false)}
                  className="text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <AddressForm
                form={editAddressForm}
                onChange={updateEditAddressField}
                errors={editErrors}
                clearError={clearEditError}
              />
            </div>
            <div className="border-t border-gray-100 px-8 py-4 flex justify-end gap-3 bg-white rounded-b-2xl">
              <button
                onClick={() => setEditAddressOpen(false)}
                className={btnSecondary}
                style={{ color: BRAND }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditAddress}
                disabled={savingEditAddress}
                className={btnPrimary}
                style={{ backgroundColor: BRAND }}
              >
                {savingEditAddress ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Account layout ── */}
      <div className="min-h-screen bg-[#f0eeeb]">
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-lg tracking-[0.12em] font-light uppercase"
              style={{ color: BRAND }}
            >
              Douceur
            </span>
          </Link>

          <nav className="flex gap-8">
            {(["orders", "profile"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-sm font-medium pb-1 border-b-2 transition-all capitalize"
                style={{
                  borderColor: activeTab === tab ? BRAND : "transparent",
                  color: activeTab === tab ? BRAND : "#9ca3af",
                }}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Avatar initials={initials} size="sm" />
              <span className="text-xs" style={{ color: `${BRAND}60` }}>
                {dropdownOpen ? "▲" : "▼"}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <Avatar initials={initials} size="md" />
                  <div className="min-w-0">
                    {displayName && (
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: BRAND }}
                      >
                        {displayName}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("profile");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0eeeb] transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOutEverywhere}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0eeeb] transition-colors"
                >
                  Sign out everywhere
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-red-50 transition-colors"
                    style={{ color: BRAND }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Orders tab */}
          {activeTab === "orders" && (
            <>
              <h1
                className="text-2xl font-semibold mb-6"
                style={{ color: BRAND }}
              >
                Orders
              </h1>
              {mockOrders.length === 0 ? (
                <div
                  className="bg-white rounded-2xl border p-16 text-center shadow-sm"
                  style={{ borderColor: "#f0dada" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${BRAND}10` }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="none"
                      stroke={BRAND}
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263
                        12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243
                        l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-700 mb-1">
                    No orders yet
                  </p>
                  <p className="text-sm text-gray-400">
                    <Link
                      href="/collections"
                      className="hover:underline underline-offset-2"
                      style={{ color: BRAND }}
                    >
                      Go to store to place an order.
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border p-6 shadow-sm"
                      style={{ borderColor: "#f0dada" }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Order ID</p>
                          <p
                            className="font-mono text-sm font-medium"
                            style={{ color: BRAND }}
                          >
                            {order.id}
                          </p>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-green-700
                          bg-green-50 border border-green-100"
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-1 mb-4">
                        {order.items.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-500">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium text-gray-700">
                              RM{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        className="border-t pt-3 flex justify-between"
                        style={{ borderColor: "#f0dada" }}
                      >
                        <p className="text-xs text-gray-400">
                          {new Date(order.date).toLocaleDateString("en-MY", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: BRAND }}
                        >
                          RM{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Profile tab */}
          {activeTab === "profile" && (
            <>
              <h1
                className="text-2xl font-semibold mb-6"
                style={{ color: BRAND }}
              >
                Profile
              </h1>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 shadow-sm">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">
                      Name
                    </p>
                    <p className="font-medium text-gray-800">
                      {fullName || "—"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFirstName(displayFirst);
                      setLastName(displayLast);
                      setEditOpen(true);
                    }}
                    className="p-2 rounded-lg transition-colors hover:bg-gray-50"
                    style={{ color: BRAND }}
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                <div className="border-t border-gray-50 pt-4">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">
                    Email
                  </p>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <p className="font-medium text-gray-800">Addresses</p>
                  <button
                    onClick={() => setAddAddressOpen(true)}
                    className="text-sm font-medium px-4 py-1.5 rounded-lg border transition-all hover:opacity-80"
                    style={{
                      color: BRAND,
                      borderColor: `${BRAND}30`,
                      backgroundColor: `${BRAND}08`,
                    }}
                  >
                    + Add
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-[#f0eeeb] rounded-xl p-5 flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">ⓘ</span>
                    </div>
                    <span>No addresses added</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="rounded-xl border p-4 text-sm flex flex-col gap-1 transition-all hover:shadow-sm"
                        style={{
                          backgroundColor: addr.isDefault
                            ? `${BRAND}05`
                            : "#fafafa",
                          borderColor: addr.isDefault
                            ? `${BRAND}20`
                            : "#f3f4f6",
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          {addr.isDefault ? (
                            <span
                              className="text-[10px] font-semibold tracking-wider uppercase
                              px-2 py-0.5 rounded-full"
                              style={{
                                color: BRAND,
                                backgroundColor: `${BRAND}10`,
                              }}
                            >
                              Default
                            </span>
                          ) : (
                            <span />
                          )}
                          <button
                            onClick={() => openEditAddress(addr)}
                            className="p-1 rounded transition-colors hover:bg-white"
                            style={{ color: BRAND }}
                          >
                            <Pencil size={12} />
                          </button>
                        </div>
                        <p className="font-semibold text-gray-800">
                          {addr.firstName} {addr.lastName}
                        </p>
                        <p className="text-gray-400 text-xs">{addr.address}</p>
                        {addr.apartment && (
                          <p className="text-gray-400 text-xs">
                            {addr.apartment}
                          </p>
                        )}
                        <p className="text-gray-400 text-xs">
                          {addr.postcode} {addr.city}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {addr.state}, Malaysia
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {addr.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
