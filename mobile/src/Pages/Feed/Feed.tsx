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
	//currentFeed holds a sorted array of posts. Sorted or not.
	//This value is called from FeedContext.tsx
	const { currentFeed, refreshFeed, paginateFeed }:any = useFeed();

	//CHANGE THIS OUT ONCE WE SET UP FIREBASE TO INITIALIZE GAME RULES.
	const { skillsList } = route.params;

	//A simple refresh state just to the app actually changess after the reload.
	const [refreshing, setRefreshing] = useState(false);

	//A function that simple toggles the switch of the refreshing state.
	//The immportant thing here is the await call. Reason being is that we should WAIT until the feed is updated,
	//before updating the refreshing state. This ensures that the feed is always current when reloading, and prevent
	//any duplicate feed rendering.
	const handleRefresh = async () => {
	  setRefreshing(true);
	  await refreshFeed();
	//   setStartAfter(null)
	  setRefreshing(false);
	};
  
	//Simple function that runs when the FlatList reaches the bottom.
	//To learn more go to FeedContext.tsx
	const handleLoadMore = () => {
	  paginateFeed()
	};
  

	const FeedHeader = ():JSX.Element => {
		return(
			<View>
			</View>
		)
	}

	//I will explain this in great detail, because this is one of the keystones of the app.
	//first, data={currentFeed}.. The data param is what is actually mapped over to create the FlatList.
	//second, renderItem.. The JSX return for each item of currentFeed that is rendered (mapped in my mind).
	//third, keyExtractor.. Instead of key={val}, FlatList uses an extractor for the key. Don't ask me why.
	//fourth, onEndReached.. This calls the handleLoadMore function, and triggers when the user has made it to the bottom of the FlatList.
	//fifth, onEndReachedThreshold.. ¯\_(ツ)_/¯ I really don't know how this works. But I know its necessary!!
	//sixth, refreshControl.. A func component that hosts the "loading" spinner. This triggers automatically thru FlatList.
	return (
	  <FlatList
		data={currentFeed}
		ListHeaderComponent={<FeedHeader />}
		renderItem={({ item }) => <FeedPost skillsList={skillsList} data={item} />}
		keyExtractor={item => item.id.toString()}
		style={styles.feedFlatList}
		contentContainerStyle={{ alignItems: 'center' }}
		onEndReached={handleLoadMore}
		onEndReachedThreshold={0.1}
		scrollEventThrottle={150}
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