"use strict";
const roomGuest ='kamilhnat@gmail.com'
const nodemailer = require('nodemailer');
const nodemailMailgun = require('nodemailer-mailgun-transport');
///
const auth = {
    auth: {
        api_key: '3b131fb4448f106936702baa0784a2ad-5645b1f9-efed18c9',
        domain: 'sandbox431c4ae01721472484bbb0d86cbfb6c2.mailgun.org'
    }
};
////
let transporter = nodemailer.createTransport(nodemailMailgun(auth));
////
const mailOptions = {
    from: 'Room Owner <me@CodersCamp.pl>',
    to: `${roomGuest}`, // email must be authorized by MailGUn
    subject: 'Welcome',
    text: 'Welcome back to our guest, please express your opinion on '
};
///
transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log('Error', err);
    }
    else {
        console.log('msg sent');
    }
});
