
import {onRequest} from "firebase-functions/v2/https";
import { Timestamp } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import serviceAccount from './key.json'
import Vision from '@google-cloud/vision'

// const serviceAccount = require('./key.json');
admin.initializeApp({
  credential:admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket:"appreallife-ea3d9.appspot.com"
});
const db = admin.firestore();
const firestore = admin.firestore();
const { FieldValue } = require('firebase-admin').firestore;


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request:any, response:any) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const helloVolt = onRequest((request,response)=>{
    logger.info("Hello Volt!", {structuredData:false});
    response.send("Hello Volt Ppls");
})

export const addUser = functions.https.onRequest(async (request, response) => {
  try {
    const incomingData = request.body;
    const email = incomingData.email;
    const password = incomingData.password;
    const userName = incomingData.userName;
    const name = incomingData.name;
    const phoneNumber = incomingData.phoneNumber;
    const nameParts = name.split(' ').map((part:string)=>part.toLowerCase())
    const lowerName = name.toLowerCase()
    const lowerUserName = userName.toLowerCase()
      // Create user with email and password
    let uid:string
      try {
        const userRecord = await admin.auth().createUser({
          email: email,
          password: password,
          displayName: userName,
          // phoneNumber: phoneNumber,
        });
        uid = userRecord.uid;
        const userObj = {
          uid: uid,
          email: email,
          accountCreationDate: getCurrentDate(),
          name: name,
          phoneNumber: phoneNumber, 
          userName:userName,
          streak:0,
          picURL:"gs://appreallife-ea3d9.appspot.com/user_prof_pics/default.png",
          coverURL:"gs://appreallife-ea3d9.appspot.com/user_prof_pics/background-space.png",
          trophyPins:["","",""],
          xpData:{
              family:1,friends:1,fitness:1,
              earthcraft:1,cooking:1,technology:1,
              games:1,language:1,humanity:1,
          },
          trophyData:{
              "Tital of Steel": {unlocked:false,progress:0},
              "Fitness Fanatic": {unlocked:false,progress:0},
              "Golden Devotion": {unlocked:false,progress:0},
              "Sisyphus' Prized Work": {unlocked:false,progress:0},
              "Marathon's March": {unlocked:false,progress:0},
              "Martial Master": {unlocked:false,progress:0},
              "26.2": {unlocked:false,progress:0},
              "Yoga Yogi": {unlocked:false,progress:0},
              "Exercise Enthusiast": {unlocked:false,progress:0},
              "Chef of the Year": {unlocked:false,progress:0},
              "Cooking Connoisseur": {unlocked:false,progress:0},
              "Iron Chef": {unlocked:false,progress:0},
              "Family Feast": {unlocked:false,progress:0},
              "Code Crusader": {unlocked:false,progress:0},
              "Bearing FAANGs": {unlocked:false,progress:0},
              "Internet Property": {unlocked:false,progress:0},
              "Digital Playground": {unlocked:false,progress:0},
              "Web3 Wizard": {unlocked:false,progress:0},
              "Gamer with Taste": {unlocked:false,progress:0},
              "Steam Star": {unlocked:false,progress:0},
              "The Grind": {unlocked:false,progress:0},
              "Gotta Go Fast": {unlocked:false,progress:0},
              "Cant Stop Wont Stop": {unlocked:false,progress:0},
              "Lightfoot Traveler": {unlocked:false,progress:0},
              "Globe Trotter": {unlocked:false,progress:0},
              "Gallery Guru": {unlocked:false,progress:0},
              "Social Butterfly": {unlocked:false,progress:0},
              "All Aboard": {unlocked:false,progress:0},
              "Family Reunion": {unlocked:false,progress:0},
              "Checking In": {unlocked:false,progress:0},
              "Game of Life": {unlocked:false,progress:0},
              "Clean Leader": {unlocked:false,progress:0},
              "Hands of Bronze": {unlocked:false,progress:0},
              "Eyes of Silver": {unlocked:false,progress:0},
              "Voice of Gold": {unlocked:false,progress:0},
              "Decoration of Space": {unlocked:false,progress:0},
              "Decoration of Time": {unlocked:false,progress:0},
              "Lost in Nature": {unlocked:false,progress:0},
              "Finding Nature": {unlocked:false,progress:0},
              "One with Nature": {unlocked:false,progress:0},
              "Butchers & Shepherds": {unlocked:false,progress:0},
              "Of The Earth": {unlocked:false,progress:0},
              "Nature's Friend": {unlocked:false,progress:0},
              "Nature's Steward": {unlocked:false,progress:0},
              "Off The Grid": {unlocked:false,progress:0},
    
    
          },
          settings:{
              darkMode:true,
              geoLocation:true,
              notifications:true,
              privateSkills:true,
              privateProfile:true,
          },
          friendCount:1,
          nameMatches:[...nameParts, lowerUserName, lowerName],
        }
        const firstFriendObj = {
          blocked:false,
          pending:false,
          receivingUser: uid,
          requestingUser: "vUVmF04zA9hYXsZc8YIiPPtP7BZ2",
          timestamp: new Date().toISOString(), 
        }
        try {
          // logger.info(request.body)
          await db.collection('users').doc(uid).set(userObj);
          await db.collection('friendships').doc(`${uid}_"vUVmF04zA9hYXsZc8YIiPPtP7BZ2`).set(firstFriendObj)
          await db.collection('users').doc("vUVmF04zA9hYXsZc8YIiPPtP7BZ2").update({
            friendCount: FieldValue.increment(1)
          })
          response.send(uid);
        } catch (error) {
          logger.error('Error adding user: ', error);
          response.status(500).send('Error adding user');
        }
      } catch (err) {
        logger.error("Cccount creation failed:", err)
      }
      

    
  }catch(err) {
    logger.error("THE WHOLE THING FAILED IDK:", err)
  }
});

