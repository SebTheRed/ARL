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
import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';

const EventTile = ({d, i, color, uid}:any):JSX.Element => {
    return(
        <TouchableOpacity style={styles.eventTileWrapper}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{...styles.eventTileText,fontSize:24,textDecorationColor:"#656565",textDecorationLine:"underline"}}>{d.title}</Text>
                <Text style={{...styles.eventTileText, color:color}}>XP + {d.xp}</Text>
            </View>
            <Text style={styles.eventTileText}>{d.desc}</Text>
            
        </TouchableOpacity>
    )
}

export default EventTile