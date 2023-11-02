import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useUID } from '../Contexts/UIDContext';
import { useProfilePageUID } from '../Contexts/ProfilePageUID';
import { useFeed } from '../Contexts/FeedContext';
import styles from '../styles'
// import SvgImage from 'expo-svg-uri';

type RootStackParamList = {
	Feed: undefined;
	Map: undefined;
	Skills: undefined;
	Stats: undefined;
	Trophies: undefined;
	Admin:undefined,
  };

////// COMPONENT FUNCTION BEGINNING //////
const BottomBar = ():JSX.Element => {
const {uid}:any = useUID()
const {matchingProfileData, profilePageUID, setProfilePageUID, setMatchingProfileData}:any = useProfilePageUID()
const {feedButtonHandler}:any = useFeed()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (val: keyof RootStackParamList) => {
    navigation.navigate(val);
	setProfilePageUID(null)
  }


	return(
		<View style={styles.bottomBar}>

			
			{/* <TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Map")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/travel.png')} />
				<Text style={styles.bottomBarText}>Map</Text>
			</TouchableOpacity> */}
			{/* <TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("People")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/friends.png')} />
				<Text style={styles.bottomBarText}>People</Text>
			</TouchableOpacity> */}
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>{
				handlePress("Feed")
				feedButtonHandler()
			}}>
				{/* <SvgImage style={styles.bottomBarIcon} source={require('../IconBin/svg/feed.svg')} /> */}
				<Text style={styles.bottomBarText}>Feed</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Skills")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/addChart.png')} />
				<Text style={styles.bottomBarText}>Traits</Text>
			</TouchableOpacity>
			
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Trophies")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/trophy.png')} />
				<Text style={styles.bottomBarText}>Trophies</Text>
			</TouchableOpacity>
			{uid=="vUVmF04zA9hYXsZc8YIiPPtP7BZ2" && (
				<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Admin")}>
					<Image style={styles.bottomBarIcon} source={require('../IconBin/api.png')} />
					<Text style={styles.bottomBarText}>Admin</Text>
				</TouchableOpacity>
			)}

			
				
		</View>
	)
}

export default BottomBar