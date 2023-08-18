import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
} from 'react-native';

// import account from './account.png'

import styles from '../styles'
const BottomBar = ():JSX.Element => {
	return(
		<View style={styles.bottomBar}>
			<View style={styles.bottomBarIconBox}>
				<Image source={require('../IconBin/account.png')} />
				<Text>Account</Text>
			</View>
			<View style={styles.bottomBarIconBox}>
				<Image source={require('../IconBin/travel.png')} />
				<Text>Map</Text>
			</View>
			<View style={styles.bottomBarIconBox}>
				<Image source={require('../IconBin/addChart.png')} />
				<Text>Skills</Text>
			</View>
			<View style={styles.bottomBarIconBox}>
				<Image source={require('../IconBin/areaChart.png')} />
				<Text>Stats</Text>
			</View>
			<View style={styles.bottomBarIconBox}>
				<Image source={require('../IconBin/trophy.png')} />
				<Text>Trophies</Text>
			</View>
				
		</View>
	)
}

export default BottomBar