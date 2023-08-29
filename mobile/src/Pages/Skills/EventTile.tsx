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
import {useCurrentEvent} from '../../Contexts/CurrentEventContext'

const EventTile = ({d, i, color, uid}:any):JSX.Element => {
    const {setCurrentEvent}:any = useCurrentEvent()

const returnImgRequire = () => {
    switch(d.type){
        case "api": return(require('../../IconBin/api.png'))
        case "camera": return(require('../../IconBin/camera.png'))
        case "log": return(require('../../IconBin/log.png'))
        case "acceleration": return(require('../../IconBin/acceleration.png'))
        case "timeline": return(require('../../IconBin/timeline.png'))
    }
}

const handlePress = () => {
    console.log(d)
    // setCurrentEvent({
    //     type:d.type,
    //     objKeyId:"",
    // })
}
    


    return(
        <TouchableOpacity onPress={handlePress} style={styles.eventTileWrapper}>
            <View style={{...styles.eventTileMain}}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{...styles.eventTileText,fontSize:24,textDecorationColor:"#656565",textDecorationLine:"underline"}}>{d.title}</Text>
                </View>
                <Text style={styles.eventTileText}>{d.desc}</Text>
            </View>
            <View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
                <View style={styles.eventButtonWrapper}>
                    <Text style={{...styles.eventButtonText, fontSize:15, color: `${color}`, fontWeight:"bold"}}>XP+ {d.xp}</Text>
                    <Image style={{...styles.eventButtonIcon}} source={returnImgRequire()} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default EventTile