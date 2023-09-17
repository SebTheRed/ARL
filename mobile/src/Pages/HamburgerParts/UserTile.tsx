import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import {doc,getDoc,updateDoc,deleteDoc} from 'firebase/firestore'
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import {db, auth,} from '../../Firebase/firebase'
import styles from '../../styles';
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useUID } from '../../Contexts/UIDContext';
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import {useFriends} from '../../Contexts/FriendsContext'
type RootStackParamList = {
	Profile:undefined,
}
const UserTile = ({userDoc, XPScale, skillsList, type}:any):JSX.Element => {
    const {findPageUserID, }:any = useProfilePageUID()
    const {uid}:any = useUID()
    const {setFriendsRefresh,friendsRefresh}:any = useFriends()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLoading,setIsLoading] = useState(true)
    const [profilePicState,setProfilePicState] = useState<any>(null)
    const [highestSkillLevel,setHighestSkillLevel] = useState(0)
    const [highestColor,setHighestColor] = useState("")
    

    useEffect(()=>{
        const translateURL = async () => {
            setIsLoading(true); // Set loading state to true before fetching
            const storage = getStorage();
            const pathRef = ref(storage, userDoc.picURL);
            const profilePicUrl = await getDownloadURL(pathRef);
            setProfilePicState(profilePicUrl);
            setIsLoading(false); // Set loading state to false after fetching
        };
        translateURL()
        const { highestSkill, highestXP } = findHighestXP();
        console.log(highestSkill)
        const highestLevel = convertXPToLevel(highestXP, XPScale);
        let upperTitle = highestSkill.charAt(0).toUpperCase()
        let cappedTitle = upperTitle + highestSkill.slice(1)
        console.log(cappedTitle)
        skillsList.map((skill:any,i:number)=>{
            if (skill.title == cappedTitle) {
                setHighestColor(skill.color)
            }
        })
        setHighestSkillLevel(highestLevel)

    },[])

    const findHighestXP = () => {
        let highestXP = 0;
        let highestSkill = '';
        
        for (const [skill, xp] of Object.entries(userDoc.xpData)) {
          if (xp > highestXP) {
            highestXP = xp;
            highestSkill = skill;
          }
        }
        
        return { highestSkill, highestXP };
      };
      
      // Function to convert XP to Level
      const convertXPToLevel = (xp, XPScale) => {
        let level = 0;
        
        for (const [lvl, lvlXP] of Object.entries(XPScale)) {
          if (xp >= lvlXP) {
            level = lvl;
          } else {
            break;
          }
        }
        
        return level;
      };

      const handlePress =()=>{
            findPageUserID(userDoc.uid)
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'AuthedApp', // The name of the root (after login root)
                      state: {
                        routes: [
                          {
                            name: 'ProfileStack', // The name of the page we're navigating to.
                          },
                        ],
                      },
                    },
                  ],
                })
              );
        
      }

  const handleAccept = async() => {
    const sortedUIDString = [uid, userDoc.uid].sort().join('_'); 
    const docRef = doc(db, "friendships", sortedUIDString);
    await updateDoc(docRef, {
      pending:false,
    })
    console.log("ACCEPTED !")
    setFriendsRefresh(!friendsRefresh)
  }
  const handleDeny = async() => {
    const sortedUIDString = [uid, userDoc.uid].sort().join('_'); 
    const docRef = doc(db, "friendships", sortedUIDString);
    await deleteDoc(docRef)
    console.log("ACCEPTED !")
    setFriendsRefresh(!friendsRefresh)
  }
      
    return(
        <TouchableOpacity onPress={handlePress} style={{...styles.sectionContainer, width:"90%"}}>
            <View style={styles.sectionProfPicContainer}>
                <Image style={styles.sectionProfPic} source={{uri:profilePicState}} />
            </View>
            <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{userDoc.userName}</Text>
                <Text style={styles.sectionDescription}>{userDoc.name}</Text>
                
            </View>
            {type=="pending"&&(
              <View style={{flexDirection:"column",width:80}}>
                <TouchableOpacity onPress={handleAccept} style={{...styles.sectionLevelBox, backgroundColor:"green",height:"45%", width:70,justifyContent:"space-evenly", margin:2.5}}>
                  <Text style={{color:"#fff", fontWeight:"bold"}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeny} style={{...styles.sectionLevelBox, backgroundColor:"red",height:"45%",width:70,justifyContent:"space-evenly", margin:2.5}}>
                  <Text style={{color:"#fff", fontWeight:"bold"}}>Deny</Text>
                </TouchableOpacity>
              </View>
            )}
            {!type&&(
              <View style={{...styles.sectionLevelBox, backgroundColor:highestColor}}>
                <View style={styles.offsetWrapper}></View>
                <Text style={{...styles.borderedTextShadow, color: 'black',}}>{highestSkillLevel}</Text>
                <Text style={{...styles.borderedText, color: 'white' }}>{highestSkillLevel}</Text>
            </View>
            )}
            
        </TouchableOpacity>
    )
}
export default UserTile