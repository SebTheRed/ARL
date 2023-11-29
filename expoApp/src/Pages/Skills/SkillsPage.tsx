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
import BackArrow from '../../IconBin/svg/back_arrow.svg'

type RootStackParamList = {
  SkillsMain:undefined,
  ExperienceUploader:undefined,
  UserStats:undefined,
}





////// JSX START FUN COMPONENT //////
const SkillsPage = (data:any):JSX.Element => {
const {name}:any = data.route
const {setLastPage}:any = useLastPage()
const {userData}:any = useUserData()
const {setCurrentTraitTitle}:any = useCurrentTraitStat()
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const {gameRules}:any = useGameRules()
const [skillData,setSkillData] = useState<any>({})
const [xpStats,setXpStats] = useState<any>({})

useEffect(()=>{
    const lowerCaseSkillName = name.toLocaleLowerCase()
    setSkillData(gameRules.skillsList[lowerCaseSkillName])
    console.log("matching skill data:", gameRules.skillsList[lowerCaseSkillName])
    initXpStats(gameRules.skillsList[lowerCaseSkillName])
    // console.log(experiencesList)
},[])

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
  const currentLevel = calculateCurrentLevel(currentXP, gameRules.levelScale); // Calculate current level
  const prevXP = gameRules.levelScale[currentLevel];
  const nextXP = gameRules.levelScale[currentLevel + 1];
  const xpBarWidth = calculateXPBarWidth(currentXP, prevXP, nextXP);
  const skillTitle = matchingSkill.title
  const matchingSkillXp = (userData.xpData[skillTitle.toLowerCase()]).toLocaleString()
  let xpNumber = {current:"0", next:"0"}
  for (const [lvl, xp] of Object.entries(gameRules.levelScale) as [string,number][]){
    if (currentLevel.toString() == lvl) {
      xpNumber.current = (xp).toLocaleString();
      const calcPlusOne = (parseInt(lvl)+1).toString()
      xpNumber.next = (parseInt(gameRules.levelScale[calcPlusOne])).toLocaleString() || "0"
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


const handlePress = () => { 
  navigation.navigate("SkillsMain");
}
const handleStatsPress = () => {
  setLastPage(skillData.title)
  setCurrentTraitTitle(skillData.title)
  navigation.navigate("UserStats");
}

// useEffect(()=>{
//   const findSkillByTitle = (title:string) => skillsLlist.find(skill => skill.title === title);
//   const result = findSkillByTitle(skillType)
//   setMatchingSkillData(result)
// },[])
  return(
    <>
    <TouchableOpacity onPress={()=>handlePress()} style={styles.backHeaderBar}>
          <BackArrow width={scaleFont(20)} height={scaleFont(20)} />
            <Text style={styles.backHeaderText}>Go Back</Text>
          </TouchableOpacity>
    <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle}}>
          
          <View style={{...styles.skillPageHeader, alignItems:"center", width:"100%"}}>
            <View style={styles.skillPageTitleBox}>
              <View style={styles.skillPageContentBox}>
                <CurrentIcon />
                <Text allowFontScaling={false} style={styles.skillPageTitle}> {skillData.title}</Text>
              </View>
              <View style={{flexDirection:"row",alignItems:"baseline"}}>
                <Text allowFontScaling={false} style={styles.skillPageTitle}>Level: </Text>
                <Text allowFontScaling={false} style={styles.skillPageTitle}>{xpStats.currentLevel}</Text>
              </View>
              
            </View>
            <View style={styles.skillPageXPContainer}>
              <View style={{...styles.skillPageXPBar,backgroundColor:"transparent"}}></View>
              <View style={{ ...styles.skillPageXPBar, backgroundColor: `${skillData.color||"#fff"}`, width: `${xpStats.xpBarWidth || 0}%` }} />
            </View>
            <View style={styles.skillPageXPBox}>
              <Text style={styles.skillPageXPText}>Prev: {xpStats.lastXpVal}</Text>
              <Text style={{...styles.skillPageXPText, fontWeight:"bold"}}>EXP: {xpStats.matchingSkillXp}</Text>
              <Text style={styles.skillPageXPText}>Next: {xpStats.nextXpVal}</Text>
            </View>
            <TouchableOpacity onPress={handleStatsPress} style={{...styles.skillsStatsButton, backgroundColor:`${skillData.color || "#fff"}`}}>
              <Text style={{color:"#1c1c1c",fontSize:scaleFont(18)}}>Press here to view your {skillData.title} stats</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventTileBox}>
            <Text style={styles.skillPageTitle}>Post an Experience</Text>
            <Text style={styles.skillPageXPText}>Create a post to share with your friends!</Text>
            {Object.keys(gameRules.experiencesList[name.toLowerCase()])
              .map((d) => gameRules.experiencesList[name.toLowerCase()][d]) // Map to the actual objects
              // Adjust the sorting function
              .sort((a, b) => {
                // Entries with a non-empty lockedBy come after those with an empty lockedBy
                if (a.lockedBy && !b.lockedBy) {
                  return 1;
                } else if (!a.lockedBy && b.lockedBy) {
                  return -1;
                }
                // If both have lockedBy or both are empty, then sort by unlocksAt
                return a.unlocksAt - b.unlocksAt;
              })
              .map((entry, i) => {
                console.log(gameRules.levelScale[entry.unlocksAt], userData.xpData[name.toLowerCase()]);
                // Determine if locked based on lockedBy or levelScale
                let isLocked
                if (entry.lockedBy != "") {
                  isLocked = true
                  //LOGIC FOR CHECKING IF TROPHY SKILL IS UNLOCKED IS HERE.
                } else {
                  isLocked = gameRules.levelScale[entry.unlocksAt] > userData.xpData[name.toLowerCase()];
                }

                return (
                  <EventTile skillTitle={name} locked={!!isLocked} color={skillData.color || "#fff"} d={entry} key={i} />
                );
            })}
          </View>
    </ScrollView>
    </>
  )


}

export default SkillsPage