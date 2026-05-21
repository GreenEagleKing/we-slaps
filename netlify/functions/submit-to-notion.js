const getAccessToken = async () => {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token exchange failed: ${JSON.stringify(data)}`);
  return data.access_token;
};

const extractHtmlBody = (payload) => {
  if (payload.mimeType === "text/html" && payload.body?.data) {
    return Buffer.from(payload.body.data, "base64url").toString("utf-8");
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      const found = extractHtmlBody(part);
      if (found) return found;
    }
  }
  if (payload.mimeType === "text/plain" && payload.body?.data) {
    return Buffer.from(payload.body.data, "base64url").toString("utf-8");
  }
  return null;
};

const getDraftBody = async (token) => {
  const subject = process.env.GMAIL_TEMPLATE_ID;

  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/drafts?q=${encodeURIComponent(`subject:"${subject}"`)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const listData = await listRes.json();

  if (!listData.drafts?.length) {
    throw new Error(`No draft found with subject: "${subject}"`);
  }

  const draftRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/drafts/${listData.drafts[0].id}?format=full`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const draft = await draftRes.json();

  const body = extractHtmlBody(draft.message.payload);
  if (!body) throw new Error("Could not extract body from draft");
  return body;
};

const sendWelcomeEmail = async (to) => {
  const token = await getAccessToken();
  const body = await getDraftBody(token);

  const message = [
    `To: ${to}`,
    `From: Slaps <${process.env.GMAIL_USER}>`,
    `Subject: You're on the list.`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    ``,
    body,
  ].join("\r\n");

  const sendRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: Buffer.from(message).toString("base64url") }),
    }
  );

  if (!sendRes.ok) {
    throw new Error(`Failed to send email: ${await sendRes.text()}`);
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);
    console.log("Function invoked for:", email);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required." }),
      };
    }

    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const MAILING_LIST_DATABASE_ID = process.env.MAILING_LIST_DATABASE_ID;

    if (!NOTION_API_KEY || !MAILING_LIST_DATABASE_ID) {
      console.error("Missing Notion env vars");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server-side environment variables are not configured correctly." }),
      };
    }

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: MAILING_LIST_DATABASE_ID },
        properties: {
          Email: {
            title: [{ text: { content: email } }],
          },
          "Date Added": {
            date: { start: new Date().toISOString() },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Notion API Error:", errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to submit to Notion." }),
      };
    }

    try {
      await sendWelcomeEmail(email);
      console.log("Welcome email sent to:", email);
    } catch (emailError) {
      console.error("Gmail send error:", emailError.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success" }),
    };
  } catch (error) {
    console.error("Submission error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error." }),
    };
  }
};
