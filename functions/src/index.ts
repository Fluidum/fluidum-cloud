import * as functions from "firebase-functions";
import { userRegistrationContractAbi } from "./abis/UserRegistration";

import {Contract, providers, utils, Wallet} from 'ethers'

import { cors, randomString } from "./helpers/general";
// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const Web3 = require("web3");




// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const fluidumVerify = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const accountSid = functions.config().twilio.sid;
      const authToken = functions.config().twilio.secret;
      const control = functions.config().twilio.control;
      const moralisId = functions.config().moralis.id;
      console.log(moralisId)
      const walletPrivateKey  = functions.config().wallet.privatekey
      const unauthorized = "Unauthorized Request";
      const smsConfig = request.body as {
        phonenumber: string;
        control: number;
        address: string;
      };
      if (
        request.headers.origin !== "http://localhost:4200" || smsConfig.control !== control
      ) {
        throw unauthorized;
      }

      const passcode = randomString(6);

      const client = require("twilio")(accountSid, authToken);

      // const message = await client.messages.create({
      //   body: `Your sms code for Fluidum Verification is: ${passcode}`,
      //   from: "+17655772295",
      //   to: "+34683649305",
      // });

    //  console.log(message.sid);
      const url =   `https://speedy-nodes-nyc.moralis.io/${moralisId}/polygon/mumbai`;
      const provider = await new providers.JsonRpcProvider(url)
      console.log('provider created')
      const _wallet  = new Wallet(walletPrivateKey);
      console.log('wallet created')
      const myWallet = await _wallet.connect(provider);
   
      console.log('wallet connected')
      const userRegistrationContract = await new Contract(
        '0x27183A941F5Be5F8a17AB5E657a0fC2a9c48b5fd',
        userRegistrationContractAbi,
        myWallet
      );

      console.log('contract created')
   
      // //Creating an Ethereum wallet provider from a configured wallet private key and Infura testnet endpoint
      // const provider = HDWalletProvider(
      //   //Wallet private key
      //   walletPrivateKey,
      //   //Infura endpoint for Ethereum RPC
      //   `https://polygon-mumbai.g.alchemy.com/v2/${moralisId}`
        
      // );
      // //Creating Web3 instance using the provider
      // const web3 = new Web3(provider);
      // //Creating the contract interface instance
      // const userRegistrationContract = web3.eth.Contract(
      //   //Loaded ABI
      //   userRegistrationContractAbi,
      //   //Deployed contract address
      //   '0x27183A941F5Be5F8a17AB5E657a0fC2a9c48b5fd'//functions.config().userRegistrationContractAddress
      // );

      // //Calling the contract function
       const phonenumerHash = utils.keccak256(smsConfig.phonenumber) as string;
       const passcodeHash = utils.keccak256(passcode) as string;
      // await userRegistrationContract.startVerification(
      //   smsConfig.address,
      //   passcodeHash,
      //   phonenumerHash
      // );

        console.log(passcodeHash);
        console.log(phonenumerHash)

      const result_tx = await userRegistrationContract.functions['startVerification'].apply(this, [  smsConfig.address,
        passcodeHash,
        phonenumerHash,{ gasLimit: 10000000 },]);

        console.log(result_tx)
      const result = await result_tx.wait();

     const  transaction_details = result.transactionHash;
        console.log(transaction_details)

      const successResponseObject: { phonenumerHash:string} = {phonenumerHash: 'phonenumerHash' };

      response.status(200).send(successResponseObject);
    } catch (error) {
      response.status(500);
    }
  });
});
