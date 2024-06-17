import { Injectable } from '@nestjs/common';
import { setting } from '../setting';
const nodemailer = require('nodemailer');


@Injectable()
export class LogService {    

    async sendEmail(subject:string, body:string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp03.test.ca',
            port: 25,
            auth: {               
            }
        });
        
        let mailOptions = {
            from: 'hua.test@test.com',
            to: 'hua.test@test.com', // mulitple addresses are separated by a comma
            subject: subject,
            html: body
        };

        try {
            await transporter.sendMail(mailOptions);
        } 
        catch(error) {
            console.error('error in sending email:' + error);
        }        
    }
}
