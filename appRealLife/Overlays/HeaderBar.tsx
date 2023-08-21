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
import styles from '../styles';


////// COMPONENT FUNCTION BEGINNING //////
const HeaderBar = ():JSX.Element => {
return(
  <View style={styles.headerBar}>
		<Image style={styles.headerBarIcon} source={require('../IconBin/settings.png')} />
		<Text style={styles.headerBarText}>appRealLife</Text>
		<Image style={styles.headerBarIcon} source={require('../IconBin/hamburger.png')} />
	</View>
)
}

export default HeaderBar