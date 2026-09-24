let cachedToken = null;
let tokenExpiresAt = 0;

export async function getZoomAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  const accountId = (process.env.ZOOM_ACCOUNT_ID || "").trim();
  const clientId = (process.env.ZOOM_CLIENT_ID || "").trim();
  const clientSecret = (process.env.ZOOM_CLIENT_SECRET || "").trim();

  if (!accountId || !clientId || !clientSecret) {
    throw new Error(
      `Missing Zoom credentials: accountId=${Boolean(accountId)}, clientId=${Boolean(clientId)}, clientSecret=${Boolean(clientSecret)}`
    );
  }

  // Basic Auth header containing clientId:clientSecret encoded in base64
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(accountId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    }
  );

  const rawText = await res.text();
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(`Zoom returned non-JSON (${res.status}): ${rawText}`);
  }

  if (!res.ok) {
    console.error("[Zoom OAuth Error Response]:", data);
    throw new Error(
      `Failed to get Zoom token (${res.status}): ${data.reason || data.error_description || data.error || data.message || JSON.stringify(data)}`
    );
  }

  cachedToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000;
  return cachedToken;
}

export async function createZoomMeeting({ topic, startTime, duration = 30 }) {
  const token = await getZoomAccessToken();

  const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: topic || "Billzoa Discovery Call",
      type: 2, // Scheduled meeting
      start_time: startTime, // ISO format
      duration: duration,
      timezone: "UTC",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: true,
      },
    }),
  });

  const meeting = await res.json();
  if (!res.ok) {
    console.error("[Zoom Create Meeting Error]:", meeting);
    throw new Error(`Failed to create Zoom meeting: ${meeting.message || JSON.stringify(meeting)}`);
  }

  return {
    joinUrl: meeting.join_url,
    startUrl: meeting.start_url,
    password: meeting.password,
    meetingId: meeting.id,
  };
}