export const upVotePost = functions.https.onRequest(async(request,response)=>{
  // Add username to upvote list on post
  // Increase score of post by 1
});

export const downVotePost = functions.https.onRequest(async(request,response)=>{
  // Add username to upvote list on post
  // Decrease score of post by -1
});

export const createPost = functions.https.onRequest(async(request,response)=>{
  try {
  const {base64Image,visibleTo,posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,picture,pictureList,blockedTo}:any = request.body
  let isSuccess:boolean = false;
  switch(type){
    case "log":
    case "api":
     isSuccess = await handlePostSubmit(
        base64Image,posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,[],"",visibleTo,blockedTo
      )
    break;
    case "camera": 
     isSuccess = await handlePostSubmit(
        base64Image,posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,[],picture,visibleTo,blockedTo
      )
    break;
    case "timeline":
      isSuccess = await handlePostSubmit(
        base64Image,posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,pictureList,"",visibleTo,blockedTo
      )
    break;
  }
  if (isSuccess) {
    response.send("SUCCESS")
  } else {
    response.send("INAPPROPRIATE")
  }
    //give user xp
    //create xpLog of it
} catch (err) {
  logger.error("post failed at data calling or switch", err)
  response.send(err);
}
});

export const deletePost = functions.https.onRequest(async(request,response)=>{
  try {
    const db = admin.firestore();
    const storage = admin.storage().bucket();

    const date = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    const timestampString = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

    const oldPostsQuery = db.collection('posts').where('timeStamp', '<=', timestampString);
    const oldPostsSnapshot = await oldPostsQuery.get();

    const deletePromises:any = [];

    for (const doc of oldPostsSnapshot.docs) {
      const postId = doc.id;
      const postData = doc.data();

      // Extract the image path from the post document
      if (postData.type==="camera"){
        const imagePath = postData.picURL; // Replace with the actual field name where the image path is stored
        deletePromises.push(storage.file(imagePath).delete());
      } else if (postData.type === "timeline") {
        postData.timelinePicURLs.map((imgURL:string)=>{
          deletePromises.push(storage.file(imgURL).delete());
        })
      }
      deletePromises.push(db.collection('posts').doc(postId).delete());


      // Push the promises to delete the document and the image to the array
      
    }

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    logger.log('Old posts and images deleted successfully!');
    response.send("SUCCESS")
  } catch (error) {
    logger.error('Error deleting old posts and images:', error);
  }
});
// USER CREDENTIALS FUNCTIONS //

