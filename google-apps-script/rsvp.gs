const SPREADSHEET_ID = '1K0IKCcwfkmd7YJtwUa9dTWh0IKfv8XkAGM6eqztIXss';

const HEADERS = [
  'Дата отправки',
  'Имя и фамилия',
  'Ответ',
  'Количество гостей',
  'Трансфер',
  'Еда',
  'Комментарий',
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
    attendance: 'yes',
    guestsCount: 1,
    transfer: 'no',
    foodPreference: 'none',
    comment: 'Проверка записи из Apps Script',
    submittedAt: new Date().toISOString(),
  });
}

function appendRsvp(data) {
  const sheet = getFirstSheet();
  ensureHeaders(sheet);

  sheet.appendRow([
    data.submittedAt ? new Date(data.submittedAt) : new Date(),
    data.fullName || '',
    normalizeAttendance(data.attendance),
    data.guestsCount || '',
    data.transfer === 'yes' ? 'Да' : 'Нет',
    normalizeFood(data.foodPreference),
    data.comment || '',
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

function normalizeAttendance(value) {
  if (value === 'yes') {
    return 'Приду';
  }

  if (value === 'no') {
    return 'Не приду';
  }

  return value || '';
}

function normalizeFood(value) {
  const labels = {
    none: 'Нет',
    meat: 'Мясо',
    fish: 'Рыба',
    vegetarian: 'Вегетарианское',
  };

  return labels[value] || value || '';
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
