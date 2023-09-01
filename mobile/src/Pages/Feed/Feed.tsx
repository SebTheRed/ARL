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
	const { currentFeed, refreshFeed }:any = useFeed();
	const { skillsList } = route.params;
	const [refreshing, setRefreshing] = useState(false);
  
	const handleRefresh = async () => {
	  setRefreshing(true);
	  await refreshFeed();
	  setRefreshing(false);
	};
  
	const handleLoadMore = () => {
	  refreshFeed();
	};
  
	return (
	  <FlatList
		data={currentFeed}
		renderItem={({ item }) => <FeedPost skillsList={skillsList} data={item} />}
		keyExtractor={item => item.id}
		style={styles.feedFlatList}
		contentContainerStyle={{ alignItems: 'center' }}
		refreshing={refreshing}
		onRefresh={handleRefresh}
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