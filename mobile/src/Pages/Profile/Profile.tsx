import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
// import FeedPost from './FeedPost';
import styles from '../../styles'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';

const Profile = ():JSX.Element => {
    const {matchingProfileData}:any = useProfilePageUID()
    useEffect(()=>{
        console.log(matchingProfileData)
    },[])
    return(<View></View>)
}