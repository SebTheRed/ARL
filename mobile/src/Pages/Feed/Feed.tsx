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
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
import FeedPost from './FeedPost';
import styles from '../../styles'
const Feed = ():JSX.Element => {
	const {currentFeed}:any = useFeed()
	console.log(currentFeed)
    return(
        <FlatList
			data={currentFeed}
			renderItem={({item})=><FeedPost data={item}/>}
			keyExtractor={item => item.id}
			style={styles.feedFlatList}
			contentContainerStyle={{ alignItems: 'center' }}
		/>
    )
}
export default Feed