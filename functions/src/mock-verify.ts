import * as functions from "firebase-functions";
import { userRegistrationContractAbi } from "./abis/UserRegistration";

import { Contract, providers, utils, Wallet } from "ethers";

import { cors, randomString } from "./helpers/general";

const contract = '0x7b6404B0F6f38106F2025d9889fbfa79c90E4E4C';

export const fluidumMock= (request, response) => {
  return cors(request, response, async () => {

          try {
            const accountSid = functions.config().twilio.sid;
            const authToken = functions.config().twilio.secret;
            const control = functions.config().twilio.control;
            const moralisId = functions.config().moralis.id;
            const contractAdress = contract// functions.config().contract.address;
            const sendTwilio = 'no'// functions.config().twilio.send;
      
            const walletPrivateKey = functions.config().wallet.privatekey;
            const unauthorized = "Unauthorized Request";
            const smsConfig = request.body as {
              phoneNumber: string;
              control: number;
              address: string;
            };
            console.log(smsConfig)
      
            if (
             (request.headers.origin !== "http://localhost:4200" && request.headers.origin !== "https://fluidum-eth.web.app") ||
              smsConfig.control !== control
            ) {
              throw unauthorized;
            }
      
            const passcode = randomString(6);
      
            const client = require("twilio")(accountSid, authToken);
      
            const url = `https://speedy-nodes-nyc.moralis.io/${moralisId}/polygon/mumbai`;
            const provider = await new providers.JsonRpcProvider(url);
      
            const _wallet = new Wallet(walletPrivateKey);
      
            const myWallet = await _wallet.connect(provider);
      
            const userRegistrationContract = await new Contract(
              contractAdress,
              userRegistrationContractAbi,
              myWallet
            );
      
            const passcodeHash = utils.keccak256(utils.toUtf8Bytes(passcode));
            const phoneNumberHash = utils.keccak256(utils.toUtf8Bytes(smsConfig.phoneNumber));
        
      
            const result_tx = await userRegistrationContract.functions[
              "startVerification"
            ].apply(this, [
              smsConfig.address,
              passcodeHash,
              phoneNumberHash,
              { gasLimit: 10000000 },
            ]);
      
          
            const result = await result_tx.wait();
      
            const transaction_details = result.transactionHash;
            console.log(transaction_details);
      
           // if (sendTwilio == 'yes') {
            // const message = await client.messages.create({
            //   body: `Your sms code for Fluidum Verification is: ${passcode}`,
            //   from: "+17655772295",
            //   to: smsConfig.phoneNumber,
            // });
        //  }
            console.log(passcode)
      
      
          
      
            const successResponseObject  = {
              phonenumerHash: "phonenumerHash",
              success:true,
              code:passcode
            };
      
            response.status(200).send(successResponseObject);
          } catch (error) {
            console.log(error)
            const successResponseObject: {} = {
              success:false
            };
            response.status(200).send(successResponseObject);
          }
        });

}
  