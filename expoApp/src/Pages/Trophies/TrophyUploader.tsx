import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
  Keyboard,
  ImageBackground
} from 'react-native';
import React from 'react'
import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
import {  useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';
import { useFriends } from '../../Contexts/FriendsContext';
import { useFeed } from '../../Contexts/FeedContext';
import {scaleFont} from '../../Utilities/fontSizing'
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import ErrorModal from '../../Overlays/ErrorModal';
import CameraAddSVG from '../../IconBin/svg/camera_add.svg'

const TrophyUploader = ():JSX.Element => {

  const {friendsData}:any = useFriends()
  const {userData}:any = useUserData()
  const {uid}:any = useUID()
  const {currentEvent}:any = useCurrentEvent()
  const {newPostHandler}:any = useFeed()
  const navigation:any = useNavigation();
  const [text, setText] = useState('');
  const [errorMessage,setErrorMessage] = useState<string>()
  const [loadingBool,setLoadingBool] = useState<boolean>(false)
  const [errorMessageText,setErrorMessageText] = useState<string>()
  const [errorBool,setErrorBool] = useState<boolean>(false)
  const [settingOne,setSettingOne] = useState(false)
  const [imageOneState,setImageOneState] = useState<string|null>()
  const [imageTwoState,setImageTwoState] = useState<string|null>()
  const [imageThreeState,setImageThreeState] = useState<string|null>()
  const [imageFourState,setImageFourState] = useState<string|null>()
  const [imageFiveState,setImageFiveState] = useState<string|null>()
  const [imageSixState,setImageSixState] = useState<string|null>()

  useEffect(()=>{
    console.log(currentEvent)
  },[])

  const blobToBase64 = (blob:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
  };

  const handleGoBack = () => {
    navigation.navigate("TrophyCase")
  }

  const handlePostSubmit = async() => {
    setLoadingBool(true)
      if (text.length>9 && imageOneState && imageTwoState && imageThreeState && imageFourState && imageFiveState && imageSixState) {
        try{
          const imageBlobs = await Promise.all([
            fetch(imageOneState).then(res => res.blob()),
            fetch(imageTwoState).then(res => res.blob()),
            fetch(imageThreeState).then(res => res.blob()),
            fetch(imageFourState).then(res => res.blob()),
            fetch(imageFiveState).then(res => res.blob()),
            fetch(imageSixState).then(res => res.blob()),
          ]);

          const [base64ImageOne, base64ImageTwo, base64ImageThree, base64ImageFour, base64ImageFive, base64ImageSix] = await Promise.all(
              imageBlobs.map(blob => blobToBase64(blob))
          );
          const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/createTrophyPost"

          try {
              const response = await fetch(functionURL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  base64Image:{
                    imageOne: base64ImageOne,
                    imageTwo: base64ImageTwo,
                    imageThree: base64ImageThree,
                    imageFour: base64ImageFour,
                    imageFive: base64ImageFive,
                    imageSix: base64ImageSix,
                  },
                  posterUID:uid,
                  posterUserName:userData.userName,
                  streak:userData.streak,
                  postSkill:currentEvent.skill,
                  picURL: userData.picURL,
                  trophyTitle:currentEvent.title,
                  xp:currentEvent.xp,
                  textLog:text,
                  settingOne:settingOne,
                  tier:currentEvent.tier,
                  svgPath: currentEvent.imgPath,
                  visibleTo:[...friendsData.trueFriends,uid],
                  blockedTo:[...friendsData.blockedPersons],
                  desc:currentEvent.desc
              }),
              })
              if (!response.ok) {
                  setLoadingBool(false)
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const responseMessage = await response.text();
              console.log("Response Message: ",responseMessage);
              if (responseMessage == "INAPPROPRIATE") {
                setLoadingBool(false)
                setErrorMessageText("DO NOT UPLOAD INAPPROPRIATE CONTENT TO THIS PLATFORM!!")
                setErrorBool(true)
              } else {
                setLoadingBool(false)
                newPostHandler()
                // refreshCooldowns()
                navigation.popToTop()
                navigation.navigate("Feed")
              }
              
          } catch(err) {
            setLoadingBool(false)
            console.error(err)}
          // if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };}
          } catch(err){
              console.error("Post failed to post",err)
              setErrorMessage("Your experiences failed to post. Please close the app & try again.")
              setLoadingBool(false)
          }
      }
  }

  const pickImage = async (setImageState:any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets) {
      const originalWidth = result.assets[0].width;
      const originalHeight = result.assets[0].height;
      const aspectRatio = (originalWidth / originalHeight)

      let newWidth, newHeight;
      if (originalWidth > originalHeight) {
        newWidth = 1000;
        newHeight = 1000 / aspectRatio;
      } else {
        newHeight = 1000;
        newWidth = 1000 * aspectRatio;
      }


      const manipulatedResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{resize:{width:newWidth,height:newHeight}}],
        {compress:0.5}
      )
      setImageState(manipulatedResult.uri);
    }
  };


  const TimelineAction = ():JSX.Element => {
    return(
        <View style={{...styles.logContainer}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                    <Text style={{...styles.loginlabel}}>Upload six photos to prove trophy authenticity:</Text>
                </View>
        <View style={{flexDirection:"row",justifyContent:"space-evenly",flexWrap:"wrap",width:"100%"}} >
            <TouchableOpacity onPress={()=>{pickImage(setImageOneState)}} style={{...styles.textArea, padding:0,overflow:"hidden",alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%", marginBottom:10}}>
                    {imageOneState && (
                        <ImageBackground
                        source={{ uri: imageOneState }}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                        />
                    )}
                    {!imageOneState && (
                    <>
                        <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                    </> 
                    )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pickImage(setImageTwoState)}} style={{...styles.textArea, padding:0,overflow:"hidden",alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%"}}>
                    {imageTwoState && (
                        <ImageBackground
                        source={{ uri: imageTwoState }}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                        />
                    )}
                    {!imageTwoState && (
                    <>
                        <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                    </> 
                    )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pickImage(setImageThreeState)}} style={{...styles.textArea,padding:0,overflow:"hidden", alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%"}}>
                    {imageThreeState && (
                        <ImageBackground
                        source={{ uri: imageThreeState }}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                        />
                    )}
                    {!imageThreeState && (
                    <>
                        <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                    </> 
                    )}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{pickImage(setImageFourState)}} style={{...styles.textArea,padding:0,overflow:"hidden", alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%"}}>
                    {imageFourState && (
                        <ImageBackground
                        source={{ uri: imageFourState }}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                        />
                    )}
                    {!imageFourState && (
                    <>
                        <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                    </> 
                    )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pickImage(setImageFiveState)}} style={{...styles.textArea,padding:0,overflow:"hidden", alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%"}}>
                    {imageFiveState && (
                        <ImageBackground
                        source={{ uri: imageFiveState }}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                        />
                    )}
                    {!imageFiveState && (
                    <>
                        <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                    </> 
                    )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pickImage(setImageSixState)}} style={{...styles.textArea,padding:0,overflow:"hidden", alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%"}}>
                    {imageSixState && (
                        <ImageBackground
                        source={{ uri: imageSixState }}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                        />
                    )}
                    {!imageSixState && (
                    <>
                        <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                    </> 
                    )}
            </TouchableOpacity>
        </View>
        </View>
    )
}





  return(
    <>
      <ScrollView style={{...styles.expUploaderTop}}>
          <TouchableOpacity onPress={()=>handleGoBack()} style={styles.closeUploaderButton}>
              <Text style={styles.backHeaderText}>⇦Go Back</Text>
          </TouchableOpacity>
          <View style={{alignItems:"center", padding:10, borderBottomWidth:2, borderColor:"#656565"}}>
                  <Text style={{color:currentEvent.tierColor, fontSize:scaleFont(24)}}>{currentEvent.title}</Text>
                  <Text style={{color:"#ababab", fontSize:scaleFont(16)}}>{currentEvent.desc}</Text>
                </View>
          <View style={{...styles.actionBox,backgroundColor:''}}>
              <TimelineAction />
          </View>
          <View style={{...styles.logContainer}}>
              <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                  <Text style={{...styles.loginlabel}}>Log the experience:</Text>
                  <Text style={{...styles.loginlabel, color:`${(text.length > 340)?"yellow":"white"}`}}>{text.length} / 360</Text>
              </View>
              <TextInput
                  style={styles.textAreaTrophy}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={(text) => setText(text)}
                  value={text}
                  maxLength={360}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={()=>Keyboard.dismiss()}
              />
              
          </View>
          <View style={{...styles.togglesContainer,}}>
              { (userData.settings.privateProfile == true) &&
              (<View style={{...styles.eventTileWrapper,borderColor:`${settingOne?"#008000":"#656565"}`}}>
                  <View style={{...styles.eventTileMain}}>
                      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                          <Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                      </View>
                      <Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch on to make post visible to the Global Trophy Feed.</Text>
                  </View>
                  <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                      <View style={styles.eventButtonWrapper}>
                      <Switch
                          trackColor={{ false: '#767577', true: "#008000" }}  // Change '#81b0ff' to your desired color
                          thumbColor={settingOne ? '#fff' : '#fff'}  // Change '#f5dd4b' to your desired color
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={(newVal)=>setSettingOne((prev)=>!prev)}
                          value={settingOne}
                      />
                      </View>
                  </View>
              </View>
              )}
              { (userData.settings.privateProfile == false) &&
              (<View style={{...styles.eventTileWrapper,borderColor:"#2e2e2e"}}>
                  <View style={{...styles.eventTileMain}}>
                      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                          <Text style={{...styles.eventTileText,color:"gray",fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                      </View>
                      <Text style={{...styles.eventTileText,color:"gray", fontSize:scaleFont(16),}}>Your account is private. Private accounts cannot make Global posts!</Text>
                  </View>
                  <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>

                  </View>
              </View>
              )}             
          </View>
          <View style={{alignItems:"center", width:"100%"}}>

              <TouchableOpacity onPress={handlePostSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.tierColor}`}}>
                  <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Post your {currentEvent.title} Trophy</Text>
              </TouchableOpacity>

              <View style={{height:20}} />
              {errorMessage&&(<View style={{height:30,width:"90%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
              <Text style={{color:"#fff",fontSize:scaleFont(14)}}>!! {errorMessage} !!</Text>
              </View>)}
          </View>
          <View style={styles.uploaderDescription}>
            <Text style={{color:"#fff"}}>- What are Trophies?</Text>
            <Text style={{paddingLeft: 10,color:"#ababab"}}>Trophies are elevated social media posts that showcase notable achievements. Unlike regular posts, they stay on the Feed for three days. Once a successful Trophy expires it is moved to your personal Trophy case for lasting recognition.</Text>
            <View style={{height:10}} />
            <Text style={{color:"#fff"}}>- How does a Trophy succeed?</Text>
            <Text style={{paddingLeft: 10,color:"#ababab"}}>Trophies need to meet a minimum score within their three-day lifespan to be considered successful. Achieving this score unlocks the Trophy, yielding substantial EXP rewards. A Trophy is showcased alongside of its score, making the score of the post just as important as unlocking it.</Text>
          </View>
          <View style={{height:200,}} />
      </ScrollView>

    {loadingBool&&(
      <LoadingOverlay text={"Uploading Post..."} isVisible={loadingBool} opacity={0.8}/>
    )}
      <ErrorModal setErrorBool={setErrorBool} isVisible={errorBool} text={errorMessageText} opacity={0.5} />
  </>
  )

}


export default TrophyUploader