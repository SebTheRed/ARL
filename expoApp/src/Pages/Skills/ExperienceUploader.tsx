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
import { useFeed } from '../../Contexts/FeedContext';
import { useFriends } from '../../Contexts/FriendsContext';
import { useCooldowns } from '../../Contexts/CooldownContext';
import {scaleFont} from '../../Utilities/fontSizing'
import CameraPage from './CameraPage'
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import ErrorModal from '../../Overlays/ErrorModal';
import CameraAddSVG from '../../IconBin/svg/camera_add.svg'
import BackArrow from '../../IconBin/svg/back_arrow.svg'

const ExperienceUploader = ():JSX.Element => {
    const {refreshCooldowns}:any = useCooldowns()
    const {friendsData}:any = useFriends()
    const {userData}:any = useUserData()
    const {currentEvent, setCurrentEvent}:any = useCurrentEvent()
    const {newPostHandler}:any = useFeed()
    const {uid}:any = useUID()
    const [utilityType,setUtilityType] = useState("")
    const [text, setText] = useState('');
    const [settingOne,setSettingOne] = useState(true)
    const [settingTwo,setSettingTwo] = useState(false)
    const [settingThree,setSettingThree] = useState(false)
    const [cameraActiveBool,setCameraActiveBool] = useState(false)
    const [cameraImageState,setCameraImageState] = useState(null)
    const [cameraImageURL,setCameraImageURL] = useState(null)
    const [errorMessage,setErrorMessage] = useState(String)
    const [imageOneState,setImageOneState] = useState<string|null>(null)
    const [imageTwoState,setImageTwoState] = useState<string|null>(null)
    const [imageThreeState,setImageThreeState] = useState<string|null>(null)
    const [loadingBool,setLoadingBool] = useState(false)
    const [errorBool,setErrorBool] = useState(false)
    const [errorMessageText,setErrorMessageText] = useState<string>()
    const navigation = useNavigation<any>();
    useEffect(()=>{
        setUtilityType(currentEvent.type)
    },[])
    const handleGoBack = () => {
        navigation.navigate(currentEvent.skillTitle)
        setCurrentEvent({})
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


    const blobToBase64 = (blob:any) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
          reader.onloadend = () => {
              resolve(reader.result);
          };
      });
    };

    const handleTimelineSubmit = async() => {
      setLoadingBool(true)
        if (text.length>9 && imageOneState && imageTwoState && imageThreeState) {
            try{
              const imageBlobs = await Promise.all([
                fetch(imageOneState).then(res => res.blob()),
                fetch(imageTwoState).then(res => res.blob()),
                fetch(imageThreeState).then(res => res.blob())
              ]);

              const [base64ImageOne, base64ImageTwo, base64ImageThree] = await Promise.all(
                  imageBlobs.map(blob => blobToBase64(blob))
              );
                const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/createPost"

                try {
                    const response = await fetch(functionURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        base64Image:{
                          imageOne:base64ImageOne,
                          imageTwo:base64ImageTwo,
                          imageThree:base64ImageThree,
                        },
                        picture:"",
                        pictureList:[],
                        posterUID:uid,
                        posterUserName:userData.userName,
                        streak:userData.streak,
                        postSkill:currentEvent.skillTitle,
                        picURL: userData.picURL,
                        eventTitle:currentEvent.title,
                        xp:currentEvent.xp,
                        textLog:text,
                        settingOne:settingOne,
                        settingTwo:settingTwo,
                        settingThree:settingThree,
                        type:currentEvent.type,
                        visibleTo:[...friendsData.trueFriends,uid],
                        blockedTo:[...friendsData.blockedPersons]
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
                      refreshCooldowns()
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
    const handleCameraPostSubmit = async() => {
        setLoadingBool(true)
        if (text.length>9 && cameraImageURL && cameraImageState) {
            // let pictureURL:string = ""
            try {
            const response = await fetch(cameraImageState)
            const blob = await response.blob()
            const base64Image = await blobToBase64(blob)
            console.log("base64 Image successfully converted from blob")
                const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/createPost"

                try {
                    const response = await fetch(functionURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        base64Image,
                        picture:"",
                        pictureList:[],
                        posterUID:uid,
                        posterUserName:userData.userName,
                        streak:userData.streak,
                        postSkill:currentEvent.skillTitle,
                        picURL: userData.picURL,
                        eventTitle:currentEvent.title,
                        xp:currentEvent.xp,
                        textLog:text,
                        settingOne:settingOne,
                        settingTwo:settingTwo,
                        settingThree:settingThree,
                        type:currentEvent.type,
                        visibleTo:[...friendsData.trueFriends,uid],
                        blockedTo:[...friendsData.blockedPersons]
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
                      refreshCooldowns()
                      navigation.popToTop()
                      navigation.navigate("Feed")
                    }
                } catch(err) {
                  setLoadingBool(false)
                  console.error(err)}
                // if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };}
            } catch(err) {
              setLoadingBool(false)
                console.error("upload failed",err)
                setErrorMessage("Image upload failed, please try again with a new picture.")
            }

        } else {
          setLoadingBool(false)
            console.warn("LOG MUST BE AT LEAST 10 CHARACTERS")
            if (text.length<9) {setErrorMessage("Your log must be at least 10 characters!")}
            else if (!cameraImageURL) {setErrorMessage("This experiences requires a picture!")}}
        
    }

    const handleLogPostSubmit = async() => {
        if (text.length>9) {
            setLoadingBool(true)
            const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/createPost"
            try {
                const response = await fetch(functionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    picture:"",
                    pictureList:[],
                    posterUID:uid,
                    posterUserName:userData.userName,
                    streak:userData.streak,
                    postSkill:currentEvent.skillTitle,
                    picURL: userData.picURL,
                    eventTitle:currentEvent.title,
                    xp:currentEvent.xp,
                    textLog:text,
                    settingOne:settingOne,
                    settingTwo:settingTwo,
                    settingThree:settingThree,
                    type:currentEvent.type,
                    visibleTo:[...friendsData.trueFriends,uid],
                    blockedTo:[...friendsData.blockedPersons]
                }),
                })
        
                if (!response.ok) {
                setLoadingBool(false)
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseMessage = await response.text();
                console.log("Response Message: ",responseMessage);
                setLoadingBool(false)
                    newPostHandler()
                    refreshCooldowns()
                    navigation.popToTop()
                    navigation.navigate("Feed")
                }catch(err){
                    console.error(err)
                    setLoadingBool(false)
                }
    } else {
        setErrorMessage("Your log must be at least 10 characters!")
        setLoadingBool(false)
    }
}

    const ApiAction = ():JSX.Element => {
        return(<View></View>)
    }
    const CameraAction = ():JSX.Element => {
        return(
            <View style={{...styles.logContainer}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                        <Text style={{...styles.loginlabel}}>Take a picture of the experience:</Text>
                    </View>
                <TouchableOpacity onPress={()=>{setCameraActiveBool(true)}} style={{...styles.textArea,padding:0,overflow:'hidden', alignItems:"center",justifyContent:"center", height:scaleFont(400)}}>
                        {cameraImageState && (
                            <ImageBackground
                            source={{ uri: cameraImageState }}
                            style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                            />
                        )}
                        {!cameraImageState && (
                        <>
                            <CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
                            <Text style={{...styles.loginlabel}}>Press here to open camera.</Text>
                        </> 
                        )}
                </TouchableOpacity>
                
            </View>
        )
    }
    const AccelerationAction = ():JSX.Element => {
        return(<Text>Acceleration</Text>)
    }
    const TimelineAction = ():JSX.Element => {
        return(
            <View style={{...styles.logContainer}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                        <Text style={{...styles.loginlabel}}>Upload three photos of the experience:</Text>
                    </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"100%"}} >
                <TouchableOpacity onPress={()=>{pickImage(setImageOneState)}} style={{...styles.textArea, padding:0,overflow:"hidden",alignItems:"center",justifyContent:"center", height:scaleFont(150), width:"30%"}}>
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
            </View>
            </View>
        )
    }


    const ActionSplitter = ():JSX.Element => {
        switch(utilityType){
            case "camera": return(<CameraAction />)
            case "acceleration": return(<AccelerationAction />)
            case "timeline": return(<TimelineAction />)
            case "log": case "api": return(<View />);
            default:return(<View />);
        }
    }

    return(
        <>
              <TouchableOpacity onPress={()=>handleGoBack()} style={styles.backHeaderBar}>
                    <BackArrow width={scaleFont(20)} height={scaleFont(20)} />
                    <Text style={styles.backHeaderText}>Go Back</Text>
                </TouchableOpacity>
            <ScrollView style={{...styles.expUploaderTop}}>
                
                <View style={{alignItems:"center", padding:10, borderBottomWidth:2, borderColor:"#656565"}}>
                  <Text style={{color:currentEvent.skillColor, fontSize:scaleFont(24)}}>{currentEvent.title}</Text>
                  <Text style={{color:"#ababab", fontSize:scaleFont(16)}}>{currentEvent.desc}</Text>
                </View>
                <View style={{...styles.actionBox,backgroundColor:''}}>
                    <ActionSplitter />
                </View>
                <View style={{...styles.logContainer}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                        <Text style={{...styles.loginlabel}}>Write a log of the experience:</Text>
                        <Text style={{...styles.loginlabel, color:`${(text.length > 150)?"yellow":"white"}`}}>{text.length} / 160</Text>
                    </View>
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => setText(text)}
                        value={text}
                        maxLength={160}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>Keyboard.dismiss()}
                    />
                    
                </View>
                <View style={{...styles.togglesContainer,}}>
                    <View style={{...styles.eventTileWrapper,borderColor:`${settingOne?currentEvent.skillColor:"#656565"}`}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Friends Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch off to hide post from friends. Disabling any additional EXP from their Upvotes.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                            <View style={styles.eventButtonWrapper}>
                            <Switch
                                trackColor={{ false: '#767577', true: currentEvent.skillColor }}  // Change '#81b0ff' to your desired color
                                thumbColor={settingTwo ? '#fff' : '#fff'}  // Change '#f5dd4b' to your desired color
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(newVal) => setSettingOne((prev) => !prev)}
                                value={settingOne}
                            />
                            </View>
                        </View>
                    </View>
                    { (settingOne==true && userData.settings.privateProfile == true) &&
                    (<View style={{...styles.eventTileWrapper,borderColor:`${settingThree?currentEvent.skillColor:"#656565"}`}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch on to make post visible to the Global Feed.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                            <View style={styles.eventButtonWrapper}>
                            <Switch
                                trackColor={{ false: '#767577', true: currentEvent.skillColor }}  // Change '#81b0ff' to your desired color
                                thumbColor={settingTwo ? '#fff' : '#fff'}  // Change '#f5dd4b' to your desired color
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(newVal)=>setSettingThree((prev)=>!prev)}
                                value={settingThree}
                            />
                            </View>
                        </View>
                    </View>
                    )}
                    { (settingOne == false && userData.settings.privateProfile == false) &&
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
                    { (settingOne == false && userData.settings.privateProfile == true) &&
                    (<View style={{...styles.eventTileWrapper,borderColor:"#2e2e2e"}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,color:"gray",fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText,color:"gray", fontSize:scaleFont(16),}}>Switch on to make post visible to the Global Feed.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>

                        </View>
                    </View>
                    )}
                    {/* { (settingOne == false && userData.settings.privateProfile == false) &&
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
                    )} */}

                    
                </View>
                <View style={{alignItems:"center", width:"100%"}}>
                    {utilityType=="camera"&&(
                    <TouchableOpacity onPress={handleCameraPostSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.skillColor}`}}>
                        <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Post your {currentEvent.skillTitle} Experience</Text>
                    </TouchableOpacity>
                    )}
                    {(utilityType=="log"||utilityType=="api")&&(
                    <TouchableOpacity onPress={handleLogPostSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.skillColor}`}}>
                        <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Post your {currentEvent.skillTitle} Experience</Text>
                    </TouchableOpacity>
                    )}
                    {utilityType=="timeline"&&(
                    <TouchableOpacity onPress={handleTimelineSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.skillColor}`}}>
                        <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Post your {currentEvent.skillTitle} Experience</Text>
                    </TouchableOpacity>
                    )}
                    <View style={{height:20}} />
                    {errorMessage&&(<View style={{height:30,width:"90%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
                    <Text style={{color:"#fff",fontSize:scaleFont(14)}}>!! {errorMessage} !!</Text>
                    </View>)}
                </View>
                <View style={styles.uploaderDescription}>
                  <Text style={{color:"#fff"}}>- What are Experiences?</Text>
                  <Text style={{paddingLeft: 10,color:"#ababab"}}>Experiences are activities in your real life posted on the Feed for Friends and/or the Globe to see. Uploading the post earns you EXP points, then bonus EXP based on the final score it receives.</Text>
                  <View style={{height:10}} />
                  <Text style={{color:"#fff"}}>- How does scoring work for Experiences?</Text>
                  <Text style={{paddingLeft: 10,color:"#ababab"}}>Scores for your Experiences are determined by other users through upvotes & downvotes. A higher score indicates more community engagement and appreciation. Your final score at the end of 24 hours determines the bonus EXP you earn.</Text>
                  <View style={{height:10}} />
                  <Text style={{color:"#fff"}}>- Why do Experiences last only 24 hours?</Text>
                  <Text style={{paddingLeft: 10,color:"#ababab"}}>We keep Experiences to a 24-hour lifespan to encourage a dynamic and ever-refreshing Feed. This time frame promotes the sharing of new, daily Experiences and helps in maintaining a lean, cost-effective storage strategy.</Text>
                </View>
                <View style={{height:200,}} />
            </ScrollView>
            {cameraActiveBool==true&&(
                <CameraPage setCameraImageURL={setCameraImageURL} setCameraActiveBool={setCameraActiveBool} cameraImageState={cameraImageState} setCameraImageState={setCameraImageState} />
            )}
          {loadingBool&&(
            <LoadingOverlay text={"Uploading Post..."} isVisible={loadingBool} opacity={0.8}/>
          )}
            <ErrorModal setErrorBool={setErrorBool} isVisible={errorBool} text={errorMessageText} opacity={0.8} />
        </>
    )
}

export default ExperienceUploader