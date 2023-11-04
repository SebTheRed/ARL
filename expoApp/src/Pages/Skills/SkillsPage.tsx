import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';

import { useEffect, useState } from 'react';
import styles from '../../styles'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import EventTile from './EventTile'
import {useUserData} from '../../Contexts/UserDataContext'
import {useCurrentTraitStat} from '../../Contexts/CurrentTraitStat'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useLastPage } from '../../Contexts/LastPageContext';
import {useUID} from '../../Contexts/UIDContext'
import { useGameRules } from '../../Contexts/GameRules';
import {scaleFont} from '../../Utilities/fontSizing'
import FamilySVG from '../../IconBin/SkillIcons/family_1.svg'
import FriendsSVG from '../../IconBin/SkillIcons/friends_1.svg'
import FitnessSVG from '../../IconBin/SkillIcons/fitness_1.svg'
import EarthcraftSVG from '../../IconBin/SkillIcons/earthcraft_1.svg'
import CookingSVG from '../../IconBin/SkillIcons/cooking_1.svg'
import TechnologySVG from '../../IconBin/SkillIcons/technology_1.svg'
import GamesSVG from '../../IconBin/SkillIcons/games_3.svg'
import LanguageSVG from '../../IconBin/SkillIcons/language_2.svg'
import HumanitySVG from '../../IconBin/SkillIcons/humanity_2.svg'

type RootStackParamList = {
  SkillsMain:undefined,
  ExperienceUploader:undefined,
  UserStats:undefined,
}





