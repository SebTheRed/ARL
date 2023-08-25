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
	Feed: undefined;
	Map: undefined;
	Skills: undefined;
	Stats: undefined;
	Trophies: undefined;
  };

////// COMPONENT FUNCTION BEGINNING //////
const BottomBar = ():JSX.Element => {

  // 2. Use the useNavigation hook with the type
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 3. Update the handlePress function
  const handlePress = (val: keyof RootStackParamList) => {
    navigation.navigate(val);
  }


	return(
		<View style={styles.bottomBar}>

			
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Map")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/travel.png')} />
				<Text style={styles.bottomBarText}>Map</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Feed")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/feed.png')} />
				<Text style={styles.bottomBarText}>Feed</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Skills")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/addChart.png')} />
				<Text style={styles.bottomBarText}>Traits</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Stats")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/areaChart.png')} />
				<Text style={styles.bottomBarText}>Stats</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBarIconBox} onPress={()=>handlePress("Trophies")}>
				<Image style={styles.bottomBarIcon} source={require('../IconBin/trophy.png')} />
				<Text style={styles.bottomBarText}>Trophies</Text>
			</TouchableOpacity>
			
				
		</View>
	)
}

export default BottomBar