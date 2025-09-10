export default async (req, res) => {
  const { email } = req.body;
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const MAILING_LIST_DATABASE_ID = process.env.MAILING_LIST_DATABASE_ID;

  if (!NOTION_API_KEY || !MAILING_LIST_DATABASE_ID) {
    res
      .status(500)
      .json({
        error:
          "Server-side environment variables are not configured correctly.",
      });
    return;
  }

  try {
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
            email: email,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API Error:", errorData);
      res
        .status(response.status)
        .json({ error: "Failed to submit to Notion." });
      return;
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
