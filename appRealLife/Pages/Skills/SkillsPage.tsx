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
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import EventTile from './EventTile'
type SkillPageProps = PropsWithChildren<{
    route:any
}>
type RootStackParamList = {
  SkillsMain:undefined,
}





////// JSX START FUN COMPONENT //////
const SkillsPage = ({route}:SkillPageProps):JSX.Element => {
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const {skillData, playerData, XPScale, XPTriggerEvents} = route.params;

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


const currentXP = playerData.xp[skillData.title.toLowerCase()]; // Assuming skillData.title is 'Family', 'Friends', etc.
const currentLevel = calculateCurrentLevel(currentXP, XPScale); // Calculate current level
const prevXP = XPScale[currentLevel];
const nextXP = XPScale[currentLevel + 1];
const xpBarWidth = calculateXPBarWidth(currentXP, prevXP, nextXP);
const skillTitle = skillData.title
const matchingSkillXp = (playerData.xp[skillTitle.toLowerCase()]).toLocaleString()
const sideXPVals = calculateXPInfo(currentLevel)

const handlePress = () => { //REALLY SHOULD NOT USE ANY HERE
  navigation.navigate("SkillsMain");
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
          <View style={{alignItems:"center", width:"100%"}}>
            <View style={styles.skillPageTitleBox}>
              <Text style={styles.skillPageTitle}>{skillTitle}</Text>
              <Text style={styles.skillPageTitle}>{currentLevel}/99</Text>
            </View>
            <View style={styles.skillPageXPContainer}>
              <View style={{...styles.skillPageXPBar,backgroundColor:"transparent"}}></View>
              <View style={{ ...styles.skillPageXPBar, backgroundColor: skillData.color, width: `${xpBarWidth}%` }}></View>
            </View>
            <View style={styles.skillPageXPBox}>
              <Text style={styles.skillPageXPText}>{sideXPVals.current}</Text>
              <Text style={styles.skillPageXPText}>{matchingSkillXp}</Text>
              <Text style={styles.skillPageXPText}>{sideXPVals.next}</Text>
            </View>
          </View>
          <View>
            {Object.keys(XPTriggerEvents[skillTitle.toLowerCase()]).map((d:any,i:number)=>{
              return(<EventTile d={d} key={i} />)
            })}
          </View>
        
    </ScrollView>
)
} else {
  return(<></>)
}

}

export default SkillsPage