
function mail() {var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '4582h@dunearn.edu.sg',
            pass: 'Dess$%88typo',

        }
    });
    mailOptions = {
        from: '4582h@dunearn.edu.sg',
        to: 'chzuofan@gmail.com',
        subject: 'Your order have been placed',
        html: '<h1>Your order have been placed</h1> <h3>We true thank you for choosing us!</h3>',


    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    wait(30000)
}
mail();