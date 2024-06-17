const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
const sequelize = require("./database");
const FormData = require("./models/FormData");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  keyFile: "./medwander.json", 
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

app.post("/refresh-excel", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1u4yjr1eu6DlvXhtJCkeSlqQs16IV9aeqWdt6ir_Sbss"; // Replace with your spreadsheet ID
    const range = "Sheet1!A1"; 

    const data = await FormData.findAll();
    const values = data.map((row) => [
      row.formType,
      row.name,
      row.countryCode,
      row.phoneNumber,
    ]);

    const resource = {
      values: [
        ["Form Type", "Name", "Country Code", "Phone Number"],
        ...values,
      ],
    };

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource,
    });

    res.status(200).send({ message: "Google Sheet refreshed successfully" });
  } catch (error) {
    console.error("Error refreshing Google Sheet:", error);
    res.status(500).send({ error: "Failed to refresh Google Sheet" });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const { formType, name, countryCode, phoneNumber } = req.body;

    if (!formType || !name || !countryCode || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formData = await FormData.create({
      formType,
      name,
      countryCode,
      phoneNumber,
    });
    res.status(201).json(formData);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: error.errors.map((e) => e.message) });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
