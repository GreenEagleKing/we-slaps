const process = require("process");

exports.handler = async (event, context) => {
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
          error:
            "Server-side environment variables are not configured correctly.",
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
            title: [
              {
                text: {
                  content: email,
                },
              },
            ],
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
