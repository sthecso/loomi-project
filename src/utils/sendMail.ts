import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { IMail, IMessage } from '../interfaces/IMail';

class SendMail implements IMail {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'a8fe8198fa3a97',
        pass: '3ee70da4cd77df',
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

export default SendMail;
