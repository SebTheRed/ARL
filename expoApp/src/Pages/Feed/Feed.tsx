import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	RefreshControl
} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
import FeedPost from './FeedPost';
import TrophyPost from './TrophyPost';
import styles from '../../styles'
import { useGameRules } from '../../Contexts/GameRules';
import { useUserData } from '../../Contexts/UserDataContext';

const Feed = () => {
	//currentFeed holds a sorted array of posts. Sorted or not.
	//This value is called from FeedContext.tsx
	const { friendsFeed,globalFeed, refreshFeed, paginateFeed, paginateFriends }:any = useFeed();
  const {userLevels}:any = useUserData()
	//A simple refresh state just to the app actually changess after the reload.
	const [refreshing, setRefreshing] = useState(false);
  const [feedTypeBool,setFeedTypeBool] = useState(false);

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
  const handleLoadMoreFriends = () => {
    paginateFriends()
  }

	const FeedHeader = ():JSX.Element => {
		return(
			<View>
			</View>
		)
	}

  const FeedPostSplitter = ({data, voteLock}:any):JSX.Element => {
    // console.log("DATA BEING PASSED THRU FEED POST SPLITTER", data.type)
    if (data.type == "trophy") {
      return(<TrophyPost data={data} voteLock={voteLock} />)
    } else {
      return(<FeedPost data={data} voteLock={voteLock} />)
    }
  }
	//I will explain this in great detail, because this is one of the keystones of the app.
	//first, data={currentFeed}.. The data param is what is actually mapped over to create the FlatList.
	//second, renderItem.. The JSX return for each item of currentFeed that is rendered (mapped in my mind).
	//third, keyExtractor.. Instead of key={val}, FlatList uses an extractor for the key. Don't ask me why.
	//fourth, onEndReached.. This calls the handleLoadMore function, and triggers when the user has made it to the bottom of the FlatList.
	//fifth, onEndReachedThreshold.. ¯\_(ツ)_/¯ I really don't know how this works. But I know its necessary!!
	//sixth, refreshControl.. A func component that hosts the "loading" spinner. This triggers automatically thru FlatList.
	return (
    <>
    <View style={{height:30, backgroundColor:"#1c1c1c"}}>
      <View style={{height:"100%",
      borderBottomWidth:2,
      borderLeftWidth:2,borderRightWidth:2,
      borderColor:"#fff",
      flexDirection:"row",justifyContent:"space-evenly"}} >
        <TouchableOpacity onPress={()=>setFeedTypeBool(false)}
        style={{
          flex: 1,
          backgroundColor: !feedTypeBool ? 'white' : '#1c1c1c',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{color: !feedTypeBool ? '#1c1c1c' : '#fff', fontWeight: "bold"}}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setFeedTypeBool(true)}
        style={{
          flex: 1,
          backgroundColor: feedTypeBool ? 'white' : '#1c1c1c',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{color: feedTypeBool ? '#1c1c1c' : '#fff',fontWeight: "bold"}}>Global</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    {!feedTypeBool&&(
      <FlatList
        data={friendsFeed}
        ListHeaderComponent={<FeedHeader />}
        renderItem={({ item }) => <FeedPostSplitter voteLock={(userLevels.totalLevel >= 11 ? false : true)} data={item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.feedFlatList}
        contentContainerStyle={{ alignItems: 'center' }}
        onEndReached={handleLoadMoreFriends}
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
    )}
    {feedTypeBool&&(
      <FlatList
        data={globalFeed}
        ListHeaderComponent={<FeedHeader />}
        renderItem={({ item }) => <FeedPostSplitter voteLock={(userLevels.totalLevel >= 11 ? false : true)} data={item} />}
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
    )}
    </>
	  
	);
  };
  
  export default Feed;