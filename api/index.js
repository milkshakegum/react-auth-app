import express from 'express';
import config from 'config';
import cosmic from 'utils/cosmic';
import md5 from 'utils/encryption';

// const request = require('request');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/signup')
  .post(function(req, res) {
    const data = req.body.data;
    const params = {
        write_key: config.bucket.write_key,
        type_slug: config.users_type,
        title: data.name,
        metafields: [{
            value: data.email,
            key: "email",
            title: "Email",
        }, {
            value: md5.hash(data.password),
            key: "password",
            title: "Password",
        }],
    };
    cosmic("ADD", params)
    .then((data) => res.json(data.object))
    .catch(e => res.send(e));
  });
module.exports = router;
