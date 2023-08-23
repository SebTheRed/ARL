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
  } from 'react-native';
import {useState} from 'react'
import styles from '../../styles';
import type {PropsWithChildren} from 'react';

type TrophyBoxProps = PropsWithChildren<{
    title:string,
    imgPath:any,
    tier:string,
    desc:string,
}>

const TrophyBox = ({d}:any):JSX.Element => {

    const [panelState,setPanelState]=useState(false);

    return(
        <TouchableOpacity onPress={()=>{setPanelState(!panelState)}} style={styles.trophyBox}>
						
            {panelState == false && (
                <>
                    <Text style={styles.trophyText}>{d.title}</Text>
                    <Image style={styles.trophyIcon} source={d.imgPath} />
                </>
            )}
            {panelState == true && (
                <>
                    <Text style={styles.trophyText}>{d.desc}</Text>
                    {/* <Image style={styles.trophyIcon} source={d.imgPath} /> */}
                </>
            )}
        </TouchableOpacity>
    )
}

export default TrophyBox