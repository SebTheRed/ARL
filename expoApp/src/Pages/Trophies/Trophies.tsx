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
import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrophyBox from './TrophyBox';
import { useGameRules } from '../../Contexts/GameRules';

// type trophyProps = PropsWithChildren<{
    
// }>

const Trophies = ():JSX.Element => {
const { trophyData }:any = useGameRules()
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