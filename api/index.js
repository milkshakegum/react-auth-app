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

    const searchParams = {
        type_slug: config.users_type,
        metafield_key: 'email',
        metafield_value: data.email,
        limit: 5,
        skip: 0,
        sort: '-created_at', // optional, if sort is needed. (use one option from 'created_at,-created_at,modified_at,-modified_at,random')
    };
    cosmic("SEARCH_TYPE", searchParams)
        .then(users => {
            if(users.total > 0) return res.json({ error: "This user is already registered!" });
            else {
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
                    .then(addedUser => res.json(addedUser))
                    .catch(e => res.send(e));
            }
        })
        .then(e => res.send(e));

  });
module.exports = router;
