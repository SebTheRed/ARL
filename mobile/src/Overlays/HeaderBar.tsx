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
} from 'react-native';
import { useUID } from '../Contexts/UIDContext';
import React, { useEffect, useState } from 'react'
import styles from '../styles';
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import { useProfilePageUID } from '../Contexts/ProfilePageUID';
import { useUserData } from '../Contexts/UserDataContext';
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import {useHamburgerBar} from '../Contexts/HamburgerBarContext'

type RootStackParamList = {
	Profile:undefined,
}
////// COMPONENT FUNCTION BEGINNING //////
const HeaderBar = ():JSX.Element => {
	const {uid}:any = useUID()
	const {findPageUserID}:any = useProfilePageUID()
	const {userData}:any = useUserData()
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [profilePicState,setProfilePicState] = useState<any>(null)
	const [sideBarState,setSideBarState] = useState<boolean>()
	const [isLoading,setIsLoading] = useState<any>()
	const [menuWidth] = useState(new Animated.Value(-250)); // Initial hidden position


useEffect(()=>{
	const translateURL = async () => {
		setIsLoading(true); // Set loading state to true before fetching
		const storage = getStorage();
		const pathRef = ref(storage, userData.picURL);
		const profilePicUrl = await getDownloadURL(pathRef);
		console.log("header image promise")
		setProfilePicState(profilePicUrl);
		setIsLoading(false); // Set loading state to false after fetching
	};
	translateURL()
},[])

const handleHamburgerPress = () => {
	openMenu()
}

const handleProfilePress = () => {
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

const HamburgerSideBar = ():JSX.Element => {
	return(
		<Animated.View style={[styles.menu, { left: menuWidth }]}>
			<TouchableOpacity onPress={closeMenu} style={styles.closeSideBar}>
			<Text style={styles.closeText}>Close</Text>
			</TouchableOpacity>
			{/* Your menu items here */}
			<Text style={styles.menuItem}>Item 1</Text>
			<Text style={styles.menuItem}>Item 2</Text>
			<Text style={styles.menuItem}>Item 3</Text>
		</Animated.View>
	)
}
const openMenu = () => {
    Animated.timing(menuWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuWidth, {
      toValue: -250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

return(
  <View style={styles.headerBar}>
		<TouchableOpacity onPress={handleHamburgerPress} style={styles.headerProfilePicContainer}>
			<Image style={styles.headerBarIcon} source={require('../IconBin/hamburger.png')} />
		</TouchableOpacity>
		<Text style={styles.headerBarText}>appRealLife</Text>
		<TouchableOpacity style={styles.headerProfilePicContainer} onPress={handleProfilePress}>
			{profilePicState && (
				<Image style={{...styles.headerBarProfilePic}} source={{uri: profilePicState}} />
			)}
			
		</TouchableOpacity>
	</View>
)
}



export default HeaderBar