////// JSX START FUN COMPONENT //////
const SkillsPage = (data:any):JSX.Element => {
const {name}:any = data.route
const {uid}:any = useUID()
const {setLastPage}:any = useLastPage()
const {setProfilePageUID}:any = useProfilePageUID()
const {userData}:any = useUserData()
const {setCurrentTraitTitle}:any = useCurrentTraitStat()
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const {skillsList, levelScale, experiencesList,dataLoading}:any = useGameRules()
const [skillData,setSkillData] = useState<any>({})
const [xpStats,setXpStats] = useState<any>({})

useEffect(()=>{
  if (dataLoading == false) {
    const lowerCaseSkillName = name.toLocaleLowerCase()
    setSkillData(skillsList[lowerCaseSkillName])
    console.log("matching skill data:", skillsList[lowerCaseSkillName])
    initXpStats(skillsList[lowerCaseSkillName])
    // console.log(experiencesList)
  }  
},[dataLoading])

const CurrentIcon = ()=> {
  switch(skillData.title){
    case "Family": return <FamilySVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Friends": return <FriendsSVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Fitness": return <FitnessSVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Earthcraft": return <EarthcraftSVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Cooking": return <CookingSVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Technology": return <TechnologySVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Games": return <GamesSVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Language": return <LanguageSVG width={scaleFont(50)} height={scaleFont(50)} />
    case "Humanity": return <HumanitySVG width={scaleFont(50)} height={scaleFont(50)} />
    default: return <></>
  }
}


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

const initXpStats = (matchingSkill:any) => {
  const currentXP = userData.xpData[matchingSkill.title.toLowerCase()]; // Assuming skillData.title is 'Family', 'Friends', etc.
  const currentLevel = calculateCurrentLevel(currentXP, levelScale); // Calculate current level
  const prevXP = levelScale[currentLevel];
  const nextXP = levelScale[currentLevel + 1];
  const xpBarWidth = calculateXPBarWidth(currentXP, prevXP, nextXP);
  const skillTitle = matchingSkill.title
  const matchingSkillXp = (userData.xpData[skillTitle.toLowerCase()]).toLocaleString()
  let xpNumber = {current:"0", next:"0"}
  for (const [lvl, xp] of Object.entries(levelScale) as [string,number][]){
    if (currentLevel.toString() == lvl) {
      xpNumber.current = (xp).toLocaleString();
      const calcPlusOne = (parseInt(lvl)+1).toString()
      xpNumber.next = (parseInt(levelScale[calcPlusOne])).toLocaleString() || "0"
    }
  }
  setXpStats({
    currentXP:currentXP,
    currentLevel:currentLevel,
    prevXP:prevXP,
    nextXP:nextXP,
    xpBarWidth:xpBarWidth,
    matchingSkillXp:matchingSkillXp,
    lastXpVal: xpNumber.current,
    nextXpVal: xpNumber.next
  })
  
}


const handlePress = () => { //REALLY SHOULD NOT USE ANY HERE
  navigation.navigate("SkillsMain");
}
const handleStatsPress = () => {
  setLastPage(skillData.title)
  setProfilePageUID(uid)
  setCurrentTraitTitle(skillData.title)
  navigation.navigate("UserStats");
}

// useEffect(()=>{
//   const findSkillByTitle = (title:string) => skillsLlist.find(skill => skill.title === title);
//   const result = findSkillByTitle(skillType)
//   setMatchingSkillData(result)
// },[])
if (dataLoading == false) {
  return(
    <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle}}>
          <TouchableOpacity onPress={()=>handlePress()} style={styles.backHeaderBar}>
            <Text style={styles.backHeaderText}>⇦Go Back</Text>
          </TouchableOpacity>
          <View style={{...styles.skillPageHeader, alignItems:"center", width:"100%"}}>
            <View style={styles.skillPageTitleBox}>
              <View style={styles.skillPageContentBox}>
                <CurrentIcon />
                <Text allowFontScaling={false} style={styles.skillPageTitle}> {skillData.title}</Text>
              </View>
              
              <Text allowFontScaling={false} style={styles.skillPageTitle}>{xpStats.currentLevel}/99</Text>
            </View>
            <View style={styles.skillPageXPContainer}>
              <View style={{...styles.skillPageXPBar,backgroundColor:"transparent"}}></View>
              <View style={{ ...styles.skillPageXPBar, backgroundColor: `${skillData.color||"#fff"}`, width: `${xpStats.xpBarWidth || 0}%` }} />
            </View>
            <View style={styles.skillPageXPBox}>
              <Text style={styles.skillPageXPText}>Prev: {xpStats.lastXpVal}</Text>
              <Text style={{...styles.skillPageXPText, fontWeight:"bold"}}>XP: {xpStats.matchingSkillXp}</Text>
              <Text style={styles.skillPageXPText}>Next: {xpStats.nextXpVal}</Text>
            </View>
            <TouchableOpacity onPress={handleStatsPress} style={{...styles.skillsStatsButton, backgroundColor:`${skillData.color || "#fff"}`}}>
              <Text style={{color:"#1c1c1c",fontSize:scaleFont(18)}}>Press here to view your {skillData.title} stats</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventTileBox}>
            <Text style={styles.skillPageTitle}>Post an Experience</Text>
            <Text style={styles.skillPageXPText}>Create a post to share with your friends!</Text>
            {Object.keys(experiencesList[name.toLowerCase()])
              .map((d: any) => experiencesList[name.toLowerCase()][d]) // Map to the actual objects
              .sort((a: any, b: any) => a.unlocksAt - b.unlocksAt) // Sort by unlocksAt in ascending order
              .map((entry: any, i: number) => {
                console.log(levelScale[entry.unlocksAt], userData.xpData[name.toLowerCase()]);
                if (levelScale[entry.unlocksAt] > userData.xpData[name.toLowerCase()]) {
                  return (
                    <EventTile skillTitle={name} locked={true} color={skillData.color || "#fff"} d={entry} key={i} />
                  );
                }
                return (
                  <EventTile skillTitle={name} locked={false} color={skillData.color || "#fff"} d={entry} key={i} />
                );
            })}
          </View>
    </ScrollView>
  )
} else {
  return(<View></View>)
}


}

export default SkillsPage