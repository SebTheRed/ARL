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
const Feed = ({route}:any):JSX.Element => {
	const {currentFeed,refreshFeed}:any = useFeed()
	const {skillsList} = route.params;
	const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshFeed(); // Call the refresh function from the context
    setRefreshing(false);
  };
	console.log(currentFeed)
    return(
        <FlatList
			data={currentFeed}
			renderItem={({item})=><FeedPost skillsList={skillsList} data={item}/>}
			keyExtractor={item => item.id}
			style={styles.feedFlatList}
			contentContainerStyle={{ alignItems: 'center' }}
			refreshing={refreshing} // Add this line
      		onRefresh={handleRefresh} // Add this line
		/>
    )
}
export default Feed