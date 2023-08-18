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
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import styles from '../styles'
type RootStackParamList = {
	Profile: undefined;
	Map: undefined;
	Skills: undefined;
	Stats: undefined;
	Trophies: undefined;
  };
const BottomBar = ():JSX.Element => {

  // 2. Use the useNavigation hook with the type
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 3. Update the handlePress function
  const handlePress = (val: keyof RootStackParamList) => {
    navigation.navigate(val);
  }


	return(
		<View style={styles.bottomBar}>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Profile")}>
				<Image source={require('../IconBin/account.png')} />
				<Text>Profile</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Map")}>
				<Image source={require('../IconBin/travel.png')} />
				<Text>Map</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Skills")}>
				<Image source={require('../IconBin/addChart.png')} />
				<Text>Skills</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Stats")}>
				<Image source={require('../IconBin/areaChart.png')} />
				<Text>Stats</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Trophies")}>
				<Image source={require('../IconBin/trophy.png')} />
				<Text>Trophies</Text>
			</TouchableOpacity>
				
		</View>
	)
}

export default BottomBar