import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import styles from '../styles';

import { useUID } from '../Contexts/UIDContext';
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import { useProfilePageUID } from '../Contexts/ProfilePageUID';
import { useUserData } from '../Contexts/UserDataContext';
import {useNotifications} from '../Contexts/NotificationsContext'
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import {useHamburgerBar} from '../Contexts/HamburgerBarContext'
import Hamburger from '../IconBin/svg/hamburger.svg'
import { scaleFont } from '../Utilities/fontSizing';

type RootStackParamList = {
	Profile:undefined,
}
////// COMPONENT FUNCTION BEGINNING //////
const HeaderBar = ():JSX.Element => {
	const {uid}:any = useUID()
	const {findPageUserID,refreshProfileFeed}:any = useProfilePageUID()
  const {activeNotif}:any = useNotifications()
	const {userData}:any = useUserData()
	const {setHamburgerToggle}:any = useHamburgerBar()
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [profilePicState,setProfilePicState] = useState<any>(null)
	// const [isLoading,setIsLoading] = useState<any>()


useEffect(()=>{
	const translateURL = async () => {
		// setIsLoading(true); // Set loading state to true before fetching
		const storage = getStorage();
		const pathRef = ref(storage, userData.picURL);
		const profilePicUrl = await getDownloadURL(pathRef);
		console.log("header image promise")
		setProfilePicState(profilePicUrl);
		// setIsLoading(false); // Set loading state to false after fetching
	};
	translateURL()
},[])

const handleHamburgerPress = () => {
	setHamburgerToggle((prev:boolean)=>!prev)
}

const handleProfilePress = () => {
  refreshProfileFeed()
	findPageUserID(uid)
	navigation.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [
			{
				name: 'AuthedApp', // Navigate back to the root of the app (not technically root, but the app after login.)
				state: {
				routes: [
					{
					name: 'ProfileStack', // The name of the page to navigate to, within the AuthedApp.
					},
				],
				},
			},
			],
		})
		);
	}



return(
  <View style={styles.headerBar}>
		<TouchableOpacity onPress={handleHamburgerPress} style={styles.headerProfilePicContainer}>
			<Hamburger width={scaleFont(45)} height={scaleFont(45)} />
      {activeNotif && <View style={styles.notificationDot} />}
		</TouchableOpacity>
		<Text style={styles.headerBarText}>App Real Life</Text>
		<TouchableOpacity style={styles.headerProfilePicContainer} onPress={handleProfilePress}>
			{profilePicState && (
				<Image style={{...styles.headerBarProfilePic}} source={{uri: profilePicState}} />
			)}
			
		</TouchableOpacity>
	</View>
)
}



export default HeaderBar