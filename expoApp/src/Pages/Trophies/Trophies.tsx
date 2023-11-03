import {
    ScrollView,
    View,
  } from 'react-native';
import styles from '../../styles'
import React, {useState} from 'react';
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
				{[
					Object.values(trophyData).map((tier: any) => 
						Object.values(tier).map((data:any, index:number) => 
							<TrophyBox d={data} key={Math.random()}/>
						)
					).flat()
				]}
			</View>    
		</ScrollView>
	)
}

export default Trophies