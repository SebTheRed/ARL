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
	Animated,
	FlatList,
	RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react'
import UserTile from './UserTile';
import styles from '../../styles';
import { useFriends } from '../../Contexts/FriendsContext';
import { useGameRules } from '../../Contexts/GameRules';

const Friends = ():JSX.Element => {
	const { levelScale,skillsList}:any = useGameRules()
	const {trueFriends,pendingFriends,trueFriendDocs,pendingFriendDocs,friendsRefresh,setFriendsRefresh}:any = useFriends()
	const [currentList,setCurrentList] = useState<any>()
	const [currentRequests,setCurrentRequests] = useState<any>()
	const [chosenTab,setChosenTab] = useState<boolean>(false)
	const [refreshing,setRefreshing] = useState<boolean>(false)

	useEffect(()=>{
		// console.log("These are my friends uids: ", trueFriends)
		// console.log("These are my friends docs: ", trueFriendDocs)
		// console.log("These are my pending uids: ", pendingFriends)
		// console.log("These are my pending docs: ", pendingFriendDocs)
	},[friendsRefresh])

	const handleRefresh=async()=>{
		setRefreshing(true)
		await setFriendsRefresh((prev:boolean)=>!prev)
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
				data={trueFriendDocs}
				keyExtractor={(item)=>item.uid}
                renderItem={({item})=>< UserTile skillsList={skillsList} XPScale={levelScale} userDoc={item} key={item.uid} />}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.userTileContainer}
                scrollEventThrottle={150}
				/>
			)}
			{chosenTab==false&&(
				<FlatList 
				data={pendingFriendDocs}
                renderItem={({item})=>< UserTile skillsList={skillsList} type={"pending"} XPScale={levelScale} userDoc={item} key={item.uid} />}
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

		</View>
    )
}

export default Friends