const https = require('https');
const fs = require('fs');

const url = 'https://docs.google.com/spreadsheets/d/13vk5WD23k2DQjdglmBUdlg6a6cR3ulCiWQoZ2eq7X-Q/export?format=xlsx';

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error('Failed to download database:', res.statusCode);
    res.resume();
    return;
  }
  const data = [];
  res.on('data', (chunk) => data.push(chunk));
  res.on('end', () => {
    fs.writeFileSync('data/database.xlsx', Buffer.concat(data));
  });
}).on('error', (err) => {
  console.error('Failed to download database', err);
});
