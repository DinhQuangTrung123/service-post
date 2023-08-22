// export const CREDENTIALS = JSON.parse(
//   fs.readFileSync('organic-edge-396405-a3a47fddaa45.json'),
// );

// export const PRIVATE_KEY = CREDENTIALS.private_key;
// export const CLIENT_EMAIL = CREDENTIALS.client_email;
// export const SHEET_SPEADSHEED_ID = process.env.SHEET_SPEADSHEED_ID;

// export const serviceAccountAuth = new JWT({
//   email: CLIENT_EMAIL,
//   key: PRIVATE_KEY,
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

// export const doc = new GoogleSpreadsheet(
//   SHEET_SPEADSHEED_ID,
//   serviceAccountAuth,
// );

export const getSpreadSheetId = async (drive, sheets, name) => {
  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: name, // Set the title of the new spreadsheet
      },
    },
  });
  console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);

  const permission = {
    role: 'writer', // Set the desired access role (e.g., writer, reader, owner)
    type: 'user',
    emailAddress: 'dinhquangtrungc123@gmail.com', // Replace with the email address
  };

  const response = await drive.permissions.create({
    fileId: spreadsheet.data.spreadsheetId,
    requestBody: permission,
  });
  // console.log(response);
  console.log('Access granted to user:', response.data.role);

  const headerValues = ['Email', 'Username', 'Password', 'Date'];
  const request = {
    spreadsheetId: spreadsheet.data.spreadsheetId,
    range: 'Sheet1!A1', // Assuming you're setting values in the first sheet starting from A1
    valueInputOption: 'RAW',
    resource: {
      values: [headerValues],
    },
  };
  await sheets.spreadsheets.values.update(request);
  return spreadsheet.data.spreadsheetId;
};
