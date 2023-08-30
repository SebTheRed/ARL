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
  } from 'react-native';
  import React from 'react'
  import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
  import { NavigationRouteContext, useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {db, auth,} from '../../Firebase/firebase'
import {setDoc,doc} from 'firebase/firestore'
import { useUserData } from '../../Contexts/UserDataContext';
import LinearGradient from 'react-native-linear-gradient';
import { useUID } from '../../Contexts/UIDContext';
import Geolocation from '@react-native-community/geolocation';

type RootStackParamList = {
    SkillsPage:undefined,
}
const ExperienceUploader = ():JSX.Element => {
    const {currentEvent, setCurrentEvent}:any = useCurrentEvent()
    const {uid}:any = useUID()
    const [utilityType,setUtilityType] = useState("")
    const [text, setText] = useState('');
    const [settingOne,setSettingOne] = useState(true)
    const [settingTwo,setSettingTwo] = useState(false)
    const [settingThree,setSettingThree] = useState(false)

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
    const getGeoLocation = () => {
        return new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              reject(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        });
      };
    const handlePostSubmit = async() => {
        
        let timeStamp = generateTimestamp()
        if (text.length>15) {     
            const postObj = {
                posterUID:uid,
                postSkill:currentEvent.skillTitle,
                eventTitle:currentEvent.title,
                xp:currentEvent.xp,
                score:0,
                geoTag:{latitude:0,longitude:0},
                timeStamp:timeStamp,
                textLog:text,
                publicPost:settingOne,
                mapPost:settingTwo,
                globalPost:settingThree,
            }
            if (settingOne == true) {postObj.geoTag = await getGeoLocation() as { latitude: number; longitude: number };;}
            try {
                await setDoc(doc(db, "posts", `${uid}_${timeStamp}`),postObj)
                .then(()=>console.log("Post Success!"))
            } catch(err){
                console.error("Post failed to post",err)
            }
        } else {
            console.warn("LOG MUST BE AT LEAST 16 CHARACTERS")
        }
        
    }

    const LogAction = ():JSX.Element => {
        return(<Text>Log</Text>)
    }
    const ApiAction = ():JSX.Element => {
        return(<Text>Api</Text>)
    }
    const CameraAction = ():JSX.Element => {
        return(<Text>Camera</Text>)
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
            case "log": return(<LogAction />)
            case "acceleration": return(<AccelerationAction />)
            case "timeline": return(<TimelineAction />)
            default:return(<LogAction />)
        }
    }

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={true}>
            <View style={{...styles.expUploaderTop}}>
                <TouchableOpacity onPress={()=>handleGoBack()} style={styles.closeUploaderButton}>
                    <Text style={styles.backHeaderText}>⇦Go Back</Text>
                </TouchableOpacity>
                <View style={{...styles.actionBox,backgroundColor:''}}>
                    {/* This is where the camera button/start run button / etc would be */}
                </View>
                <View style={{...styles.logContainer}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                        <Text style={{...styles.loginlabel}}>Write a log of the experience:</Text>
                        <Text style={{...styles.loginlabel, color:`${(text.length === 256)?"red":"white"}`}}>{text.length} / 256</Text>
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
                        maxLength={256}
                    />
                    
                </View>
                <View style={{...styles.togglesContainer,}}>
                    <View style={{...styles.eventTileWrapper,borderColor:`${settingOne?currentEvent.skillColor:"#656565"}`}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Friends Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:16,}}>Switch off to hide post from friends. Disabling any additional XP from their Upvotes.</Text>
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
                                <Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Map Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:16,}}>Switch on to have your post appear on the Map for friends to find.</Text>
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
                                <Text style={{...styles.eventTileText,fontSize:20,color:"gray",textDecorationColor:"#656565",textDecorationLine:"underline"}}>Map Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText,color:"gray", fontSize:16,}}>Switch on to have your post appear on the Map for friends to find.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                            <View style={styles.eventButtonWrapper}>
                            </View>
                        </View>
                    </View>
                    )}
                    { settingTwo == true &&
                    (<View style={{...styles.eventTileWrapper,borderColor:`${settingThree?currentEvent.skillColor:"#656565"}`}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText, fontSize:16,}}>Switch on to make post visible to the Global Feed & Map. Post delayed one hour for privacy.</Text>
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
                    { settingTwo == false &&
                    (<View style={{...styles.eventTileWrapper,borderColor:"#2e2e2e"}}>
                        <View style={{...styles.eventTileMain}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{...styles.eventTileText,color:"gray",fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Post</Text>
                            </View>
                            <Text style={{...styles.eventTileText,color:"gray", fontSize:16,}}>Switch on to make post visible to the Global Feed & Map. Post delayed one hour for privacy.</Text>
                        </View>
                        <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>

                        </View>
                    </View>
                    )}
                    
                </View>
                <View style={{alignItems:"center", width:"100%"}}>
                    <TouchableOpacity onPress={handlePostSubmit} style={{...styles.loginbutton, width:"95%", backgroundColor:`${currentEvent.skillColor}`}}>
                        <Text style={{...styles.loginbuttonText,color:"#1c1c1c",}}>Log your {currentEvent.skillTitle} Experience</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
          
        </Modal>
    )
}

export default ExperienceUploader