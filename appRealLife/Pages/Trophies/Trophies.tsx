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
import styles from '../../styles'
import type {PropsWithChildren,} from 'react';
import {useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrophyBox from './TrophyBox';

// type trophyProps = PropsWithChildren<{
    
// }>

const Trophies = ({route}:any):JSX.Element => {
const { trophyData } = route.params;
const [panelState,setPanelState]=useState(false);
		// console.log(trophyList)

	return(
		<ScrollView horizontal={true} style={{...styles.backgroundStyle}}>
			<View style={{...styles.trophyBoxWrapper, paddingTop:5}}>
			{trophyData.map((d:any,i:number)=>{
				return(<TrophyBox d={d} key={i}/>)
			})}
			</View>
			
				
		</ScrollView>
	)
}

export default Trophies