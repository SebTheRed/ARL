import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react'
  import { useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {useUserData} from '../../Contexts/UserDataContext'
import {useUID} from '../../Contexts/UIDContext'


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



function Skills({route}:SkillsProps): JSX.Element {
  const {userData}:any = useUserData()
  const {uid}:any = useUID()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { skillsList, XPScale,} = route.params;

  useEffect(()=>{
    // console.log("userData", userData)
    // console.log("uid", uid)
  },[userData,uid])
  


  const handlePress = (val:any) => { //REALLY SHOULD NOT USE ANY HERE
    navigation.navigate(val);
  }
  
  const calculateCurrentLevel = (skillName: string, XPScale: any) => {
    const currentXP = userData.xpData[skillName]; // Assuming skillData.title is 'Family', 'Friends', etc.
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

 // Calculate current level


function Section({children, title, flare}: SectionProps): JSX.Element {
  // console.log(children)

  return(
  <View></View>
  )
}
const SkillTile = ({title,flare, color,level}:SkillTileProps): JSX.Element => {
  const currentLevel = calculateCurrentLevel(title.toLowerCase(), XPScale);
  return(
    <TouchableOpacity onPress={()=>{handlePress(title)}} style={styles.sectionContainer}>
      <View style={styles.sectionTextContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>{flare}</Text>
        
      </View>
      <View style={{...styles.sectionLevelBox, backgroundColor:color}}>
        <View style={styles.offsetWrapper}>
        </View>
        <Text style={{...styles.borderedTextShadow, color: 'black',}}>{currentLevel}</Text>
        <Text style={{...styles.borderedText, color: 'white' }}>{currentLevel}</Text>
      </View>
    </TouchableOpacity>
  )
}


    return(
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
            <View>
              {skillsList.map((d:any,i:number)=>{
                return(<SkillTile title={d.title} color={d.color} level={d.level} flare={d.flare} key={i}/>)
              })}
            </View>
      </ScrollView>
    )
}

export default Skills