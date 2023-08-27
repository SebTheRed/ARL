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

const Profile = ({route}:any):JSX.Element=>{
    const {uid} = route.params;
    return(
        <View><Text>Profile</Text></View>
    )
}

export default Profile