export const changeUserEmail = functions.https.onRequest(async(request,response)=>{
  const {uid,newEmail}:any = request.body
  try{
    admin.auth().updateUser(uid,{
      email:newEmail,
    })
    .then((userRecord)=>{
      response.send("Email change success!")
    })
  } catch(err) {
    logger.error("Failed to change user email: ",err)
  }
});

export const changeUserPassword = functions.https.onRequest(async(request,response)=>{
  const {uid,newPassword}:any = request.body
  try{
    admin.auth().updateUser(uid,{
      password:newPassword,
    })
    .then((userRecord)=>{
      response.send("Password change success!")
    })
  } catch(err) {
    logger.error("Failed to change user email: ",err)
  }
});
export const deleteUserProfile = functions.https.onRequest(async(request,response)=>{
  const {uid}:any = request.body
  try{
    await admin.auth().deleteUser(uid)
    const userDocRef = firestore.doc(`users/${uid}`);
    await userDocRef.delete();
    response.send("Account deleted successfully!")
  } catch(err) {
    logger.error("Failed to change user email: ",err)
  }
});

export const updateCoverPicture = functions.https.onRequest(async(request, response) => {
  const db = admin.firestore();
  const storage = admin.storage().bucket();
  try {
      const { uid, imageData } = request.body;
      // Convert base64 image data to Buffer
      const imageBuffer = Buffer.from(imageData.split(",")[1], 'base64');
      // Define the Firebase Storage path
      const filePath = `user_prof_pics/${uid}/cover_actual.jpg`;
      const file = storage.file(filePath);
      // Upload the resized image to Firebase Storage
      await file.save(imageBuffer, { contentType: 'image/jpeg' });
      // Get the public URL for the uploaded image
      const gsLink = `gs://${file.bucket.name}/${file.name}`;
      // Update Firestore
      const userDocRef = db.collection('users').doc(uid);
      await userDocRef.update({ coverURL: gsLink });
      response.status(200).send({ message: "Image uploaded successfully!", gsLink });
  } catch (err) {
      logger.error(err);
      response.status(500).send('Internal Server Error');
  }
});

export const updateProfilePicture = functions.https.onRequest(async(request, response) => {
  const db = admin.firestore();
  const storage = admin.storage().bucket();
  try {
      const { uid, imageData } = request.body;
      // Convert base64 image data to Buffer
      const imageBuffer = Buffer.from(imageData.split(",")[1], 'base64');
      // Define the Firebase Storage path
      const filePath = `user_prof_pics/${uid}/profile_actual.jpg`;
      const file = storage.file(filePath);
      // Upload the resized image to Firebase Storage
      await file.save(imageBuffer, { contentType: 'image/jpeg' });
      // Get the public URL for the uploaded image
      const gsLink = `gs://${file.bucket.name}/${file.name}`;
      // Update Firestore
      const userDocRef = db.collection('users').doc(uid);
      await userDocRef.update({ picURL: gsLink });
      response.status(200).send({ message: "Image uploaded successfully!", gsLink });
  } catch (err) {
      logger.error(err);
      response.status(500).send('Internal Server Error');
  }
});








//NON-REQUEST UTILITY FUNCS //
const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
  };



