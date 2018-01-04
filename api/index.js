import express from 'express';
import config from 'config';
import cosmic from 'utils/cosmic';
import md5 from 'utils/encryption';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

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
            if(users.total > 0) return res.status(401).send({ error: "This user is already registered!" });
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
                    .then(addedUser => {
                        const token = generateSignedInResponse(addedUser.object);
                        return res.json({
                            token,
                            user: addedUser.object,
                        });
                    })
                    .catch(e => res.send(e));
            }
        })
        .then(e => res.send(e));

  });

  router.route('/signin')
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
            if(users.total > 0) {
                if(md5.validate(users.objects.all[0].metadata.password, data.password)) {
                    const token = generateSignedInResponse(users.objects.all[0])
                    return res.json({
                        token,
                        user: users.objects.all[0],
                    });
                }
                else return res.status(401).send({ error: "Credentials are wrong!" });
            } else return res.status(401).send({ error: "Credentials are wrong!" });
        })
        .then(e => res.send(e));

  });

  router.route('/profile')
    .get(expressJwt({ secret: config.jwtSecret }), function(req, res) {
        const { slug } = req.user;
        cosmic("GET", { slug })
            .then(user => res.json(user))
            .catch(e => res.send(e));
    })
    .put(expressJwt({ secret: config.jwtSecret }), function(req, res) {
        const { slug } = req.user;
        const data = req.body.data;
        const params = {
            write_key: config.bucket.write_key,
            type_slug: config.users_type,
            slug,
            title: data.name,
        };
        cosmic("EDIT", params)
            .then(user => res.json({
                    token: generateSignedInResponse(user.object),
                    user: user.object,
                }))
            .catch(e => res.send(e));
    });

    router.route('/profile/password')
    .put(expressJwt({ secret: config.jwtSecret }), function(req, res) {
        const { slug } = req.user;
        const data = req.body.data;
        cosmic("GET", { slug })
            .then(user => {
                console.log("STATUS: ", md5.validate(user.metadata.password, data.old_password))
                if(md5.validate(user.metadata.password, data.old_password)) {
                    console.log(data.new_password)
                    const params = {
                        write_key: config.bucket.write_key,
                        type_slug: config.users_type,
                        slug,
                        metafields: [{
                            value: md5.hash(data.new_password),
                            key: "password",
                            title: "Password",
                            type: "text",
                            children: false,
                            has_length_edit: true,
                            parent: false
                        }, {
                            value: user.metadata.email,
                            key: "email",
                            title: "Email",
                            type: "text",
                            children: false,
                            has_length_edit: true,
                            parent: false
                        }, {
                            value: user.metadata.activation_token,
                            key: "activation_token",
                            title: "activation_token",
                            type: "text",
                            children: false,
                            has_length_edit: true,
                            parent: false
                        }]
                    };
                    cosmic("EDIT", params)
                        .then(updatedUser => res.json({ user: updatedUser.object }))
                        .catch(e => res.send(e));
                } else {
                    res.status(401).send({ error: "Old password is not correct" })
                }
            })
            .catch(e => res.send(e));
        
    });
  function generateSignedInResponse(user) {
    return jwt.sign({
        email: user.metadata.email,
        slug: user.slug,
    }, config.jwtSecret);
  }
module.exports = router;
