import express from 'express';
import config from 'config';
import cosmic from 'utils/cosmic';
import sendEmail from 'utils/email';
import md5 from 'utils/encryption';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
// const request = require('request');
const router = express.Router(); // eslint-disable-line new-cap

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
            if(users.total > 0) return res.status(401).send({ message: "This user is already registered!" });
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
                    }, {
                        value: randomstring.generate(),
                        key: "activation_token",
                        title: "Activation",
                    }],
                };
                cosmic("ADD", params)
                    .then(addedUser => {
                        cosmic("GET_TYPE", { type_slug: config.private_settings_type })
                            .then(settings => {
                                const emailParams = {
                                    from: settings[0].metadata.from_email,
                                    to: addedUser.object.metadata.email,
                                    subject: "Account activation link",
                                    textType: "html",
                                    text: `<h1>To activate your account, Click <a href="${config.API_HOST}/activateAccount?email=${addedUser.object.metadata.email}&token=${addedUser.object.metadata.activation_token}">here</a></h1>`
                                };
                                sendEmail(emailParams, settings[0].metadata)                                
                            })
                            .catch(e => res.send(e));
                        const token = generateSignedInResponse(addedUser.object);
                        return res.json({ success: true });
                    })
                    .catch(e => res.send(e));
            }
        })
        .catch(e => res.send(e));

  });

  
router.route('/activate-account')
    .get(function(req, res) {
    const { token, email }  = req.query;
    const searchParams = {
        type_slug: config.users_type,
        metafield_key: 'email',
        metafield_value: email,
        limit: 5,
        skip: 0,
        sort: '-created_at', // optional, if sort is needed. (use one option from 'created_at,-created_at,modified_at,-modified_at,random')
    };
    cosmic("SEARCH_TYPE", searchParams)
        .then(users => {
            if(users.total <= 0) return res.status(401).send({ message: "This user doesn't exist!" });
            else {
                const user = users.objects.all[0];
                const params = {
                    write_key: config.bucket.write_key,
                    type_slug: config.users_type,
                    slug: user.slug,
                    metafields: [{
                        value: user.metadata.password,
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
                        value: null,
                        key: "activation_token",
                        title: "Activation Token",
                        type: "text",
                        children: false,
                        has_length_edit: true,
                        parent: false
                    }, {
                        value: null,
                        key: "reset_code",
                        title: "Reset Code",
                        type: "text",
                        children: false,
                        has_length_edit: true,
                        parent: false
                    }]
                };
                cosmic("EDIT", params)
                    .then(updatedUser => res.json({ success: true }))
                    .catch(e => res.send(e));
            }
        })
        .catch(e => res.send(e));
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
                const user = users.objects.all[0];
                if(!user.metadata.activation_token){
                    if(md5.validate(user.metadata.password, data.password)) {
                        const token = generateSignedInResponse(user)
                        return res.json({
                            token,
                            user,
                        });
                    } else return res.status(401).send({ message: "Credentials are wrong!" });
                } else return res.status(401).send({ message: "Please activate your account!" });
            } else return res.status(401).send({ message: "Credentials are wrong!" });
        })
        .then(e => res.send(e));

});


router.route('/forgot-password')
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
                    const user = users.objects.all[0];
                    const params = {
                        write_key: config.bucket.write_key,
                        type_slug: config.users_type,
                        slug: user.slug,
                        metafields: [{
                            value: user.metadata.password,
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
                            title: "Activation Token",
                            type: "text",
                            children: false,
                            has_length_edit: true,
                            parent: false
                        }, {
                            value: Math.floor(Math.random()*90000) + 10000,
                            key: "reset_code",
                            title: "Reset Code",
                            type: "text",
                            children: false,
                            has_length_edit: true,
                            parent: false
                        }]
                    };
                    cosmic("EDIT", params)
                        .then(updatedUser => {
                            cosmic("GET_TYPE", { type_slug: config.private_settings_type })
                                .then(settings => {
                                    const emailParams = {
                                        from: settings[0].metadata.from_email,
                                        to: data.email,
                                        subject: "Reset Password recovery OTP",
                                        textType: "html",
                                        text: `<h1>Your reset password OTP is ${updatedUser.object.metadata.reset_code}</h1>`
                                    };
                                    sendEmail(emailParams, settings[0].metadata)
                                    .then(emailRes => res.json({ succes: true }))
                                    .catch(e => res.send(e));
                                   
                                })
                                .catch(e => res.send(e));
                        })
                        .catch(e => res.status(500).send(e));
                } else return res.status(401).send({ message: "This user is not registered!" });
            })
            .catch(e => res.send(e));
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
                if(md5.validate(user.metadata.password, data.old_password)) {
                    if(data.new_password === data.new_password_confirm) {
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
                                title: "Activation Token",
                                type: "text",
                                children: false,
                                has_length_edit: true,
                                parent: false
                            }, {
                                value: user.metadata.reset_code,
                                key: "reset_code",
                                title: "Reset Code",
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
                        res.status(401).send({ message: "Your passwords doesn't match" });
                    }
                } else {
                    res.status(401).send({ message: "Old password is not correct" });
                }
            })
            .catch(e => res.send(e));
        
    });


    router.route('/reset-password')
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
                    const user = users.objects.all[0];
                    if(Number(data.otp) === user.metadata.reset_code) {
                        if(data.password === data.confirmPassword) {
                            const params = {
                                write_key: config.bucket.write_key,
                                type_slug: config.users_type,
                                slug: user.slug,
                                metafields: [{
                                    value: md5.hash(user.metadata.password),
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
                                    title: "Activation Token",
                                    type: "text",
                                    children: false,
                                    has_length_edit: true,
                                    parent: false
                                }, {
                                    value: null,
                                    key: "reset_code",
                                    title: "Reset Code",
                                    type: "text",
                                    children: false,
                                    has_length_edit: true,
                                    parent: false
                                }]
                            };
                            cosmic("EDIT", params)
                                .then(updatedUser => res.json({ success: true}))
                                .catch(e => res.status(500).send(e));
                        } else return res.status(401).send({ message: "Your passwords doesn't match" });
                    } else return res.status(404).send({ message: "OTP is incorrect!" });
                } else return res.status(404).send({ message: "This user is not registered!" });
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
