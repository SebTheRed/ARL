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
import { useUID } from '../Contexts/UIDContext';
import React, { useEffect, useState } from 'react'
import styles from '../styles';
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import { useProfilePageUID } from '../Contexts/ProfilePageUID';
import { useUserData } from '../Contexts/UserDataContext';
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	Profile:undefined,
}
////// COMPONENT FUNCTION BEGINNING //////
const HeaderBar = ():JSX.Element => {
	const {uid}:any = useUID()
	const {findPageUserID}:any = useProfilePageUID()
	const {userData}:any = useUserData()
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [profilePicState,setProfilePicState] = useState(null)

useEffect(()=>{
	const translateURL = async () => {
		const storage = getStorage()
		const pathRef = ref(storage, userData.picURL)
		getDownloadURL(pathRef)
		.then((url:any)=>{setProfilePicState(url)})
	};
	translateURL()
})

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

return(
  <View style={styles.headerBar}>
		<Image style={styles.headerBarIcon} source={require('../IconBin/hamburger.png')} />
		<Text style={styles.headerBarText}>appRealLife</Text>
		<TouchableOpacity onPress={handleProfilePress}>
			{profilePicState && (
				<Image style={{...styles.headerBarProfilePic}} source={{uri: profilePicState}} />
			)}
			
		</TouchableOpacity>
	</View>
)
}



export default HeaderBar