const visionClient = new Vision.ImageAnnotatorClient();
async function checkImageForInappropriateContent(base64Image: string): Promise<boolean> {
    const [result] = await visionClient.safeSearchDetection({
        image: { content: base64Image.split(",")[1] }
    });
    const detections:any = result.safeSearchAnnotation;

    // Adjust these checks based on how strict you want your filtering to be
    if (detections.adult === 'VERY_LIKELY' ||
        detections.violence === 'VERY_LIKELY' ||
        detections.racy === 'VERY_LIKELY') {
        return false; // Image is inappropriate
    }

    return true; // Image is safe
}
//EXP Uploader Functions//
const handlePostSubmit = async(
  base64Image:any,uid:string,userName:string,streak:number,postSkill:string,
  picURL:any,eventTitle:string,xp:number,textLog:string,
  settingOne:boolean,settingTwo:boolean,settingThree:boolean,type:string,
  timelinePicURLs:any,cameraPicURL:string,visibleTo:any,blockedTo:any,
  ) => {
    let timeStamp = Timestamp.now()
    const postID = `${uid}_${timeStamp.toMillis()}`
    try{
      if (type == "camera") {

        if (await checkImageForInappropriateContent(base64Image)){
          const imageBuffer = Buffer.from(base64Image.split(",")[1], 'base64');
          const filePath = `posts/${postID}.jpg`
          const storage = admin.storage().bucket();
          const file = storage.file(filePath);
          await file.save(imageBuffer, { contentType: 'image/jpeg' });
          const [signedURL] = await file.getSignedUrl({ action: 'read', expires: '03-17-2030' });
          logger.log(signedURL)
          cameraPicURL = signedURL
        } else {
          logger.warn("INAPPROPRIATE PICTURE DETECTED, FUNCTION CANCELLED")
          return false;
        }

        
      } else if (type == "timeline") {
        for (const img of Object.values(base64Image)){
          if (!await checkImageForInappropriateContent(img as string)) {
            logger.warn("INAPPROPRIATE PICTURE DETECTED, FUNCTION CANCELLED")
            return false;
          }
        }
        const storage = admin.storage().bucket();
        
        const imageBuffers = [
            Buffer.from(base64Image.imageOne.split(",")[1], 'base64'),
            Buffer.from(base64Image.imageTwo.split(",")[1], 'base64'),
            Buffer.from(base64Image.imageThree.split(",")[1], 'base64')
        ];
        const filePaths = [
            `posts/${postID}_image1.jpg`,
            `posts/${postID}_image2.jpg`,
            `posts/${postID}_image3.jpg`
        ];
        const files = filePaths.map(path => storage.file(path));
        // Upload the images
        await Promise.all(files.map((file, index) => file.save(imageBuffers[index], { contentType: 'image/jpeg' })));
        // Get the signed URLs
        const signedURLs = await Promise.all(files.map(file => file.getSignedUrl({ action: 'read', expires: '03-17-2030' })));
        // The below line maps the array of arrays to a flat array of URLs
        timelinePicURLs = signedURLs.map(([url]) => url);
        logger.log(timelinePicURLs)
      }
    } catch(err) {
      logger.error(err)
    }
      const postObj = {
          upvotes:[],
          downvotes:[],
          timelinePicURLs:timelinePicURLs,
          cameraPicURL:cameraPicURL,
          posterUID:uid,
          posterUserName:userName,
          streak:streak,
          postSkill:postSkill,
          picURL: picURL,
          uniqueStamp:"",
          eventTitle:eventTitle,
          xp:xp,
          score:0,
          geoTag:{latitude:0,longitude:0},
          timeStamp:timeStamp,
          textLog:textLog,
          publicPost:settingOne,
          mapPost:settingTwo,
          globalPost:settingThree,
          id: postID,
          uid: uid,
          type:type,
          visibleTo:visibleTo,
          blockedTo:blockedTo,
      }
      logger.info("POST SUBMITTING WITH DATA: ", postObj)
          // if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };}
      try {
        const uniqueUserPath = `users/${uid}/xpLog`;
        await db.doc(`${uniqueUserPath}/${postID}`).set({ id: postID, timeStamp:timeStamp, eventTitle:eventTitle, traitType: postSkill, xp:xp });
        await db.doc(`posts/${postID}`).set(postObj);
        giveUserXP(postSkill,uid,xp)
      } catch(err) {
        logger.error(err)
      }
      return true;
    }

  
