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
import styles from '../styles'
import type {PropsWithChildren} from 'react';

// type trophyProps = PropsWithChildren<{
    
// }>

const Trophies = ({route}:any):JSX.Element => {
    const { trophyData } = route.params;
		// console.log(trophyList)

	return(
		<ScrollView horizontal={true} style={styles.backgroundStyle}>
			<View style={styles.trophyBoxWrapper}>
			{trophyData.map((d:any,i:number)=>{
				return(
					<View key={i} style={styles.trophyBox}>
						<Text>{d.title}</Text>
						<Image style={styles.bottomBarIcon} source={d.imgPath} />
					</View>
				)
			})}
			</View>
			
				
		</ScrollView>
	)
}

export default Trophies