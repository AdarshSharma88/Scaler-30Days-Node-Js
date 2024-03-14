const express = require('express');
const path = require('path');

function staticFileServer(req, res) {
  const app = express();


  app.use(express.static(path.join(__dirname, 'public')));


  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  app.get('/styles/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/styles/', 'styles.css'));
  });

  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

staticFileServer();
