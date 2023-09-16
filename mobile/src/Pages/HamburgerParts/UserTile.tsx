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
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import styles from '../../styles';
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
type RootStackParamList = {
	Profile:undefined,
}
const UserTile = ({userDoc, XPScale, skillsList}:any):JSX.Element => {
    const {findPageUserID, }:any = useProfilePageUID()
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
      
    return(
        <TouchableOpacity onPress={handlePress} style={{...styles.sectionContainer, width:"100%"}}>
            <View style={styles.sectionProfPicContainer}>
                <Image style={styles.sectionProfPic} source={{uri:profilePicState}} />
            </View>
            <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{userDoc.userName}</Text>
                <Text style={styles.sectionDescription}>{userDoc.name}</Text>
                
            </View>
            <View style={{...styles.sectionLevelBox, backgroundColor:highestColor}}>
                <View style={styles.offsetWrapper}>
                </View>
                <Text style={{...styles.borderedTextShadow, color: 'black',}}>{highestSkillLevel}</Text>
                <Text style={{...styles.borderedText, color: 'white' }}>{highestSkillLevel}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default UserTile