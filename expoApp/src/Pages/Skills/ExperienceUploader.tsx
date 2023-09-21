import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
	TextInput,
    Modal,
    Switch,
    Keyboard,
    Image,
    ImageBackground
  } from 'react-native';
  import React from 'react'
  import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
  import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {db, auth,} from '../../Firebase/firebase'
import {getStorage,ref,uploadString,getDownloadURL, uploadBytesResumable} from "firebase/storage"
import {setDoc,doc, Timestamp} from 'firebase/firestore'
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';
import { useFeed } from '../../Contexts/FeedContext';
import {scaleFont} from '../../Utilities/fontSizing'
import CameraPage from './CameraPage'

type RootStackParamList = {
    SkillsPage:undefined,
    Feed:undefined,
}
const ExperienceUploader = ():JSX.Element => {
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

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useEffect(()=>{
        setUtilityType(currentEvent.type)
        console.log("expUpload")
        console.log(currentEvent)
    },[])

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
      
    const handleGoBack = () => {
        const skillName = currentEvent.skillTitle
        console.log(skillName)
        navigation.navigate(currentEvent.skillTitle)
        setCurrentEvent({})
    }
    // const getGeoLocation = () => {
    //     return new Promise((resolve, reject) => {
    //       Geolocation.getCurrentPosition(
    //         (position) => {
    //           resolve({
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //           });
    //         },
    //         (error) => {
    //           reject(error);
    //         },
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //       );
    //     });
    //   };
    const handleCameraPostSubmit = async() => {
        
        let timeStamp = generateTimestamp()
        const storage = getStorage();
        const postID = `${uid}_${timeStamp}`
        const imageRef = ref(storage,`posts/${postID}.jpg`)
        if (text.length>15 && cameraImageURL && cameraImageState) {
            let pictureURL:string = ""
            try {

            // const imageRef = ref(storage, `posts/${postID}.jpg`)
            // await uploadString(imageRef,cameraImageURL,'data_url')
            // pictureURL = await getDownloadURL(imageRef)
            const response = await fetch(cameraImageState)
            const blob = await response.blob()
            const uploadTask = uploadBytesResumable(imageRef,blob)
            uploadTask.on('state_changed',
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            },
            (error) => {
            console.error("Upload failed:", error);
            },
            async () => {
                pictureURL = await getDownloadURL(imageRef)
                const postObj = {
                    cameraPicURL:pictureURL,
                    posterUID:uid,
                    posterUserName:userData.userName,
                    streak:userData.streak,
                    postSkill:currentEvent.skillTitle,
                    picURL: userData.picURL,
                    uniqueStamp:"",
                    eventTitle:currentEvent.title,
                    xp:currentEvent.xp,
                    score:0,
                    geoTag:{latitude:0,longitude:0},
                    timeStamp:timeStamp,
                    textLog:text,
                    publicPost:settingOne,
                    mapPost:settingTwo,
                    globalPost:settingThree,
                    id: postID,
                    uid: uid,
                    type:currentEvent.type
                }
                // if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };}
                try {
                    const uniqueUserPath = `users/${uid}/xpLog`
                    await setDoc(doc(db,uniqueUserPath, postID), {id: postID, timeStamp:timeStamp, eventTitle:currentEvent.title, traitType:currentEvent.skillTitle, xp:currentEvent.xp })
                    await setDoc(doc(db, "posts", postID),postObj)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        newPostHandler()
                        navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                {
                                  name: 'AuthedApp', // The name of the root navigator's screen that contains the child navigators
                                  state: {
                                    routes: [
                                      {
                                        name: 'Feed', // The name of the child navigator
                                      },
                                    ],
                                  },
                                },
                              ],
                            })
                          );
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            }
            )
            } catch(err) {
                console.error("upload failed",err)
            }

        } else {
            console.warn("LOG MUST BE AT LEAST 16 CHARACTERS")
        }
        
    }

    const handleLogPostSubmit = async() => {
        let timeStamp = generateTimestamp()
        const postID = `${uid}_${timeStamp}`
        if (text.length>15) {
            const postObj = {
                cameraPicURL:"",
                posterUID:uid,
                posterUserName:userData.userName,
                streak:userData.streak,
                postSkill:currentEvent.skillTitle,
                picURL: userData.picURL,
                uniqueStamp:"",
                eventTitle:currentEvent.title,
                xp:currentEvent.xp,
                score:0,
                geoTag:{latitude:0,longitude:0},
                timeStamp:timeStamp,
                textLog:text,
                publicPost:settingOne,
                mapPost:settingTwo,
                globalPost:settingThree,
                id: postID,
                uid: uid,
                type:currentEvent.type
            }
                // if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };}
            try {
                const uniqueUserPath = `users/${uid}/xpLog`
                await setDoc(doc(db,uniqueUserPath, postID), {id: postID, timeStamp:timeStamp, eventTitle:currentEvent.title, traitType:currentEvent.skillTitle, xp:currentEvent.xp })
                await setDoc(doc(db, "posts", postID),postObj)
                .then(() => {
                    console.log("Post Success!");
                    // Go back to the root navigator
                    newPostHandler()
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                            {
                                name: 'AuthedApp', // The name of the root navigator's screen that contains the child navigators
                                state: {
                                routes: [
                                    {
                                    name: 'Feed', // The name of the child navigator
                                    },
                                ],
                                },
                            },
                            ],
                        })
                        );
                    })
            } catch(err){
                console.error("Post failed to post",err)
            }
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
                <TouchableOpacity onPress={()=>{setCameraActiveBool(true)}} style={{...styles.textArea, alignItems:"center",justifyContent:"center", height:scaleFont(400)}}>
                        {cameraImageState && (
                            <ImageBackground
                            source={{ uri: cameraImageState }}
                            style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                            />
                        )}
                        {!cameraImageState && (
                        <>
                            <Image style={{...styles.bottomBarIcon}} source={require("../../IconBin/camera_add.png")} />
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
        return(<Text>Timeline</Text>)
    }


    const ActionSplitter = ():JSX.Element => {
        switch(utilityType){
            case "api": return(<ApiAction />)
            case "camera": return(<CameraAction />)
            case "acceleration": return(<AccelerationAction />)
            case "timeline": return(<TimelineAction />)
            case "log": return(<View />);
            default:return(<View />);
        }
    }

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={true}>
            <ScrollView style={{...styles.expUploaderTop}}>
                <TouchableOpacity onPress={()=>handleGoBack()} style={styles.closeUploaderButton}>
                    <Text style={styles.backHeaderText}>⇦Go Back</Text>
                </TouchableOpacity>
                <View style={{...styles.actionBox,backgroundColor:''}}>
                    <ActionSplitter />
                </View>
                <View style={{...styles.logContainer}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                        <Text style={{...styles.loginlabel}}>Write a log of the experience:</Text>
                        <Text style={{...styles.loginlabel, color:`${(text.length === 120)?"red":"white"}`}}>{text.length} / 120</Text>
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
                        maxLength={120}
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
                            <Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch off to hide post from friends. Disabling any additional XP from their Upvotes.</Text>
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
                    {settingOne == true &&
                    (<View style={{...styles.eventTileWrapper,borderColor:`${settingTwo?currentEvent.skillColor:"#656565"}`}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Map Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch on to have your post appear on the Map for friends to find.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                            <View style={styles.eventButtonWrapper}>
                            <Switch
                                trackColor={{ false: '#767577', true: currentEvent.skillColor }}  // Change '#81b0ff' to your desired color
                                thumbColor={settingTwo ? '#fff' : '#fff'}  // Change '#f5dd4b' to your desired color
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(newVal)=>setSettingTwo((prev)=>!prev)}
                                value={settingTwo}
                            />
                            </View>
                        </View>
                    </View>
                    )}
                    {settingOne == false &&
                    (<View style={{...styles.eventTileWrapper,borderColor:"#2e2e2e"}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:scaleFont(20),color:"gray",textDecorationColor:"#656565",textDecorationLine:"underline"}}>Map Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText,color:"gray", fontSize:scaleFont(16),}}>Switch on to have your post appear on the Map for friends to find.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                            <View style={styles.eventButtonWrapper}>
                            </View>
                        </View>
                    </View>
                    )}
                    { (settingTwo == true && settingOne==true && userData.settings.privateProfile == true) &&
                    (<View style={{...styles.eventTileWrapper,borderColor:`${settingThree?currentEvent.skillColor:"#656565"}`}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch on to make post visible to the Global Feed & Map.</Text>
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
                    { (settingTwo == true && settingOne == true && userData.settings.privateProfile == false) &&
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
                    { (settingTwo == false && settingOne == true && userData.settings.privateProfile == true) &&
                    (<View style={{...styles.eventTileWrapper,borderColor:"#2e2e2e"}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,color:"gray",fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText,color:"gray", fontSize:scaleFont(16),}}>Switch on to make post visible to the Global Feed & Map.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>

                        </View>
                    </View>
                    )}
                    { (settingTwo == false && userData.settings.privateProfile == false) &&
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
                    {utilityType=="camera"&&(
                    <TouchableOpacity onPress={handleCameraPostSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.skillColor}`}}>
                        <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Log your {currentEvent.skillTitle} Experience</Text>
                    </TouchableOpacity>
                    )}
                    {utilityType=="log"&&(
                    <TouchableOpacity onPress={handleLogPostSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.skillColor}`}}>
                        <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Log your {currentEvent.skillTitle} Experience</Text>
                    </TouchableOpacity>
                    )}
                    
                </View>
                <View style={{height:200,}} />
            </ScrollView>
            {cameraActiveBool==true&&(
                <CameraPage setCameraImageURL={setCameraImageURL} setCameraActiveBool={setCameraActiveBool} cameraImageState={cameraImageState} setCameraImageState={setCameraImageState} />
            )}
          
        </Modal>
    )
}

export default ExperienceUploader