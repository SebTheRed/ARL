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
	FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react'
import UserTile from './UserTile';
import styles from '../../styles';
import { useFriends } from '../../Contexts/FriendsContext';

const Friends = ({route}:any):JSX.Element => {
	const { XPScale,skillsList} = route.params;
	const {trueFriends,pendingFriends,trueFriendDocs,pendingFriendDocs,}:any = useFriends()
	const [currentList,setCurrentList] = useState<any>()
	const [currentRequests,setCurrentRequests] = useState<any>()
	const [chosenTab,setChosenTab] = useState<boolean>(false)

	useEffect(()=>{
		console.log("These are my friends uids: ", trueFriends)
		console.log("These are my friends docs: ", trueFriendDocs)
		console.log("These are my pending uids: ", pendingFriends)
		console.log("These are my pending docs: ", pendingFriendDocs)
	},[])

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
                renderItem={({item})=>< UserTile skillsList={skillsList} XPScale={XPScale} userDoc={item} key={item.uid} />}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.userTileContainer}
                scrollEventThrottle={150}
				/>
			)}
			{chosenTab==false&&(
				<FlatList 
				data={pendingFriendDocs}
                renderItem={({item})=>< UserTile skillsList={skillsList} XPScale={XPScale} userDoc={item} key={item.uid} />}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.userTileContainer}
                scrollEventThrottle={150}
				/>
			)}

		</View>
    )
}

export default Friends