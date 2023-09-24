/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// const db = admin.firestore();


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const helloVolt = onRequest((request,response)=>{
    logger.info("Hello Volt!", {structuredData:false});
    response.send("Hello Volt Ppls");
})

export const addUser = functions.https.onRequest(async (request, response) => {
  const incomingData = request.body.newUserData;
  const userName = incomingData.userName
  try {
    console.log(request.body)
    // await db.collection('users').add({ name: user });
    response.send(`User ${userName} added!`);
  } catch (error) {
    console.error('Error adding user: ', error);
    response.status(500).send('Error adding user');
  }
});