import { Injectable } from '@nestjs/common';
import {
  AddRowGoogleSheetApiInput,
  CreateGoogleSheetApiInput,
  DeleteRowGoogleSheetApiInput,
  UpdateRowGoogleSheetApiInput,
} from './dto/create-google-sheet-api.input';

import { google } from 'googleapis';
// import { UpdateGoogleSheetApiInput } from './dto/update-google-sheet-api.input';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { GoogleSheetApiEntity } from './entities/google-sheet-api.entity';
import { DataSource, Repository } from 'typeorm';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import 'dotenv/config';
import * as xlsx from 'xlsx';
import { getSpreadSheetId } from 'common/untils';
// import credentials from '../../organic-edge-396405-a3a47fddaa45.json';
import * as fs from 'fs';
// const filePath = '../../organic-edge-396405-a3a47fddaa45.json';

const credentials = require('../../organic-edge-396405-a3a47fddaa45.json');

const PRIVATE_KEY = credentials.private_key;
const CLIENT_EMAIL = credentials.client_email;
const SHEET_SPEADSHEED_ID = '1TDQoqsyTqhyZ91_0P8e78H-WxaaA6anLV8R_MmWR-xA'; //process.env.SHEET_SPEADSHEED_ID;

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(SHEET_SPEADSHEED_ID, serviceAccountAuth);

// const auth = new google.auth.GoogleAuth({
//   credentials,
//   scopes: [
//     'https://www.googleapis.com/auth/spreadsheets',
//     'https://www.googleapis.com/auth/drive',
//   ],
// });
// const sheets = google.sheets({ version: 'v4', auth });

// const drive = google.drive({ version: 'v3', auth });

@Injectable()
export class GoogleSheetApiService {
  constructor(
    @InjectRepository(GoogleSheetApiEntity)
    private readonly googleSheetApiEntity: Repository<GoogleSheetApiEntity>,
    @InjectDataSource() private datasource: DataSource,
  ) {}

  async initializeGoogleSheet(
    createGoogleSheetApiInput: CreateGoogleSheetApiInput,
  ) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive',
        ],
      });
      const sheets = google.sheets({ version: 'v4', auth });

      const drive = google.drive({ version: 'v3', auth });
      const result = await getSpreadSheetId(
        drive,
        sheets,
        createGoogleSheetApiInput.name,
      );
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async createGoogleSheetApi(
    createGoogleSheetApiInput: CreateGoogleSheetApiInput,
  ) {
    try {
      await doc.addSheet({ title: createGoogleSheetApiInput.name });
      return 'create sheet success !';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async addGoogleSheetApi(
    addRowGoogleSheetApiInput: AddRowGoogleSheetApiInput,
  ) {
    try {
      console.log(addRowGoogleSheetApiInput);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      await sheet.addRow({
        Email: addRowGoogleSheetApiInput.email,
        Username: addRowGoogleSheetApiInput.username,
        Password: addRowGoogleSheetApiInput.password,
        Date: Date(),
      });
      return 'add row success !';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async deleteGoogleSheetApi(
    deleteRowGoogleSheetApiInput: DeleteRowGoogleSheetApiInput,
  ) {
    try {
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
      const rows = await sheet.getRows();

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].get(deleteRowGoogleSheetApiInput.columnName);
        console.log(row);
        console.log(row[i]);
        if (row === deleteRowGoogleSheetApiInput.value) {
          await rows[i].delete();
        }
        break;
      }

      return 'delete row success !';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async updateGoogleSheetApi(
    updateRowGoogleSheetApiInput: UpdateRowGoogleSheetApiInput,
  ) {
    try {
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
      const rows = await sheet.getRows();

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].get(updateRowGoogleSheetApiInput.columnName);
        console.log(row);
        console.log(row[i]);
        if (row === updateRowGoogleSheetApiInput.email) {
          rows[i].assign({
            Email: updateRowGoogleSheetApiInput.email
              ? updateRowGoogleSheetApiInput.email
              : '',
            Username: updateRowGoogleSheetApiInput.username
              ? updateRowGoogleSheetApiInput.username
              : '',
            Password: updateRowGoogleSheetApiInput.password
              ? updateRowGoogleSheetApiInput.password
              : '',
            Date: Date(),
          });
          await rows[i].save();
        }
      }

      return 'update row success !';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async downloadRowGoogleSheetfirst() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive',
        ],
      });

      await doc.loadInfo();

      const sheetNames = doc.sheetsByIndex.map((sheet) => sheet.title); //['Sheet1!A1:Z1000', 'sheet2'] // Change to your sheet names

      const sheets = google.sheets({ version: 'v4', auth });

      const workbook = xlsx.utils.book_new();

      for (const sheetName of sheetNames) {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_SPEADSHEED_ID,
          range: sheetName,
        });

        const rows = response.data.values;

        if (rows.length > 0) {
          const worksheet = xlsx.utils.aoa_to_sheet(rows);

          xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
        } else {
          console.log(`No data found for sheet: ${sheetName}`);
        }
      }

      const filePath = 'downloaded-excel-file.xlsx'; // Change to desired filename
      xlsx.writeFile(workbook, filePath);

      console.log(`Excel file downloaded and saved as ${filePath}`);
      return 'downloaded success !';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async downloadRowGoogleSheet() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });
      const drive = google.drive({ version: 'v3', auth });
      const response = await drive.files.export(
        {
          fileId: '1TDQoqsyTqhyZ91_0P8e78H-WxaaA6anLV8R_MmWR-xA',
          mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type for XLSX
        },
        { responseType: 'arraybuffer' },
      );

      console.log(response.data);

      const savePath = './field_download.xlsx';
      const buffer = Buffer.from(response.data as Uint8Array);

      fs.writeFileSync(savePath, buffer);
      return 'downloaded success !';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} googleSheetApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleSheetApi`;
  }
}
