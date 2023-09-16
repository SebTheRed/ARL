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
import React, { useEffect, useState } from 'react'
import styles from '../../styles';

const Friends = ():JSX.Element => {

	const [chosenTab,setChosenTab] = useState<boolean>(true)

    return(
        <View style={styles.peoplePageContainer}>
			<View style={styles.choiceTabContainer}>
				<TouchableOpacity onPress={()=>setChosenTab(true)} style={{...styles.choiceTabTab, backgroundColor:`${chosenTab==true?"#fff":"#1c1c1c"}`}}>
					<Text style={{...styles.choiceTabLabel, color:`${chosenTab==true?"#1c1c1c":"#fff"}`}}>List</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>setChosenTab(false)} style={{...styles.choiceTabTab, backgroundColor:`${chosenTab==false?"#fff":"#1c1c1c"}`}}>
					<Text style={{...styles.choiceTabLabel, color:`${chosenTab==false?"#1c1c1c":"#fff"}`}}>Requests</Text>
				</TouchableOpacity>
			</View>

			
		</View>
    )
}

export default Friends