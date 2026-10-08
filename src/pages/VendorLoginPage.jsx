import React, { useState } from "react";
import {
  Store,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Building2,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import "./VendorLoginPage.css";
import logo from "../assets/zenve-zippy-logo-gr95c5PX.png";

const DEMO_VENDORS = [
  {
    id: "VND-8942",
    name: "Chandran Retailers Ltd",
    email: "vendor@chandranretailers.com",
    category: "Pet Food & Nutrition",
  },
  {
    id: "VND-5120",
    name: "BlueCross Animal Pharma",
    email: "contact@bluecrosspharma.com",
    category: "Veterinary Medicines",
  },
  {
    id: "VND-3401",
    name: "Zenve Companion Supplies",
    email: "sales@zenvecompanion.com",
    category: "Pet Beds & Accessories",
  },
  {
    id: "VND-7712",
    name: "PetVitals Co.",
    email: "admin@petvitals.co",
    category: "Coat Cleanser & Grooming",
  },
];

export default function VendorLoginPage({ onLogin }) {
  const [role, setRole] = useState("VENDOR"); 
  const [selectedVendorIndex, setSelectedVendorIndex] = useState(0);
  const [email, setEmail] = useState(DEMO_VENDORS[0].email);
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
    setError("");
    if (selectedRole === "VENDOR") {
      setEmail(DEMO_VENDORS[selectedVendorIndex].email);
      setPassword("password123");
    } else {
      setEmail("admin@vendorcrm.internal");
      setPassword("adminPass2026");
    }
  };

  const handleVendorChange = (e) => {
    const idx = Number(e.target.value);
    setSelectedVendorIndex(idx);
    setEmail(DEMO_VENDORS[idx].email);
    setPassword("password123");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both Email/Username and Password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const chosenVendor = DEMO_VENDORS[selectedVendorIndex];

      const authResponse = {
        token: `mock-jwt-token-${Date.now()}`,
        role: role,
        vendorId: role === "VENDOR" ? chosenVendor.id : null,
        vendorName:
          role === "VENDOR" ? chosenVendor.name : "Admin Operations",
        email: email.trim(),
      };

      onLogin(authResponse);
    }, 500);
  };

  return (
    <div className="login-viewport">
      <div className="login-panel-card">
        <div className="login-brand-block">
          <div
            style={{
              width: "64px",
              height: "64px",
              margin:
                "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={logo}
              alt="Vendor CRM Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          <h2>Vendor CRM</h2>
          <p>Enterprise Operations & Analytics Portal</p>
        </div>

        <div className="login-role-selector">
          <button
            type="button"
            className={`role-tab-btn ${role === "VENDOR" ? "active" : ""}`}
            onClick={() => handleRoleSwitch("VENDOR")}
          >
            <Building2 size={14} />
            <span>Vendor Access</span>
          </button>
          <button
            type="button"
            className={`role-tab-btn ${role === "ADMIN" ? "active" : ""}`}
            onClick={() => handleRoleSwitch("ADMIN")}
          >
            <UserCheck size={14} />
            <span>Admin / Ops</span>
          </button>
        </div>

        {error && (
          <div className="login-error-banner">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form-body">
          {role === "VENDOR" && (
            <div
              className="login-field-group"
              style={{
                background: "#f0fdf4",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #bbf7d0",
              }}
            >
              <label
                htmlFor="vendor-selector"
                style={{
                  color: "#166534",
                  fontWeight: "700",
                  fontSize: "11.5px",
                }}
              >
                SELECT VENDOR ACCOUNT TO TEST:
              </label>
              <select
                id="vendor-selector"
                value={selectedVendorIndex}
                onChange={handleVendorChange}
                style={{
                  width: "100%",
                  marginTop: "4px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "1px solid #86efac",
                  background: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#14532d",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {DEMO_VENDORS.map((v, i) => (
                  <option key={v.id} value={i}>
                    {v.name} ({v.category})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="login-field-group">
            <label htmlFor="login-email">
              {role === "VENDOR"
                ? "Authorized Email Address"
                : "Corporate Admin Email"}
            </label>
            <div className="login-input-wrap">
              <Mail size={16} className="login-field-icon" />
              <input
                id="login-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-field-group">
            <div className="login-label-row">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="forgot-pass-btn"
                onClick={() =>
                  alert(
                    "Password reset link will be sent by Backend SMTP Service.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>
            <div className="login-input-wrap">
              <Lock size={16} className="login-field-icon" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="login-aux-row">
            <label className="remember-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep session active</span>
            </label>
            <span className="role-indicator-badge">
              Role: <strong>{role}</strong>
            </span>
          </div>

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            <span>
              {loading
                ? "Authenticating JWT..."
                : `Sign In as ${role === "VENDOR" ? DEMO_VENDORS[selectedVendorIndex].name : "Admin"}`}
            </span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="login-trust-footer">
          <ShieldCheck size={14} className="text-success" />
          <span>JWT Role-Authorized • Multi-Vendor Scoped Session</span>
        </div>
      </div>
    </div>
  );
}
