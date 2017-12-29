import express from 'express';
import next from 'next';
import config from 'config';
import compression from 'compression';
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
import bodyParser from 'body-parser';
const app = next({ dev })
const handle = app.getRequestHandler()
// import getObjects from './common/request';
// import sendEmail from './common/email';

app.prepare()
.then(() => {
  const server = express();
  // serving static files
  server.use(compression())
  server.use('/static', express.static('public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.post('/sendEmail', (req, res) => {
    getObjects(config.private_settings_type).then((object) => {
      sendEmail(req.body, object[0].metadata)
      .then((response) => res.json({ success: true }))
      .catch(e => res.status(500).send({ success: false}));
    })
    .catch(e => res.status(500).send(e))

  });
  server.get('*', (req, res) => handle(req, res))
  // server
  server.use(handle).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
