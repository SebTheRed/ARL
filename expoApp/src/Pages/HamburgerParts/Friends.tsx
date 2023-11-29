import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react'
import UserTile from './UserTile';
import styles from '../../styles';
import { useFriends } from '../../Contexts/FriendsContext';
import { useGameRules } from '../../Contexts/GameRules';
import { scaleFont } from '../../Utilities/fontSizing';

const Friends = ():JSX.Element => {
	const { gameRules}:any = useGameRules()
	const {friendsData,refreshFriendsList}:any = useFriends()
	const [chosenTab,setChosenTab] = useState<boolean>(false)
	const [refreshing,setRefreshing] = useState<boolean>(false)

	const handleRefresh=async()=>{
		setRefreshing(true)
		await refreshFriendsList()
		setRefreshing(false)
	}

    return(
        <View style={styles.peoplePageContainer}>
			<View style={styles.choiceTabContainer}>
				<TouchableOpacity onPress={()=>setChosenTab(false)} style={{...styles.choiceTabTab, backgroundColor:`${chosenTab==false?"#fff":"#1c1c1c"}`}}>
					<Text style={{...styles.choiceTabLabel, color:`${chosenTab==false?"#1c1c1c":"#fff"}`}}>Requests</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>setChosenTab(true)} style={{...styles.choiceTabTab, backgroundColor:`${chosenTab==true?"#fff":"#1c1c1c"}`}}>
					<Text style={{...styles.choiceTabLabel, color:`${chosenTab==true?"#1c1c1c":"#fff"}`}}>List</Text>
				</TouchableOpacity>
			</View>
			{chosenTab==true&&(
				<FlatList 
				data={friendsData.trueFriendDocs}
				keyExtractor={(item)=>item.uid}
        renderItem={({item})=>< UserTile skillsList={gameRules.skillsList} XPScale={gameRules.levelScale} userDoc={item} key={item.uid} />}
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.userTileContainer}
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
			{(chosenTab==false && friendsData.pendingFriendDocs.length > 0)&&(
				<FlatList 
				data={friendsData.pendingFriendDocs}
        renderItem={({item})=>< UserTile skillsList={gameRules.skillsList} type={"pending"} XPScale={gameRules.levelScale} userDoc={item} key={item.uid} />}
				keyExtractor={(item)=>item.uid}
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.userTileContainer}
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
      {(chosenTab==false && friendsData.pendingFriendDocs.length <= 0)&&(
				<FlatList 
				data={[{id:"whoCares"}]}
        renderItem={({item})=>
        <View>
          <View style={{height:30}} />
          <Text style={{color:"#656565", fontSize:scaleFont(20)}}>Pull down to refresh friend requests...</Text>
        </View>
      }
				keyExtractor={(item)=>item.id}
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.userTileContainer}
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

		</View>
    )
}

export default Friends