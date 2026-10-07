import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Percent,
  RotateCcw,
  Truck,
  Award,
  Search,
  ArrowUpDown,
  FileSpreadsheet,
  FileText,
  Building2,
  Lock,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./BIDashboard.css";

const ALL_PRODUCTS = [
  {
    id: "PRD-01",
    name: "Royal Canin Maxi Adult Dog Food (15kg)",
    category: "Pet Food",
    vendor: "Chandran Retailers Ltd",
    sold: 482,
    revenue: 168700,
    stock: 45,
    status: "In Stock",
  },
  {
    id: "PRD-02",
    name: "Bravecto Chewable Tick & Flea Tablet",
    category: "Medicines",
    vendor: "BlueCross Animal Pharma",
    sold: 395,
    revenue: 98750,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: "PRD-03",
    name: "Whiskas Ocean Fish Adult Cat Food (7kg)",
    category: "Pet Food",
    vendor: "Chandran Retailers Ltd",
    sold: 340,
    revenue: 74800,
    stock: 82,
    status: "In Stock",
  },
  {
    id: "PRD-04",
    name: "Pet Care Orthopedic Memory Foam Bed",
    category: "Accessories",
    vendor: "Zenve Companion Supplies",
    sold: 210,
    revenue: 52500,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-05",
    name: "Himalaya Erina Plus Coat Cleanser Shampoo",
    category: "Grooming",
    vendor: "PetVitals Co.",
    sold: 188,
    revenue: 37600,
    stock: 64,
    status: "In Stock",
  },
  {
    id: "PRD-06",
    name: "Pedigree Dentastix Daily Dental Chews",
    category: "Pet Food",
    vendor: "Chandran Retailers Ltd",
    sold: 165,
    revenue: 24750,
    stock: 30,
    status: "In Stock",
  },
];