const giveUserXP = async (skill: string, uid: string, xpQty: number) => {
  try {
    const lowSkill = skill.toLowerCase();
    // Reference to the user's document in the 'users' collection
    const userDocRef = db.collection('users').doc(uid);

    // Get the user's document
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      logger.error('User does not exist!');
      return;
    }

    // Get the xpData object from the user's document
    const userData: any = userDoc.data();
    logger.info(userData);
    const xpData = userData.xpData;

    // Check if the skill exists in xpData, if not initialize it to 0
    if (!xpData[lowSkill]) xpData[lowSkill] = 0;

    // Update the xp for the given skill using FieldValue.increment
    await userDocRef.update({ [`xpData.${lowSkill}`]: admin.firestore.FieldValue.increment(xpQty) });

    logger.info('XP updated successfully!');
  } catch (error) {
    logger.error('Error updating XP:', error);
  }
};


const giveUserNotification = async (uid:string,message:string) => {
  const notificationObj = {
    message:message,
    read:false,
    timeStamp:Timestamp.now(),
  }
  logger.log(notificationObj)
  await db.collection(`users/${uid}/notifications`).add(notificationObj)
}

const updateXpLogDocumentXp = async(uid:string,score:number,timeStamp:any)=>{
  try{
    const docID = `${uid}_${timeStamp.toMillis()}`
    const docRef = admin.firestore().doc(`users/${uid}/xpLog/${docID}`);
    await docRef.update({ xp: admin.firestore.FieldValue.increment(score) });
  } catch (err) {
    logger.error(err)
  }

}
    















// HOURLY POST CLEANUP //


const bucket = admin.storage().bucket(); // Default bucket for your Firebase project

const extractStoragePathFromURL = (url:string) => {
  const regex = /appreallife-ea3d9\.appspot\.com\/(.*?)\?GoogleAccessId=/;
  const match = url.match(regex);
  if (match && match[1]) {
      return decodeURIComponent(match[1]);
  }
  return null;
};

export const cleanupPostsAndRewardUsers = functions.pubsub.schedule('every 1 hours').timeZone('UTC').onRun(async (context) => {
  logger.log('Starting cleanup and reward process...');

  try {
      const currentTime = new Date();
      const twentyFourHoursAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000));
      const twentyFourHoursAgoTimestamp = admin.firestore.Timestamp.fromDate(twentyFourHoursAgo);
      
      // Fetch posts older than 24 hours from Firestore
      const oldPostsQuerySnapshot = await admin.firestore().collection('posts')
          .where('timeStamp', '<=', twentyFourHoursAgoTimestamp)
          .get();

      for (const doc of oldPostsQuerySnapshot.docs) {
          const postData = doc.data();

          giveUserXP(postData.postSkill, postData.posterUID, postData.score);
          updateXpLogDocumentXp(postData.posterUID, postData.score, postData.timeStamp);
          giveUserNotification(postData.posterUID, `Your ${postData.eventTitle} post finished with a score of ${postData.score}! You have received ${postData.score} ${postData.postSkill} XP!`);

          // Array to hold the storage paths of the images to be deleted.
          let imageStoragePaths:any = [];

          if (postData.cameraPicURL != "") {
              const path = extractStoragePathFromURL(postData.cameraPicURL);
              if (path) imageStoragePaths.push(path);
          }

          if (postData.timelinePicURLs.length > 0) {
              for (const url of postData.timelinePicURLs) {
                  const path = extractStoragePathFromURL(url);
                  if (path) imageStoragePaths.push(path);
              }
          }

          // Delete images from Firebase Storage using the extracted paths.
          for (const storagePath of imageStoragePaths) {
              try {
                  await bucket.file(storagePath).delete();
                  logger.log('Deleted Image with path:', storagePath);
              } catch (error) {
                  logger.error('Failed to delete image with path:', storagePath, 'Error:', error);
              }
          }

          // Delete the post
          await admin.firestore().collection('posts').doc(doc.id).delete();
      }

      logger.log('Cleanup and reward process completed successfully!');
  } catch (error) {
      logger.error('Error occurred during cleanup and reward process:', error);
  }
});



