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

  // Controlled Meeting Time & Action State
  const [meetingTime, setMeetingTime] = useState("");
  const [zoomLoading, setZoomLoading] = useState(false);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        const list = data.inquiries || [];
        setInquiries(list);
        setAuthorized(true);

        // Keep selected inquiry synced with latest data
        if (selectedInquiry) {
          const targetId = selectedInquiry._id || selectedInquiry.id;
          const fresh = list.find((i) => (i._id || i.id) === targetId);
          if (fresh) setSelectedInquiry(fresh);
        }
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
    setMeetingTime(inq.zoom_meeting?.scheduled_time ? inq.zoom_meeting.scheduled_time.slice(0, 16) : "");
    setSaveStatus("");
  };

  const saveUpdates = async () => {
    if (!selectedInquiry) return;
    setSaveStatus("Saving...");

    const targetId = selectedInquiry._id || selectedInquiry.id;

    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: targetId,
        _id: targetId,
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

  const handleScheduleZoom = async () => {
    if (!selectedInquiry) return;
    if (!meetingTime) return alert("Please pick a date and time first.");

    setZoomLoading(true);
    try {
      const res = await fetch("/api/admin/schedule-zoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryId: selectedInquiry._id || selectedInquiry.id,
          clientEmail: selectedInquiry.email,
          clientName: selectedInquiry.name,
          projectType: selectedInquiry.project_type,
          startTime: meetingTime,
        }),
      });

      // Safely parse text first to prevent "Unexpected end of JSON" crashes
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Server returned non-JSON response (${res.status}): ${text || "Empty body"}`);
      }

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      alert(`Zoom Meeting Scheduled!\n\nJoin URL: ${data.meeting.joinUrl}`);
      setStatus("scheduled");
      await fetchInquiries();
    } catch (err) {
      console.error("[schedule-zoom error]:", err);
      alert(`Error scheduling meeting: ${err.message}`);
    } finally {
      setZoomLoading(false);
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: "1px solid #1f1f1f", background: "#0c0c0c" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: 800, color: "#fff", fontSize: "1rem", letterSpacing: "0.5px" }}>Billzoa</span>
          <span style={{ background: "#1f1f1f", color: "#888", fontSize: "0.72rem", padding: "2px 8px", borderRadius: "4px" }}>Admin Panel</span>
        </div>
        <button
          onClick={handleLogout}
          style={{ background: "transparent", border: "1px solid #333", color: "#888", fontSize: "0.78rem", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
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
            {["all", "new", "scheduled", "replied", "offered"].map((tab) => (
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
                  fontSize: "0.75rem",
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
              filtered.map((inq) => {
                const docId = inq._id || inq.id;
                const isSelected = (selectedInquiry?._id || selectedInquiry?.id) === docId;
                return (
                  <div
                    key={docId}
                    onClick={() => selectLead(inq)}
                    style={{
                      padding: "16px",
                      borderBottom: "1px solid #1a1a1a",
                      cursor: "pointer",
                      background: isSelected ? "#161616" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{inq.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#666" }}>
                        {new Date(inq.createdAt || inq.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: "6px" }}>{inq.company || inq.email}</div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ background: "#222", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem", color: "#aaa" }}>
                        {inq.project_type}
                      </span>
                      <span
                        style={{
                          background:
                            inq.status === "new"
                              ? "#311818"
                              : inq.status === "scheduled"
                              ? "#142838"
                              : "#1a2c1b",
                          color:
                            inq.status === "new"
                              ? "#ff7c7c"
                              : inq.status === "scheduled"
                              ? "#60a5fa"
                              : "#71d683",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "0.72rem",
                        }}
                      >
                        {inq.status || "new"}
                      </span>
                    </div>
                  </div>
                );
              })
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

              {/* Schedule Zoom Discovery Call */}
              <div style={{ background: "#121212", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
                <h3 style={{ color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>
                  Schedule Zoom Discovery Call
                </h3>

                {selectedInquiry.zoom_meeting?.join_url && (
                  <div style={{ background: "#0b2038", border: "1px solid #1e3a8a", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
                    <div style={{ color: "#93c5fd", fontWeight: 600, fontSize: "0.85rem", marginBottom: "4px" }}>Active Meeting Scheduled</div>
                    <div style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                      <strong>Join:</strong>{" "}
                      <a href={selectedInquiry.zoom_meeting.join_url} target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}>
                        {selectedInquiry.zoom_meeting.join_url}
                      </a>
                    </div>
                    {selectedInquiry.zoom_meeting.password && (
                      <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "2px" }}>
                        Passcode: {selectedInquiry.zoom_meeting.password}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="datetime-local"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    style={{ padding: "8px 12px", background: "#181818", border: "1px solid #333", color: "#fff", borderRadius: "6px" }}
                  />
                  <button
                    onClick={handleScheduleZoom}
                    disabled={zoomLoading}
                    style={{
                      background: zoomLoading ? "#1d4ed8" : "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "6px",
                      fontWeight: 600,
                      cursor: zoomLoading ? "wait" : "pointer",
                    }}
                  >
                    {zoomLoading ? "Scheduling..." : "Create Zoom Link & Email Client"}
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
                      <option value="scheduled">Scheduled</option>
                      <option value="replied">Replied</option>
                      <option value="offered">Offer Sent</option>
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
                  <label style={{ display: "block", color: "#888", fontSize: "0.8rem", marginBottom: "6px" }}>Offer Deliverables & Timelines</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Next.js architecture, MongoDB Atlas integration, 2-week turnaround..."
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