const VENDOR_ANALYTICS_DATA = {
  All: {
    grossRevenue: 472000,
    netProfit: 151500,
    salesCount: 3840,
    totalOrders: 3024,
    activeProducts: 6,
    totalCustomers: 1890,
    commissionRate: 37760,
    deliveryRate: "96.8%",
    returnRate: "2.8%",
    aov: 1229,
    pendingSettlement: 42300,
    cancelledOrders: 38,
    revenueTrend: [
      { month: "Jan", revenue: 42000, profit: 12500 },
      { month: "Feb", revenue: 53000, profit: 16200 },
      { month: "Mar", revenue: 61000, profit: 19800 },
      { month: "Apr", revenue: 58000, profit: 17400 },
      { month: "May", revenue: 74000, profit: 24100 },
      { month: "Jun", revenue: 89000, profit: 29500 },
      { month: "Jul", revenue: 95000, profit: 32000 },
    ],
    categoryShare: [
      { name: "Pet Food", value: 42, color: "#176B5B" },
      { name: "Medicines", value: 28, color: "#2A9D8F" },
      { name: "Accessories", value: 18, color: "#4A90A4" },
      { name: "Grooming", value: 12, color: "#F4B942" },
    ],
    orderStatus: [
      { status: "Delivered", count: 620, color: "#22A06B" },
      { status: "In-Transit", count: 95, color: "#4A90A4" },
      { status: "Pending", count: 48, color: "#F4B942" },
      { status: "Returned", count: 24, color: "#D9534F" },
    ],
  },
  "Chandran Retailers Ltd": {
    grossRevenue: 268250,
    netProfit: 85840,
    salesCount: 987,
    totalOrders: 812,
    activeProducts: 3,
    totalCustomers: 540,
    commissionRate: 21460,
    deliveryRate: "97.2%",
    returnRate: "2.4%",
    aov: 1140,
    pendingSettlement: 28400,
    cancelledOrders: 11,
    revenueTrend: [
      { month: "Jan", revenue: 24000, profit: 7500 },
      { month: "Feb", revenue: 31000, profit: 9800 },
      { month: "Mar", revenue: 35000, profit: 11200 },
      { month: "Apr", revenue: 33000, profit: 10400 },
      { month: "May", revenue: 42000, profit: 13500 },
      { month: "Jun", revenue: 49000, profit: 15800 },
      { month: "Jul", revenue: 54250, profit: 17640 },
    ],
    categoryShare: [
      { name: "Pet Food", value: 85, color: "#176B5B" },
      { name: "Accessories", value: 15, color: "#4A90A4" },
    ],
    orderStatus: [
      { status: "Delivered", count: 340, color: "#22A06B" },
      { status: "In-Transit", count: 48, color: "#4A90A4" },
      { status: "Pending", count: 18, color: "#F4B942" },
      { status: "Returned", count: 8, color: "#D9534F" },
    ],
  },
  "BlueCross Animal Pharma": {
    grossRevenue: 98750,
    netProfit: 34500,
    salesCount: 395,
    totalOrders: 320,
    activeProducts: 1,
    totalCustomers: 280,
    commissionRate: 7900,
    deliveryRate: "99.1%",
    returnRate: "1.2%",
    aov: 1420,
    pendingSettlement: 12800,
    cancelledOrders: 4,
    revenueTrend: [
      {
         month: "Jan", revenue: 9000, profit: 3100
         },
      { month: "Feb", revenue: 11000, profit: 3800 },
      { month: "Mar", revenue: 13500, profit: 4700 },
      { month: "Apr", revenue: 12000, profit: 4200 },
      { month: "May", revenue: 16000, profit: 5600 },
      { month: "Jun", revenue: 18250, profit: 6400 },
      { month: "Jul", revenue: 19000, profit: 6700 },
    ],
    categoryShare: [{ name: "Medicines", value: 100, color: "#2A9D8F" }],
    orderStatus: [
      { status: "Delivered", count: 180, color: "#22A06B" },
      { status: "In-Transit", count: 24, color: "#4A90A4" },
      { status: "Pending", count: 12, color: "#F4B942" },
      { status: "Returned", count: 3, color: "#D9534F" },
    ],
  },
  "Zenve Companion Supplies": {
    grossRevenue: 52500,
    netProfit: 18200,
    salesCount: 210,
    totalOrders: 175,
    activeProducts: 1,
    totalCustomers: 160,
    commissionRate: 4200,
    deliveryRate: "95.8%",
    returnRate: "3.8%",
    aov: 2500,
    pendingSettlement: 8500,
    cancelledOrders: 8,
    revenueTrend: [
      {
        month: "Jan",
        revenue: 5000,
        profit: 1700,
      },
      {
        month: "Feb",
        revenue: 6200,
        profit: 2100,
      },
      { 
        month: "Mar", 
        revenue: 7500, 
        profit: 2600 
      },
      { 
        month: "Apr", 
        revenue: 7000, 
        profit: 2400 
      },
      { 
        month: "May", 
        revenue: 9000, 
        profit: 3100 
      },
      { 
        month: "Jun", 
        revenue: 8800, 
        profit: 3050 
      },
      { 
        month: "Jul", 
        revenue: 9000, 
        profit: 3250 
      },
    ],
    categoryShare: [{ name: "Accessories", value: 100, color: "#4A90A4" }],
    orderStatus: [
      { 
        status: "Delivered", 
        count: 85, 
        color: "#22A06B" 
      },
      { 
        status: "In-Transit", 
        count: 16, 
        color: "#4A90A4" 
      },
      { 
        status: "Pending", 
        count: 10, 
        color: "#F4B942" 
      },
      { 
        status: "Returned", 
        count: 7, 
        color: "#D9534F" 
      },
    ],
  },
  "PetVitals Co.": {
    grossRevenue: 37600,
    netProfit: 12960,
    salesCount: 188,
    totalOrders: 154,
    activeProducts: 1,
    totalCustomers: 135,
    commissionRate: 3000,
    deliveryRate: "96.5%",
    returnRate: "2.1%",
    aov: 800,
    pendingSettlement: 5600,
    cancelledOrders: 5,
    revenueTrend: [
      { month: "Jan", revenue: 4000, profit: 1350 },
      { month: "Feb", revenue: 4800, profit: 1650 },
      { month: "Mar", revenue: 5000, profit: 1720 },
      { month: "Apr", revenue: 6000, profit: 2050 },
      { month: "May", revenue: 5800, profit: 2000 },
      { month: "Jun", revenue: 6000, profit: 2070 },
      { month: "Jul", revenue: 6000, profit: 2120 },
    ],
    categoryShare: [{ name: "Grooming", value: 100, color: "#F4B942" }],
    orderStatus: [
      { status: "Delivered", count: 72, color: "#22A06B" },
      { status: "In-Transit", count: 11, color: "#4A90A4" },
      { status: "Pending", count: 8, color: "#F4B942" },
      { status: "Returned", count: 4, color: "#D9534F" },
    ],
  },
};

