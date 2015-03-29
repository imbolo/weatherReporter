var nodemailer = require('nodemailer');
var _ = require("lodash");

var transporter = nodemailer.createTransport({
  service: 'QQ',
  auth: {
    user: 'imbolo@qq.com',
    pass: 'zz920203'
  }
});

var baseOptions = {
  from: 'imbolo@qq.com', // sender address
  to: 'imbolo@qq.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ✔', // plaintext body
  html: '<b>Hello world ✔</b>' // html body
};

function sendMessage(receivers, title, content) {
  var options = _.cloneDeep(baseOptions);
  options.to = receivers.join(", ");
  options.subject = title;
  options.text = content;
  options.html = content;
  transporter.sendMail(options, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
}

module.exports = {
  send: sendMessage
}