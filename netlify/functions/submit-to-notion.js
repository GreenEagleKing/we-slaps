import { google } from "googleapis";

const getGmailClient = () => {
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  auth.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return google.gmail({ version: "v1", auth });
};

const sendWelcomeEmail = async (to) => {
  const gmail = getGmailClient();

  const templateRes = await gmail.users.settings.canned_responses.get({
    userId: "me",
    id: process.env.GMAIL_TEMPLATE_ID,
  });

  const body = templateRes.data.response;

  const message = [
    `To: ${to}`,
    `From: Slaps <${process.env.GMAIL_USER}>`,
    `Subject: You're on the list.`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    ``,
    body,
  ].join("\r\n");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: Buffer.from(message).toString("base64url") },
  });
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

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required." }),
      };
    }

    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const MAILING_LIST_DATABASE_ID = process.env.MAILING_LIST_DATABASE_ID;

    if (!NOTION_API_KEY || !MAILING_LIST_DATABASE_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Server-side environment variables are not configured correctly.",
        }),
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

    await sendWelcomeEmail(email);

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
