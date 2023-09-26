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
  const trophyImageMap = {
    "Titan of Steel": require('../../IconBin/TrophyPNG/goblet1.png'),
    "Fleetfooted Fanatic": require('../../IconBin/TrophyPNG/gem1.png'),
    "Yoga Yogi": require('../../IconBin/TrophyPNG/simple1.png'),
    "Chef of the Year": require('../../IconBin/TrophyPNG/star3.png'),
    "3D Modeling Maniac": require('../../IconBin/TrophyPNG/simple4.png'),
    "Can't Pause This Game": require('../../IconBin/TrophyPNG/gem5.png'),
    "Book Worm": require('../../IconBin/TrophyPNG/elegant4.png'),
    "Gallery Guru": require('../../IconBin/TrophyPNG/gem6.png'),
    "Checking In": require('../../IconBin/TrophyPNG/pedistal2.png'),
    "Game of Life": require('../../IconBin/TrophyPNG/simple3.png'),
    "Hands of Bronze": require('../../IconBin/TrophyPNG/gem7.png'),
    "Stillness of Mind": require('../../IconBin/TrophyPNG/star8.png'),
    "Lost in Nature": require('../../IconBin/TrophyPNG/goblet3.png'),
    "Of The Earth": require('../../IconBin/TrophyPNG/shield4.png'),
    "Nature's Steward": require('../../IconBin/TrophyPNG/person2.png'),
    "Nature's Friend": require('../../IconBin/TrophyPNG/person3.png'),
    "Golden Devotion": require('../../IconBin/TrophyPNG/number1.png'),
    "Exercise Enthusiast": require('../../IconBin/TrophyPNG/star1.png'),
    "Cooking Connoisseur": require('../../IconBin/TrophyPNG/simple3.png'),
    "Code Crusader": require('../../IconBin/TrophyPNG/elegant3.png'),
    "Curriculum Contributor": require('../../IconBin/TrophyPNG/person4.png'),
    "Hard Work > Talent": require('../../IconBin/TrophyPNG/simple5.png'),
    "The Grind": require('../../IconBin/TrophyPNG/gem4.png'),
    "Social Butterfly": require('../../IconBin/TrophyPNG/mirror2.png'),
    "Civic Duty": require('../../IconBin/TrophyPNG/steering1.png'),
    "Life on The Road": require('../../IconBin/TrophyPNG/star6.png'),
    "Eyes of Silver": require('../../IconBin/TrophyPNG/star7.png'),
    "Finding Nature": require('../../IconBin/TrophyPNG/star9.png'),
    "Nature's Agent": require('../../IconBin/TrophyPNG/star9.png'),
    "Sisyphus' Prized Work": require('../../IconBin/TrophyPNG/pedistal1.png'),
    "Mountain Climber": require('../../IconBin/TrophyPNG/gem2.png'),
    "Martial Master": require('../../IconBin/TrophyPNG/elegant2.png'),
    "26.2": require('../../IconBin/TrophyPNG/gem3.png'),
    "Iron Chef": require('../../IconBin/TrophyPNG/shield1.png'),
    "Family Feast": require('../../IconBin/TrophyPNG/star2.png'),
    "Bearing FAANGs": require('../../IconBin/TrophyPNG/star4.png'),
    "Digital Playground": require('../../IconBin/TrophyPNG/gear.png'),
    "Gotta Go Fast": require('../../IconBin/TrophyPNG/number2.png'),
    "All Star": require('../../IconBin/TrophyPNG/shield2.png'),
    "Globe Trotter": require('../../IconBin/TrophyPNG/simple6.png'),
    "Family Reunion": require('../../IconBin/TrophyPNG/star5.png'),
    "Voice of Gold": require('../../IconBin/TrophyPNG/person1.png'),
    "Decoration of Space": require('../../IconBin/TrophyPNG/gem8.png'),
    "One with Nature": require('../../IconBin/TrophyPNG/star10.png'),
    "Butchers & Shepherds": require('../../IconBin/TrophyPNG/shield3.png'),
  };
  const imgSource = trophyImageMap[d.title];
    const [panelState,setPanelState]=useState(false);

    return(
        <TouchableOpacity onPress={()=>{setPanelState(!panelState)}} style={styles.trophyBox}>
						
            {panelState == false && (
                <>
                    <Text style={styles.trophyText}>{d.title}</Text>
                    <Image style={styles.trophyIcon} source={imgSource} />
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