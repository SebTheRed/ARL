import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
  } from 'react-native';

import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import EventTile from './EventTile'
import {useUserData} from '../../Contexts/UserDataContext'
import {useCurrentTraitStat} from '../../Contexts/CurrentTraitStat'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useLastPage } from '../../Contexts/LastPageContext';
import {useUID} from '../../Contexts/UIDContext'
type SkillPageProps = PropsWithChildren<{
    route:any
}>
type RootStackParamList = {
  SkillsMain:undefined,
  ExperienceUploader:undefined,
  Stats:undefined,
}





////// JSX START FUN COMPONENT //////
const SkillsPage = ({route}:SkillPageProps):JSX.Element => {
const {uid}:any = useUID()
const {setLastPage}:any = useLastPage()
const {setProfilePageUID}:any = useProfilePageUID()
const {userData}:any = useUserData()
const {setCurrentTraitTitle}:any = useCurrentTraitStat()
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const {skillData, XPScale, XPTriggerEvents} = route.params;

const calculateXPBarWidth = (currentXP: number, prevXP: number, nextXP: number) => {
  const totalXPNeeded = nextXP - prevXP;
  const currentProgress = currentXP - prevXP;
  return (currentProgress / totalXPNeeded) * 100;
};
const calculateCurrentLevel = (currentXP: number, XPScale: any) => {
  let level = 1;
  for (const [lvl, xp] of Object.entries(XPScale) as [string,number][]) {
    if (currentXP >= xp) {
      level = parseInt(lvl);
    } else {
      break;
    }
  }
  return level;
};
const calculateXPInfo = (currentLevel:number) => {
  let xpNumber = {current:"0", next:"0"}
  for (const [lvl, xp] of Object.entries(XPScale) as [string,number][]){
    if (currentLevel.toString() == lvl) {
      xpNumber.current = (xp).toLocaleString();
      const calcPlusOne = (parseInt(lvl)+1).toString()
      xpNumber.next = (parseInt(XPScale[calcPlusOne])).toLocaleString() || "0"
    }
  }
  return xpNumber
}


const currentXP = userData.xpData[skillData.title.toLowerCase()]; // Assuming skillData.title is 'Family', 'Friends', etc.
const currentLevel = calculateCurrentLevel(currentXP, XPScale); // Calculate current level
const prevXP = XPScale[currentLevel];
const nextXP = XPScale[currentLevel + 1];
const xpBarWidth = calculateXPBarWidth(currentXP, prevXP, nextXP);
const skillTitle = skillData.title
const matchingSkillXp = (userData.xpData[skillTitle.toLowerCase()]).toLocaleString()
const sideXPVals = calculateXPInfo(currentLevel)

const handlePress = () => { //REALLY SHOULD NOT USE ANY HERE
  navigation.navigate("SkillsMain");
}
const handleStatsPress = () => {
  setLastPage(skillData.title)
  setProfilePageUID(uid)
  setCurrentTraitTitle(skillData.title)
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'AuthedApp', // The name of the root navigator's screen that contains the child navigators
          state: {
            routes: [
              {
                name: 'ProfileStack', // The name of the child navigator
                state:{
                  routes:[
                    {
                      name:'Stats'
                    }
                  ]
                }
              },
            ],
          },
        },
      ],
    })
  );
}

// useEffect(()=>{
//   const findSkillByTitle = (title:string) => skillsLlist.find(skill => skill.title === title);
//   const result = findSkillByTitle(skillType)
//   setMatchingSkillData(result)
// },[])
if (skillData) {
  return(
    <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle}}>
          <TouchableOpacity onPress={()=>handlePress()} style={styles.backHeaderBar}>
            <Text style={styles.backHeaderText}>⇦Go Back</Text>
          </TouchableOpacity>
          <View style={{...styles.skillPageHeader, alignItems:"center", width:"100%"}}>
            <View style={styles.skillPageTitleBox}>
              <Text style={styles.skillPageTitle}>{skillTitle}</Text>
              <Text style={styles.skillPageTitle}>{currentLevel}/99</Text>
            </View>
            <View style={styles.skillPageXPContainer}>
              <View style={{...styles.skillPageXPBar,backgroundColor:"transparent"}}></View>
              <View style={{ ...styles.skillPageXPBar, backgroundColor: skillData.color, width: `${xpBarWidth}%` }}></View>
            </View>
            <View style={styles.skillPageXPBox}>
              <Text style={styles.skillPageXPText}>PREV- {sideXPVals.current}</Text>
              <Text style={styles.skillPageXPText}>XP- {matchingSkillXp}</Text>
              <Text style={styles.skillPageXPText}>NEXT- {sideXPVals.next}</Text>
            </View>
            <TouchableOpacity onPress={handleStatsPress} style={{...styles.skillsStatsButton, backgroundColor:`${skillData.color}`}}>
              <Text style={{color:"#1c1c1c",fontSize:18}}>Press here to view your {skillData.title} stats</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventTileBox}>
            <Text style={styles.skillPageTitle}>Post an Experience</Text>
            <Text style={styles.skillPageXPText}>Press any of the experiences below to begin posting</Text>
            {Object.keys(XPTriggerEvents[skillTitle.toLowerCase()]).map((d:any,i:number)=>{
              return(<EventTile skillTitle={skillData.title} color={skillData.color} d={XPTriggerEvents[skillTitle.toLowerCase()][d]} key={i} />)
            })}
          </View>
        
    </ScrollView>
)
} else {
  return(<></>)
}

}

export default SkillsPage