const express = require('express');
const app = express();
const cache = {};
const cacheExpirationTime = 60 * 1000; // Cache expiration time in milliseconds (1 minute in this example)

function cachingMiddleware(req, res, next) {
  const url = req.url;
  const key = req.url;

  if (cache[key]) {
    const { data, expireTime } = cache[key];
    if (expireTime > Date.now()) {
      return res.send(data);
    } else {
      delete cache[key];
    }
  }

  const originalSend = res.send;
  res.send = function (data) {
    const expireTime = Date.now() + cacheExpirationTime;
    cache[key] = { data, expireTime };
    originalSend.call(this, data);
  };

  next();
}

app.use(cachingMiddleware);

app.get('/test1', (req, res) => {
  res.send('this is cached response for 1');
});

app.get('/test2', (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send('response will be cached and expire after 1 minute for 2');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
