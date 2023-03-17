import nodemailer from 'nodemailer'

const gMail = 'adminEmail' //admin
const gPass = 'adminPassword'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: gMail,
        pass: gPass
    }
});

export {transporter, gMail}