export default function BIDashboard({
  userRole = "VENDOR",
  vendorName = "Chandran Retailers Ltd",
}) {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedVendor, setSelectedVendor] = useState(
    userRole === "VENDOR" ? vendorName : "All",
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isVendor = userRole === "VENDOR";

  const activeVendorKey = isVendor ? vendorName : selectedVendor;

  const activeDataset =
    VENDOR_ANALYTICS_DATA[activeVendorKey] || VENDOR_ANALYTICS_DATA["All"];

  const dateScaleMultiplier = useMemo(() => {
    switch (dateRange) {
      case "today":
        return 0.04;
      case "7d":
        return 0.25;
      case "30d":
        return 1.0;
      case "90d":
        return 2.8;
      case "ytd":
        return 5.5;
      default:
        return 1.0;
    }
  }, [dateRange]);

  const KPI_METRICS = useMemo(() => {
    const rev = Math.round(activeDataset.grossRevenue * dateScaleMultiplier);
    const prof = Math.round(activeDataset.netProfit * dateScaleMultiplier);
    const sales = Math.round(activeDataset.salesCount * dateScaleMultiplier);
    const orders = Math.round(activeDataset.totalOrders * dateScaleMultiplier);
    const comm = Math.round(activeDataset.commissionRate * dateScaleMultiplier);
    const settl = Math.round(
      activeDataset.pendingSettlement *
        (dateScaleMultiplier > 1 ? 1.5 : dateScaleMultiplier),
    );
    const canc = Math.max(
      1,
      Math.round(activeDataset.cancelledOrders * dateScaleMultiplier),
    );

    return [
      {
        title: "Gross Revenue",
        value: `₹${rev.toLocaleString()}`,
        change: "+18.4%",
        isPositive: true,
        icon: DollarSign,
        color: "#176B5B",
      },
      {
        title: "Net Profit",
        value: `₹${prof.toLocaleString()}`,
        change: "+14.2%",
        isPositive: true,
        icon: TrendingUp,
        color: "#22A06B",
      },
      {
        title: "Total Sales Count",
        value: sales.toLocaleString(),
        change: "+9.8%",
        isPositive: true,
        icon: ShoppingBag,
        color: "#2A9D8F",
      },
      {
        title: "Total Orders",
        value: orders.toLocaleString(),
        change: "+12.1%",
        isPositive: true,
        icon: Package,
        color: "#176B5B",
      },
      {
        title: "Active Products",
        value: activeDataset.activeProducts.toString(),
        change: "+4.0%",
        isPositive: true,
        icon: Package,
        color: "#4A90A4",
      },
      {
        title: "Total Customers",
        value: activeDataset.totalCustomers.toLocaleString(),
        change: "+16.5%",
        isPositive: true,
        icon: Users,
        color: "#2A9D8F",
      },
      {
        title: "Commission Paid",
        value: `₹${comm.toLocaleString()}`,
        change: "8% rate",
        isPositive: false,
        icon: Percent,
        color: "#718096",
      },
      {
        title: "Delivery Success Rate",
        value: activeDataset.deliveryRate,
        change: "+1.2%",
        isPositive: true,
        icon: Truck,
        color: "#22A06B",
      },
      {
        title: "Return Rate",
        value: activeDataset.returnRate,
        change: "-0.4%",
        isPositive: true,
        icon: RotateCcw,
        color: "#F4B942",
      },
      {
        title: "Avg Order Value",
        value: `₹${activeDataset.aov.toLocaleString()}`,
        change: "+5.6%",
        isPositive: true,
        icon: Award,
        color: "#176B5B",
      },
      {
        title: "Pending Settlement",
        value: `₹${settl.toLocaleString()}`,
        change: "Tomorrow",
        isPositive: true,
        icon: DollarSign,
        color: "#4A90A4",
      },
      {
        title: "Cancelled Orders",
        value: canc.toString(),
        change: "-12.0%",
        isPositive: true,
        icon: TrendingDown,
        color: "#D9534F",
      },
    ];
  }, [activeDataset, dateScaleMultiplier]);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      const matchesVendor = isVendor
        ? p.vendor === vendorName
        : selectedVendor === "All" || p.vendor === selectedVendor;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || p.status === selectedStatus;

      return matchesVendor && matchesSearch && matchesCat && matchesStatus;
    });
  }, [
    isVendor,
    vendorName,
    selectedVendor,
    searchQuery,
    selectedCategory,
    selectedStatus,
  ]);

  const handleExportCSV = () => {
    const headers = [
      "Product ID,Product Name,Category,Vendor,Units Sold,Revenue (INR),Stock,Status\n",
    ];
    const rows = filteredProducts
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.category}","${p.vendor}",${p.sold},${p.revenue},${p.stock},"${p.status}"`,
      )
      .join("\n");

    const blob = new Blob([headers + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${activeVendorKey}_Analytics_${dateRange}_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8" /></head>
      <body>
        <table border="1">
          <thead>
            <tr style="background-color: #176B5B; color: #ffffff; font-weight: bold;">
              <th>Product ID</th><th>Product Name</th><th>Category</th><th>Vendor</th><th>Units Sold</th><th>Revenue (INR)</th><th>Stock</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredProducts
              .map(
                (p) => `
              <tr>
                <td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${p.vendor}</td><td>${p.sold}</td><td>${p.revenue}</td><td>${p.stock}</td><td>${p.status}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </body></html>
    `;
    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeVendorKey}_Report_${dateRange}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bi-dashboard-container">
      <header className="bi-header">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <h1 className="bi-title">BI Analytics Dashboard</h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                padding: "2px 8px",
                borderRadius: "9999px",
                backgroundColor: isVendor ? "var(--primary-light)" : "#e0e7ff",
                color: isVendor ? "var(--primary)" : "#4338ca",
              }}
            >
              {isVendor
                ? `Authorized Vendor: ${vendorName}`
                : `Admin: Filtered by ${selectedVendor}`}
            </span>
          </div>
          <p className="bi-subtitle">
            {isVendor
              ? `Dynamic sales metrics & commercial aggregations for ${vendorName}.`
              : selectedVendor === "All"
                ? "Marketplace-wide commercial intelligence across all vendors."
                : `Active analytics filtered for ${selectedVendor}.`}
          </p>
        </div>

        <div className="bi-header-actions no-print">
          <div className="filter-select-wrap">
            <Calendar size={15} className="select-icon" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bi-select"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 3 Months</option>
              <option value="ytd">Year to Date (YTD)</option>
            </select>
          </div>

          <div className="export-btn-group">
            <button
              type="button"
              className="btn-export"
              onClick={handleExportCSV}
              title="Export CSV file"
            >
              <Download size={13} />
              <span>CSV</span>
            </button>
            <button
              type="button"
              className="btn-export"
              onClick={handleExportExcel}
              title="Export Excel Spreadsheet"
            >
              <FileSpreadsheet size={13} />
              <span>Excel</span>
            </button>
            <button
              type="button"
              className="btn-export btn-pdf"
              onClick={() => window.print()}
              title="Print / PDF View"
            >
              <FileText size={13} />
              <span>PDF Report</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bi-secondary-filters no-print">
        {isVendor ? (
          <div
            className="filter-item"
            style={{
              background: "var(--primary-light)",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            <Lock size={13} style={{ color: "var(--primary)" }} />
            <span
              style={{
                color: "var(--primary)",
                fontSize: "11.5px",
                fontWeight: "700",
              }}
            >
              Vendor Scope: {vendorName}
            </span>
          </div>
        ) : (
          <div className="filter-item">
            <Building2 size={14} className="text-primary" />
            <label>Vendor Filter:</label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="bi-mini-select"
            >
              <option value="All">All Authorized Vendors (Marketplace)</option>
              <option value="Chandran Retailers Ltd">
                Chandran Retailers Ltd
              </option>
              <option value="BlueCross Animal Pharma">
                BlueCross Animal Pharma
              </option>
              <option value="Zenve Companion Supplies">
                Zenve Companion Supplies
              </option>
              <option value="PetVitals Co.">PetVitals Co.</option>
            </select>
          </div>
        )}

        <div className="filter-item">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bi-mini-select"
          >
            <option value="All">All Categories</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Medicines">Medicines</option>
            <option value="Accessories">Accessories</option>
            <option value="Grooming">Grooming</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Stock Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bi-mini-select"
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="filter-search-box">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search item, SKU, category, vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <section className="kpi-grid">
        {KPI_METRICS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-title">{kpi.title}</span>
                <div
                  className="kpi-icon-pill"
                  style={{
                    backgroundColor: `${kpi.color}15`,
                    color: kpi.color,
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>
              <div className="kpi-bottom">
                <h3 className="kpi-value">{kpi.value}</h3>
                <span
                  className={`kpi-trend ${kpi.isPositive ? "trend-up" : "trend-down"}`}
                >
                  {kpi.isPositive ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="charts-grid-layout">
        <div className="chart-card chart-large">
          <div className="chart-header">
            <div>
              <h3>Revenue & Profit Performance ({activeVendorKey})</h3>
              <p>Dynamic trend scaled for selected vendor and date range</p>
            </div>
            <span className="chart-badge">Live Scope: {activeVendorKey}</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={activeDataset.revenueTrend}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#176B5B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#176B5B" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5EAE8"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#718096"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#718096"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #E5EAE8",
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                />
                <Legend iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Gross Revenue"
                  stroke="#176B5B"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Net Profit"
                  stroke="#2A9D8F"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProf)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card chart-small">
          <div className="chart-header">
            <div>
              <h3>Sales by Category ({activeVendorKey})</h3>
              <p>Product volume contribution</p>
            </div>
          </div>
          <div className="chart-wrapper donut-center-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={activeDataset.categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {activeDataset.categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-legend">
              {activeDataset.categoryShare.map((cat, idx) => (
                <div key={idx} className="legend-row">
                  <div
                    className="legend-indicator"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <span className="legend-name">{cat.name}</span>
                  <span className="legend-value">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card chart-full">
          <div className="chart-header">
            <div>
              <h3>Fulfillment & Delivery Distribution ({activeVendorKey})</h3>
              <p>Active orders grouped by completion lifecycle</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={activeDataset.orderStatus}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5EAE8"
                  vertical={false}
                />
                <XAxis
                  dataKey="status"
                  stroke="#718096"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#718096" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #E5EAE8",
                  }}
                />
                <Bar dataKey="count" name="Total Orders" radius={[6, 6, 0, 0]}>
                  {activeDataset.orderStatus.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="analytics-table-card">
        <div className="table-header-flex">
          <div>
            <h3>
              {isVendor
                ? "My Store Products Analytics"
                : selectedVendor === "All"
                  ? "Marketplace Products Analytics"
                  : `${selectedVendor} Products Analytics`}
            </h3>
            <p>Showing live catalog items matching active filters</p>
          </div>
          <span className="records-count">
            Showing {filteredProducts.length} Products
          </span>
        </div>

        <div className="table-responsive">
          <table className="bi-table">
            <thead>
              <tr>
                <th>
                  Product Identifier <ArrowUpDown size={12} />
                </th>
                <th>Category</th>
                <th>Vendor Store</th>
                <th>Units Sold</th>
                <th>Total Revenue</th>
                <th>Inventory Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      color: "#718096",
                    }}
                  >
                    No products found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="product-title-cell">
                        <span className="product-name">{p.name}</span>
                        <span className="product-sku">{p.id}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-pill">{p.category}</span>
                    </td>
                    <td>
                      <span className="vendor-pill">{p.vendor}</span>
                    </td>
                    <td className="font-semibold">{p.sold.toLocaleString()}</td>
                    <td className="font-bold text-primary">
                      ₹{p.revenue.toLocaleString()}
                    </td>
                    <td>{p.stock} units</td>
                    <td>
                      <span
                        className={`status-pill ${
                          p.status === "In Stock"
                            ? "status-green"
                            : p.status === "Low Stock"
                              ? "status-amber"
                              : "status-red"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-pagination-bar no-print">
          <span className="pagination-info">Page {currentPage} of 1</span>
          <div className="pagination-buttons">
            <button type="button" disabled className="btn-page">
              Previous
            </button>
            <button type="button" className="btn-page active">
              1
            </button>
            <button type="button" disabled className="btn-page">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
