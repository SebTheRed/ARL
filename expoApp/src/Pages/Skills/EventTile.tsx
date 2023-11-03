import {
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles'
import { scaleFont } from '../../Utilities/fontSizing';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
import {useGameRules} from '../../Contexts/GameRules'
import {useCooldowns} from '../../Contexts/CooldownContext'

import ApiSVG from '../../IconBin/svg/api.svg'
import LogSVG from '../../IconBin/svg/log.svg'
import CameraSVG from '../../IconBin/svg/camera_add.svg'
import TimelineSVG from '../../IconBin/svg/timeline.svg'
import CooldownSVG from '../../IconBin/svg/cooldown.svg'
import LockSVG from '../../IconBin/svg/lock.svg'


type RootStackParamList = {
    ExperienceUploader:undefined,
  }
const EventTile = ({d,locked, i, color,skillTitle, uid}:any):JSX.Element => {
    const {skillsList}:any = useGameRules()
    const {cooldowns,cooldownsLoading}:any = useCooldowns()
    const {setCurrentEvent}:any = useCurrentEvent()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [cooldownTime,setCooldownTime] = useState<number>(0)

useEffect(()=>{
    determineCooldown()
},[])

useEffect(()=>{
    if (cooldownsLoading == false) {
        // console.log("cooldowns",cooldowns)
        Object.keys(cooldowns).forEach((key:any)=>{
            if(d.title == key) {
                console.log('COOLDOWN MATCH')
                setCooldownTime(cooldowns[d.title])
            }
        })
    }
},[cooldownsLoading])

const SVGSwitch = () => {
    switch(d.type){
        case "api": return(<ApiSVG width={scaleFont(45)} height={scaleFont(45)} />)
        case "camera": return(<CameraSVG width={scaleFont(45)} height={scaleFont(45)} />)
        case "log": return(<LogSVG width={scaleFont(45)} height={scaleFont(45)} />)
        case "acceleration": return(<LogSVG width={scaleFont(45)} height={scaleFont(45)} />)
        case "timeline": return(<TimelineSVG width={scaleFont(45)} height={scaleFont(45)} />)
    }
}

const handlePress = async() => {
    // console.log(d)
    setCurrentEvent({...d,"skillTitle":skillTitle, "skillColor":color,})
    navigation.navigate("ExperienceUploader")   
}

const determineCooldown = () => {
    const coolDownHours = d.cooldown
    console.log(coolDownHours)
}
const convertHoursToDHM = (hours:number) => {
    const totalMinutes = hours * 60;
    const days = Math.floor(totalMinutes / 1440);
    const remainingMinutesAfterDays = totalMinutes % 1440;
    const hoursInMinutes = Math.floor(remainingMinutesAfterDays / 60);
    const minutes = Math.round(remainingMinutesAfterDays % 60);

    let result = "";
    if (days > 0) result += `${days} Day${days > 1 ? 's' : ''} `;
    if (hoursInMinutes > 0) result += `${hoursInMinutes} Hour${hoursInMinutes > 1 ? 's' : ''} and `;
    if (minutes > 0) result += `${minutes} Minute${minutes > 1 ? 's' : ''}`;

    return result.trim();
}



if (cooldownTime>0) {
    return(
        <TouchableOpacity style={styles.eventTileWrapper}>
            <View style={{...styles.eventTileMain}}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{...styles.eventTileText,fontSize:scaleFont(24),textDecorationColor:"#656565",textDecorationLine:"underline", color:"#656565"}}>{d.title}</Text>
                </View>
                <Text style={{...styles.eventTileText, color:color}}>On cooldown: {convertHoursToDHM(cooldownTime)}</Text>
            </View>
            <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                <View style={styles.eventButtonWrapper}>
                    <CooldownSVG width={scaleFont(45)} height={scaleFont(45)} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
else if (locked == false) {
    return(
        <TouchableOpacity onPress={handlePress} style={styles.eventTileWrapper}>
            <View style={{...styles.eventTileMain}}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{...styles.eventTileText,fontSize:scaleFont(24),textDecorationColor:"#656565",textDecorationLine:"underline"}}>{d.title}</Text>
                </View>
                <Text style={styles.eventTileText}>{d.desc}</Text>
            </View>
            <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                <View style={styles.eventButtonWrapper}>
                    <Text style={{...styles.eventButtonText, fontSize:scaleFont(15), color: `${color}`, fontWeight:"bold"}}>XP+ {d.xp}</Text>
                    <SVGSwitch />
                </View>
            </View>
        </TouchableOpacity>
    )
} else {
    return(
        <TouchableOpacity style={styles.eventTileWrapper}>
            <View style={{...styles.eventTileMain}}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{...styles.eventTileText,fontSize:scaleFont(24),textDecorationColor:"#656565",textDecorationLine:"underline", color:"#656565"}}>{d.title}</Text>
                </View>
                <Text style={{...styles.eventTileText, color:color}}>Unlocks at {skillTitle} level {d.unlocksAt}</Text>
            </View>
            <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                <View style={styles.eventButtonWrapper}>
                    <LockSVG width={scaleFont(45)} height={scaleFont(45)} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
    
}

export default EventTile