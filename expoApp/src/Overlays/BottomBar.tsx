import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useUID } from '../Contexts/UIDContext';
import { useProfilePageUID } from '../Contexts/ProfilePageUID';
import { useFeed } from '../Contexts/FeedContext';
import styles from '../styles'
import Feed from '../IconBin/svg/feed.svg'
import AddChart from '../IconBin/svg/addChart.svg'
import Trophy from '../IconBin/svg/trophy.svg'
import API from '../IconBin/svg/api.svg'
import { scaleFont } from '../Utilities/fontSizing';

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
				<Feed width={scaleFont(45)} height={scaleFont(45)} />
				<Text style={styles.bottomBarText}>Feed</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Skills")}>
				<AddChart width={scaleFont(45)} height={scaleFont(45)} />
				<Text style={styles.bottomBarText}>Traits</Text>
			</TouchableOpacity>
			
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Trophies")}>
				<Trophy width={scaleFont(45)} height={scaleFont(45)} />
				<Text style={styles.bottomBarText}>Trophies</Text>
			</TouchableOpacity>
			{uid=="vUVmF04zA9hYXsZc8YIiPPtP7BZ2" && (
				<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Admin")}>
					<API width={scaleFont(45)} height={scaleFont(45)} />
					<Text style={styles.bottomBarText}>Admin</Text>
				</TouchableOpacity>
			)}

			
				
		</View>
	)
}

export default BottomBar