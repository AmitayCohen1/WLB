const sgMail = require('@sendgrid/mail')
require('dotenv').config() 


const sendMessage = (content) => { 
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'rcdemb@gmail.com', // Change to your recipient
        from: 'rcdemb@gmail.com', // Change to your verified sender
        subject: 'New User email!',
        text: 'Sending an email',
        html: `New user Email: ${content}`
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent', content)
        })
        .catch((error) => {
          console.error(error)
        })
}




const newParent = (url) => { 
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
      to: 'rcdemb@gmail.com', // Change to your recipient
      from: 'rcdemb@gmail.com', // Change to your verified sender
      subject: 'New User email!',
      text: 'Sending an email',
      html: `New parent record! ${url}`
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent', url)
      })
      .catch((error) => {
        console.error(error)
      })
}



const newChild = (url) => { 
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
      to: 'rcdemb@gmail.com', // Change to your recipient
      from: 'rcdemb@gmail.com', // Change to your verified sender
      subject: 'New User email!',
      text: 'Sending an email',
      html: `New child record! ${url}`
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent', url)
      })
      .catch((error) => {
        console.error(error)
      })
}


module.exports = {sendMessage, newParent, newChild};
