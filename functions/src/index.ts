import * as functions from "firebase-functions";
import { cors, randomString } from "./helpers/general";
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const userRegistrationContractAbi = require("../abis/UserRegistration.json");

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

      const client = require("twilio")(accountSid, authToken);

      const message = await client.messages.create({
        body: `Your sms code for Fluidum Verification is: ${passcode}`,
        from: "+17655772295",
        to: "+34683649305",
      });

      console.log(message.sid);

      //Creating an Ethereum wallet provider from a configured wallet private key and Infura testnet endpoint
      const provider = HDWalletProvider(
        //Wallet private key
        functions.config().walletPrivateKey,
        //Infura endpoint for Ethereum RPC
        `https://ropsten.infura.io/v3/${functions.config().infuraProjectId}`
      );
      //Creating Web3 instance using the provider
      const web3 = new Web3(provider);
      //Creating the contract interface instance
      const userRegistrationContract = web3.eth.Contract(
        //Loaded ABI
        userRegistrationContractAbi,
        //Deployed contract address
        functions.config().userRegistrationContractAddress
      );

      //Calling the contract function
      await userRegistrationContract.methods.startVerification(
        smsConfig.address,
        web3.utils.soliditySha3(passcode),
        web3.utils.soliditySha3(smsConfig.phonenumber)
      );

      const successResponseObject: {} = { hashcode: "hascode" };

      response.status(200).send(successResponseObject);
    } catch (error) {
      response.status(500);
    }
  });
});
