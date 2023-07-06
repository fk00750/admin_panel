import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID: string =
  "421790989978-5skiqkdong3fp3p9a5h35fb0n59jgkqk.apps.googleusercontent.com";
const CLIENT_SECRET: string = "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";
const REDIRECT_URL: string = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN: string =
  "1//04HWcD5OpXB4HCgYIARAAGAQSNwF-L9IrfQcqjvCpFPY0KScpIdSUtfoV1-_rri4YeyNKvza8xLfCXaq84liZ4mltqAbbSC287jY";

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const SendVerificationEmailOtp = async (
  receiver: string,
  verificationUrl: string,
  message: string,
  heading: string,
  description: string
): Promise<any> => {
  try {
    const access_token = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "fk7384329@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access_token,
      },
    } as TransportOptions);

    const mailOptions = {
      from: "<fk7384329@gmail.com>",
      to: receiver,
      subject: `${message}`,
      text: `${message}`,
      html: `<h1>${heading}</h1><p>${description}:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw error;
  }
};

export default SendVerificationEmailOtp;
