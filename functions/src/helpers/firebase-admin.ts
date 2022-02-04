import * as admin from 'firebase-admin'
import * as functions from "firebase-functions";

export const firebaseApp = admin.initializeApp(functions.config().firebase);
