import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
  import React from 'react'
import styles from '../styles'

const Stats = ({route}:any):JSX.Element => {
    const {uid} = route.params;
    return(
        <View><Text>Stats</Text></View>
    )
} 

export default Stats