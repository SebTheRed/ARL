import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
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
            {trophyData.map((d:any,i:number)=>{
                return(
                    <View key={i} style={styles.trophyBox}>
											<Text>{d.title}</Text>
                    </View>
                )
            })}
            
        </ScrollView>
    )
}

export default Trophies