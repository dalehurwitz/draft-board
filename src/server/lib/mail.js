const nodemailer = require('nodemailer')
const ejs = require('ejs')
// const juice = require('juice')
// const htmlToText = require('html-to-text')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

function generateHTML (options) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(`${__dirname}/../templates/${options.filename}`, options, (err, str) => {
      if (err) {
        return reject(err)
      }
      resolve(str)
    })
  })
}

exports.send = async (options) => {
  const html = await generateHTML(options)

  const mailOptions = {
    from: 'Draft Admin <admin@draft.com>',
    to: options.email,
    subject: options.subject,
    html
  }

  return transport.sendMail(mailOptions)
}
