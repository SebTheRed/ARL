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
    d:{
        title:string,
        imgPath:any,
        tier:string,
        desc:string,
        progressQTY:number,
        unlocked:boolean,
    }
}>

const TrophyBox = ({d}:TrophyBoxProps):JSX.Element => {

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
                    <Text style={{...styles.trophyText,textAlign:"left"}}>{d.desc}</Text>
                    {/* <Image style={styles.trophyIcon} source={d.imgPath} /> */}
                    <View>
                        <Text style={{...styles.trophyText}} > Progress:</Text>
                        <Text style={{...styles.trophyText}} >0 / {d.progressQTY}</Text>
                    </View>
                </>
            )}
        </TouchableOpacity>
    )
}

export default TrophyBox