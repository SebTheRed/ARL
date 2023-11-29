import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react'
  import { useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {useUserData} from '../../Contexts/UserDataContext'
import { useGameRules } from '../../Contexts/GameRules';
import {useUID} from '../../Contexts/UIDContext'
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import { scaleFont } from '../../Utilities/fontSizing';

import FamilySVG from '../../IconBin/SkillIcons/family_1.svg'
import FriendsSVG from '../../IconBin/SkillIcons/friends_1.svg'
import FitnessSVG from '../../IconBin/SkillIcons/fitness_1.svg'
import EarthcraftSVG from '../../IconBin/SkillIcons/earthcraft_1.svg'
import CookingSVG from '../../IconBin/SkillIcons/cooking_1.svg'
import TechnologySVG from '../../IconBin/SkillIcons/technology_1.svg'
import GamesSVG from '../../IconBin/SkillIcons/games_3.svg'
import LanguageSVG from '../../IconBin/SkillIcons/language_2.svg'
import HumanitySVG from '../../IconBin/SkillIcons/humanity_2.svg'
import TotalSVG from '../../IconBin/SkillIcons/total_level.svg'



type SectionProps = PropsWithChildren<{
    title: string;
    flare: string;
  }>;
type SkillTileProps = PropsWithChildren<{
  title: string,
  level: number,
  color: string,
  flare: string,
}>;
type SkillsProps = PropsWithChildren<{
  route: any,
}>
type RootStackParamList = {
  Family: undefined,
  Friends: undefined,
  Agility: undefined,
  Strength: undefined,
  Earthcraft: undefined,
  Cooking: undefined,
  Coding: undefined,
  Gaming: undefined,
  Reading: undefined,
  Humanity: undefined,
}
////// FUNC COMPONENT START //////



function Skills(): JSX.Element {
  const {userData, userLevels}:any = useUserData()
  const {uid}:any = useUID()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { gameRules }:any = useGameRules()

  const [calcedLevels,setCalcedLevels] = useState<any>({
    family:0,
    friends:0,
    fitness:0,
    earthcraft:0,
    cooking:0,
    technology:0,
    games:0,
    language:0,
    humanity:0,
    totalLevel:0,
  })

  // useEffect(()=>{
  //   // const levels = calculateUserLevels(userData,gameRules.levelScale)
  //   setCalcedLevels(levels)
  //   console.log(levels)
  // },[])
  


  const handlePress = (val:any) => { //REALLY SHOULD NOT USE ANY HERE
    navigation.navigate(val);
  }
  
 // Calculate current level


const TotalLevelTile = ():JSX.Element => {
  return(
    <View style={styles.sectionContainer}>
      <View style={styles.sectionContentContainer}>
        <View style={styles.sectionIconContainer}>
          <TotalSVG width={scaleFont(50)} height={scaleFont(50)} />
        </View>
        <View style={styles.sectionTextContainer}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Total Level</Text>
          <Text allowFontScaling={false} style={styles.sectionDescription}>All - Human - Traits</Text>
          
        </View>
      </View>
      
      <View style={{...styles.sectionLevelBox, backgroundColor:"transparent"}}>
        <View style={styles.offsetWrapper}>
        </View>
        <Text allowFontScaling={false} style={{...styles.borderedText, color: '#fff' }}>{userLevels.totalLevel}</Text>
      </View>
    </View>
  )
}
 
const SkillTile = ({title,flare, color,level}:SkillTileProps): JSX.Element => {

  const CurrentIcon = ()=> {
    switch(title){
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

  return(
    <TouchableOpacity onPress={()=>{handlePress(title)}} style={styles.sectionContainer}>
      <View style={styles.sectionContentContainer}>
        <View style={styles.sectionIconContainer}>
          <CurrentIcon />
        </View>
        <View style={styles.sectionTextContainer}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>{title}</Text>
          <Text allowFontScaling={false} style={styles.sectionDescription}>{flare}</Text>
          
        </View>
      </View>
      
      <View style={{...styles.sectionLevelBox, backgroundColor:color}}>
        <View style={styles.offsetWrapper}>
        </View>
        <Text allowFontScaling={false} style={{...styles.borderedTextShadow, color: 'black',}}>{userLevels[title.toLowerCase()]}</Text>
        <Text allowFontScaling={false} style={{...styles.borderedText, color: 'white' }}>{userLevels[title.toLowerCase()]}</Text>
      </View>
    </TouchableOpacity>
  )
}


return(
<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.backgroundStyle}>
    {gameRules.dataLoading ? (
      
      <LoadingOverlay text={"Loading Traits..."} isVisible={true} />
    ) : (
      <View>
        <TotalLevelTile />
        {Object.values(gameRules.skillsList)
          .sort((a: any, b: any) => a.order - b.order)
          .map((d: any, i: number) => {
            return (<SkillTile title={d.title} color={d.color} level={d.level} flare={d.flare} key={i+100000} />)
        })}
        
      </View>
    )}
  </ScrollView>
)
}

export default Skills