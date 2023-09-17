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
	const friendsUIDs:any = useFriends()
	const [currentList,setCurrentList] = useState<any>()
	const [currentRequests,setCurrentRequests] = useState<any>()
	const [chosenTab,setChosenTab] = useState<boolean>(true)

	useEffect(()=>{
		console.log("These are my friends: ", friendsUIDs)
	},[])

    return(
        <View style={styles.peoplePageContainer}>
			<View style={styles.choiceTabContainer}>
				<TouchableOpacity onPress={()=>setChosenTab(true)} style={{...styles.choiceTabTab, backgroundColor:`${chosenTab==true?"#fff":"#1c1c1c"}`}}>
					<Text style={{...styles.choiceTabLabel, color:`${chosenTab==true?"#1c1c1c":"#fff"}`}}>List</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>setChosenTab(false)} style={{...styles.choiceTabTab, backgroundColor:`${chosenTab==false?"#fff":"#1c1c1c"}`}}>
					<Text style={{...styles.choiceTabLabel, color:`${chosenTab==false?"#1c1c1c":"#fff"}`}}>Requests</Text>
				</TouchableOpacity>
			</View>
			{chosenTab==true&&(
				<FlatList 
				data={currentList}
                renderItem={({item})=>< UserTile skillsList={skillsList} XPScale={XPScale} userDoc={item} key={item.uid} />}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.userTileContainer}
                scrollEventThrottle={150}
				/>
			)}
			{chosenTab==false&&(
				<FlatList 
				data={currentRequests}
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