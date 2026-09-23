"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit State for Offer & Notes
  const [offerAmount, setOfferAmount] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState("new");
  const [saveStatus, setSaveStatus] = useState("");

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch {
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthorized(true);
      fetchInquiries();
    } else {
      setAuthError("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthorized(false);
    setSelectedInquiry(null);
  };

  const selectLead = (inq) => {
    setSelectedInquiry(inq);
    setStatus(inq.status || "new");
    setOfferAmount(inq.offer_amount || "");
    setOfferDetails(inq.offer_details || "");
    setAdminNotes(inq.admin_notes || "");
    setSaveStatus("");
  };

  const saveUpdates = async () => {
    if (!selectedInquiry) return;
    setSaveStatus("Saving...");

    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedInquiry.id,
        status,
        offer_amount: offerAmount,
        offer_details: offerDetails,
        admin_notes: adminNotes,
      }),
    });

    if (res.ok) {
      setSaveStatus("Saved successfully!");
      fetchInquiries();
      setTimeout(() => setSaveStatus(""), 2000);
    } else {
      setSaveStatus("Failed to update.");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#888", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading control center...
      </div>
    );
  }

  // Password Lock Screen
  if (!authorized) {
    return (
      <main style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <form onSubmit={handleLogin} style={{ background: "#121212", border: "1px solid #222", padding: "36px", borderRadius: "12px", width: "100%", maxWidth: "380px" }}>
          <h2 style={{ color: "#fff", marginBottom: "8px", fontSize: "1.4rem" }}>Billzoa Admin</h2>
          <p style={{ color: "#777", fontSize: "0.88rem", marginBottom: "20px" }}>Enter root passkey to access client requirements.</p>
          
          <input
            type="password"
            placeholder="Passkey"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", background: "#181818", border: "1px solid #333", borderRadius: "6px", color: "#fff", marginBottom: "16px", outline: "none" }}
            autoFocus
          />

          {authError && <div style={{ color: "#ff5a5a", fontSize: "0.85rem", marginBottom: "12px" }}>{authError}</div>}

          <button
            type="submit"
            style={{ width: "100%", padding: "12px", background: "#fff", color: "#000", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
          >
            Authenticate
          </button>
        </form>
      </main>
    );
  }

  const filtered = inquiries.filter((inq) => {
    if (activeTab === "all") return true;
    return inq.status === activeTab;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#ddd", display: "flex", flexDirection: "column" }}>
      {/* Top Navbar */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 24px", borderBottom: "1px solid #1f1f1f" }}>
  <button
    onClick={handleLogout}
    style={{ background: "transparent", border: "1px solid #333", color: "#888", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}
  >
    Lock Session
  </button>
</div>
      {/* Main Container */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", flex: 1 }}>
        {/* Left Side: Requirements & Inquiries List */}
        <aside style={{ borderRight: "1px solid #222", overflowY: "auto", height: "calc(100vh - 65px)" }}>
          {/* Status Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #222", background: "#0f0f0f" }}>
            {["all", "new", "replied", "offered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: activeTab === tab ? "#1b1b1b" : "transparent",
                  color: activeTab === tab ? "#fff" : "#777",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {filtered.length === 0 ? (
              <p style={{ padding: "24px", color: "#666", textAlign: "center", fontSize: "0.85rem" }}>No inquiries found.</p>
            ) : (
              filtered.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => selectLead(inq)}
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #1a1a1a",
                    cursor: "pointer",
                    background: selectedInquiry?.id === inq.id ? "#161616" : "transparent",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{inq.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "#666" }}>
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: "6px" }}>{inq.company || inq.email}</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ background: "#222", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem", color: "#aaa" }}>
                      {inq.project_type}
                    </span>
                    <span style={{ background: inq.status === "new" ? "#311818" : "#1a2c1b", color: inq.status === "new" ? "#ff7c7c" : "#71d683", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem" }}>
                      {inq.status || "new"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Right Side: Inquiry Detail & Offer Builder */}
        <section style={{ padding: "32px", overflowY: "auto", height: "calc(100vh - 65px)" }}>
          {selectedInquiry ? (
            <div style={{ maxWidth: "800px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                <h1 style={{ color: "#fff", fontSize: "1.6rem", margin: 0 }}>{selectedInquiry.name}</h1>
                <a href={`mailto:${selectedInquiry.email}`} style={{ color: "#60a5fa", textDecoration: "none", fontSize: "0.9rem" }}>
                  Reply via {selectedInquiry.email} ↗
                </a>
              </div>

              {/* Requirement Summary */}
              <div style={{ background: "#121212", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
                <h3 style={{ color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Client Scope</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  <div>
                    <span style={{ color: "#666", fontSize: "0.8rem" }}>Company:</span>
                    <div style={{ color: "#fff" }}>{selectedInquiry.company || "Not provided"}</div>
                  </div>
                  <div>
                    <span style={{ color: "#666", fontSize: "0.8rem" }}>Budget Window:</span>
                    <div style={{ color: "#fff" }}>{selectedInquiry.budget || "Unspecified"}</div>
                  </div>
                </div>
                <div>
                  <span style={{ color: "#666", fontSize: "0.8rem" }}>Full Project Requirement:</span>
                  <div style={{ whiteSpace: "pre-wrap", color: "#ddd", marginTop: "6px", background: "#181818", padding: "12px", borderRadius: "6px", lineHeight: "1.5" }}>
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>
              {/* Inside the selectedInquiry view in app/admin/page.js */}
<div style={{ background: "#121212", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
  <h3 style={{ color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>
    Schedule Zoom Discovery Call
  </h3>
  
  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <input
      type="datetime-local"
      id="meetingTime"
      style={{ padding: "8px 12px", background: "#181818", border: "1px solid #333", color: "#fff", borderRadius: "6px" }}
    />
    <button
      onClick={async () => {
        const timeVal = document.getElementById("meetingTime").value;
        if (!timeVal) return alert("Select a date and time first");

        const res = await fetch("/api/admin/schedule-zoom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inquiryId: selectedInquiry.id,
            clientEmail: selectedInquiry.email,
            clientName: selectedInquiry.name,
            projectType: selectedInquiry.project_type,
            startTime: timeVal,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          alert(`Zoom Meeting Created: ${data.meeting.joinUrl}`);
          fetchInquiries();
        } else {
          alert(`Error: ${data.error}`);
        }
      }}
      style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
    >
      Create Zoom Link & Email Client
    </button>
  </div>
</div>

              {/* Offer & Negotiation Builder */}
              <div style={{ background: "#121212", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
                <h3 style={{ color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Proposal & Offer Terms</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "6px" }}>Inquiry State</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={{ width: "100%", padding: "10px", background: "#181818", border: "1px solid #333", color: "#fff", borderRadius: "6px" }}
                    >
                      <option value="new">New</option>
                      <option value="replied">Replied</option>
                      <option value="offered">Offer Sent</option>
                      <option value="closed">Closed / Won</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "6px" }}>Proposed Quote / Offer Amount</label>
                    <input
                      type="text"
                      placeholder="e.g. $1,800 USD"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      style={{ width: "100%", padding: "10px", background: "#181818", border: "1px solid #333", color: "#fff", borderRadius: "6px" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "6px" }}>Offer Deliverables & Deliverable Timelines</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Includes Next.js setup, Supabase authentication, and 2-week turnaround..."
                    value={offerDetails}
                    onChange={(e) => setOfferDetails(e.target.value)}
                    style={{ width: "100%", padding: "10px", background: "#181818", border: "1px solid #333", color: "#fff", borderRadius: "6px", resize: "vertical" }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "6px" }}>Internal Deal Notes</label>
                  <input
                    type="text"
                    placeholder="Private notes (client cannot see this)..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    style={{ width: "100%", padding: "10px", background: "#181818", border: "1px solid #333", color: "#fff", borderRadius: "6px" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={saveUpdates}
                    style={{ background: "#fff", color: "#000", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
                  >
                    Save Changes
                  </button>
                  {saveStatus && <span style={{ color: "#4ade80", fontSize: "0.85rem" }}>{saveStatus}</span>}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: "#666", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              Select an inquiry from the left to inspect requirements and manage offers.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}