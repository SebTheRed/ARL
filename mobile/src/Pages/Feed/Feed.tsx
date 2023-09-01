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
import FeedPost from './FeedPost';
import styles from '../../styles'
const Feed = ({ route }:any) => {
	const { currentFeed, refreshFeed, paginateFeed }:any = useFeed();
	const { skillsList } = route.params;
	const [refreshing, setRefreshing] = useState(false);
  
	const handleRefresh = async () => {
	  setRefreshing(true);
	  await refreshFeed();
	  setRefreshing(false);
	};
  
	const handleLoadMore = () => {
	  paginateFeed()
	};
  
	return (
	  <FlatList
		data={currentFeed}
		renderItem={({ item }) => <FeedPost skillsList={skillsList} data={item} />}
		keyExtractor={item => item.id.toString()}
		style={styles.feedFlatList}
		contentContainerStyle={{ alignItems: 'center' }}
		onEndReached={handleLoadMore}
		onEndReachedThreshold={0.1}
		refreshControl={
		  <RefreshControl
			refreshing={refreshing}
			onRefresh={handleRefresh}
			colors={['#FFF']}
			tintColor="#FFF"
		  />
		}
	  />
	);
  };
  
  export default Feed;