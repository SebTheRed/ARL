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
import React from 'react'
import styles from '../styles';
import { useProfilePageUID } from '../Contexts/ProfilePageUID';
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	Profile:undefined,
}
////// COMPONENT FUNCTION BEGINNING //////
const HeaderBar = ():JSX.Element => {
	const {uid}:any = useUID()
	const {findPageUserID}:any = useProfilePageUID()
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
						name: 'Profile', // The name of the page to navigate to, within the AuthedApp.
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
			<Image style={styles.headerBarIcon} source={require('../IconBin/account.png')} />
		</TouchableOpacity>
	</View>
)
}



export default HeaderBar