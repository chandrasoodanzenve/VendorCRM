import React from "react";
import { BarChart3, Terminal, Store, LogOut } from "lucide-react";
import "./Sidebar.css";
import logo from "../assets/zenve-zippy-logo-gr95c5PX.png";

const NAV_ITEMS = [
  {
    key: "bi-dashboard",
    label: "BI Dashboard",
    icon: BarChart3,
    badge: "Analytics",
  },
  {
    key: "command-centre",
    label: "Command Centre",
    icon: Terminal,
    badge: "Live Ops",
  },
];

export default function Sidebar({ activePage, setActivePage, auth, onLogout }) {
  return (
    <aside className="vendor-sidebar">
      <div className="sidebar-brand">
        <div
          className="brand-logo-wrap"
          style={{
            width: "50px",
            height: "50px",
            minWidth: "40px",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <img
            src={logo}
            alt="Vendor CRM Logo"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "50px",
              maxHeight: "50px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        <div className="brand-text">
          <h2>Vendor CRM</h2>
          <span>Enterprise Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-group-title">MAIN MODULES</span>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={`nav-item-btn ${isActive ? "active" : ""}`}
              onClick={() => setActivePage(item.key)}
            >
              <div className="nav-item-left">
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`nav-badge ${isActive ? "badge-active" : ""}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer-profile">
        <div className="profile-details-row">
          <div className="vendor-avatar">
            {auth?.role === "ADMIN" ? "AD" : "VR"}
          </div>
          <div className="vendor-info">
            <h4>{auth?.vendorName || "Chandran Retailers Ltd"}</h4>
            <span>
              {auth?.role === "ADMIN" ? "Role: Admin" : "Role: Vendor"}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={onLogout}
          title="Sign out of Vendor CRM"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
