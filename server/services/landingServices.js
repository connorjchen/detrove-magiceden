import { query } from "../db.js";

export async function addEmail(email, req, res) {
  try {
    let result = await query(
      `
      INSERT INTO waitlist_emails
      VALUES (?)
      `,
      [email]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
