const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'Tidak dapat menemukan IP';

  for (const name of Object.keys(networkInterfaces)) {
    for (const iface of networkInterfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress !== 'Tidak dapat menemukan IP') {
      break;
    }
  }

  res.end(`Server ini berjalan di IP Private (lokal) ${ipAddress} dengan port ${server.address().port}`);
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server ini menggunakan port ${port}`);
});
