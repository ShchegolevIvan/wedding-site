const SPREADSHEET_ID = '1K0IKCcwfkmd7YJtwUa9dTWh0IKfv8XkAGM6eqztIXss';

const HEADERS = [
  'Дата отправки',
  'Имя и фамилия',
  'присутствие на торжестве',
  'присутствие в ЗАГСе',
];

function doPost(e) {
  try {
    const data = parsePayload(e);
    appendRsvp(data);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, message: 'RSVP endpoint is running' });
}

function testWrite() {
  appendRsvp({
    fullName: 'Тестовый гость',
    celebrationAttendance: 'Да',
    registryAttendance: 'Нет',
    submittedAt: new Date().toISOString(),
  });
}

function appendRsvp(data) {
  const sheet = getFirstSheet();
  ensureHeaders(sheet);

  sheet.appendRow([
    data.submittedAt ? new Date(data.submittedAt) : new Date(),
    data.fullName || '',
    data.celebrationAttendance || '',
    data.registryAttendance || '',
  ]);
}

function getFirstSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheets = spreadsheet.getSheets();

  if (!sheets.length) {
    return spreadsheet.insertSheet('RSVP');
  }

  return sheets[0];
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(Boolean);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body');
  }

  return JSON.parse(e.postData.contents);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
