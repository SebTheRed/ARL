import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
import {scaleFont} from '../../Utilities/fontSizing'

type RootStackParamList = {
    ExperienceUploader:undefined,
  }
const EventTile = ({d,locked, i, color,skillTitle, uid}:any):JSX.Element => {
    const {setCurrentEvent}:any = useCurrentEvent()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const returnImgRequire = () => {
    switch(d.type){
        case "api": return(require('../../IconBin/api.png'))
        case "camera": return(require('../../IconBin/camera.png'))
        case "log": return(require('../../IconBin/log.png'))
        case "acceleration": return(require('../../IconBin/acceleration.png'))
        case "timeline": return(require('../../IconBin/timeline.png'))
    }
}

const handlePress = async() => {
    // console.log(d)
    setCurrentEvent({...d,"skillTitle":skillTitle, "skillColor":color,})
    navigation.navigate("ExperienceUploader")
    
    
}
    

if (locked == false) {
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
                    <Image style={{...styles.eventButtonIcon}} source={returnImgRequire()} />
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
                    <Image style={{...styles.eventButtonIcon}} source={require("../../IconBin/lock.png")} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
    
}

export default EventTile