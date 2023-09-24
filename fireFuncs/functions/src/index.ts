
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();


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
  try {
    const incomingData = request.body;
    const email = incomingData.email;
    const password = incomingData.password;
    const userName = incomingData.userName;
    const name = incomingData.name;
    const phoneNumber = incomingData.phoneNumber;
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
          coverURL:"",
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
          friends:[],
          blockedUsers:[],
        }
        try {
          // logger.info(request.body)
          await db.collection('users').doc(uid).set(userObj);
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
  const {posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,picture,pictureList}:any = request.body
  switch(type){
    case "log":
     await handlePostSubmit(
        posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,[],""
      )
    break;
    case "camera":      //SET AND FETCH PICTURE
     await handlePostSubmit(
        posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,[],picture
      )

    break;
    case "timeline":
      //SET AND FET PICTURES
      logger.log(pictureList)
      await handlePostSubmit(
        posterUID,posterUserName,streak,postSkill,picURL,eventTitle,xp,textLog,settingOne,settingTwo,settingThree,type,pictureList,""
      )
    break;
  }
  response.send("SUCCESS");
    //switch based off of type
    //upload photo(s)
    //create post doc
    //give user xp
    //create xpLog of it
} catch (err) {
  logger.error("post failed at data calling or switch", err)
  response.send(err);
}
});
export const deletePost = functions.https.onRequest(async(request,response)=>{
    //This should run automatically on every document once its stamp reaches 24 hours
    //give user score XP so long as its above 0, and capped at (eventXp * 3)
    //updating corresponding xp log xp key value pair.
    //send message to user's inbox (notifications) telling them how much xp they got.
    //delete post & possible images from posts collection
})






// UTILITY FUNCS //
const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
  };
  function generateTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  }
//EXP Uploader Functions//
const handlePostSubmit = async(
  uid:string,userName:string,streak:number,postSkill:string,
  picURL:any,eventTitle:string,xp:number,textLog:string,
  settingOne:boolean,settingTwo:boolean,settingThree:boolean,type:string,
  timelinePicURLs:any,cameraPicURL:string,
  ) => {
  let timeStamp = generateTimestamp()
  const postID = `${uid}_${timeStamp}`
      const postObj = {
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
          type:type
      }
      logger.log("POST SUBMITTING WITH DATA: ", postObj)
          // if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };}
      try {
        const uniqueUserPath = `users/${uid}/xpLog`;
        await db.doc(`${uniqueUserPath}/${postID}`).set({ id: postID, timeStamp:timeStamp, eventTitle:eventTitle, traitType: postSkill, xp:xp });
        await db.doc(`posts/${postID}`).set(postObj);
      } catch(err) {
        logger.error(err)
      }
    }


// ADMIN FUNCS //
export const deleteOldPosts = functions.https.onRequest(async(request,response)=>{

})