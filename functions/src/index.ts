import * as functions from "firebase-functions";
import { cors, randomString } from "./helpers/general";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const fluidumVerify = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const accountSid = functions.config().twilio.sid;
      const authToken = functions.config().twilio.secret;
      const control = functions.config().twilio.control;

      const unauthorized = "Unauthorized Request";
      const smsConfig = request.body as {
        phonenumber: string;
        control: number;
        address: string;
      };
      if (
        request.headers.origin !== "http://localhost:4200" ||
        smsConfig.control !== control
      ) {
        throw unauthorized;
      }

      const passcode = randomString(12);

      //
      const client = require("twilio")(accountSid, authToken);

      const message = await client.messages.create({
        body: `Your sms code for Fluidum Verification is: ${passcode}`,
        from: "+17655772295",
        to: "+34683649305",
      });

      console.log(message.sid);

      ///////////////////////////  SMART CONTRACT CODE   //////////////////////////



     ///////////////////////////  SMART CONTRACT CODE   //////////////////////////

      const successResponseObject: {} = { hashcode: "hascode" };

      response.status(200).send(successResponseObject);
    } catch (error) {
        response.status(500)
    }
  });
});
