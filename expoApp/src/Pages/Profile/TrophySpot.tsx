import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import styles from '../../styles'
import React, {useState,useEffect} from 'react';
import ICONS from '../Trophies/TrophyIcons';
import { scaleFont } from '../../Utilities/fontSizing';


const TrophySpot = ({d, handlePostLoad}:any):JSX.Element => {
  const [Icon, setIcon] = useState<any>()
  const [tierColor,setTierColor] = useState<string>()

  useEffect(()=>{
    const loadSVG = async()=>{
      setIcon(()=>ICONS[d.svgPath])
    }
      loadSVG()

    switch(d.tier){
      case "Bronze":{setTierColor("#cd7f32")} break;
      case "Silver":{setTierColor("#c1d4e3")} break;
      case "Gold":{setTierColor("#d4af37")} break;
    }
  },[])


  const handleTrophyPress = async(postID:string) => {
    if (postID != "") {
    console.log(postID)
    handlePostLoad(postID)
    }
  }




  return(
    <>
      <TouchableOpacity onPress={()=>{handleTrophyPress(d.id)}} style={{...styles.trophyBox, height:"30%", borderColor:"#656565", borderWidth:2}}>
        <View style={{alignItems:"center", width:"100%"}}>
          <Text style={styles.trophyTitle}>{d.trophyTitle}</Text>
          
        </View>
        
        {Icon && <Icon width={90} height={90} fill={d.id==""?"#656565":tierColor} />}
        <View style={{backgroundColor:d.tierColor, width:"100%", alignItems:"center"}}>
          <Text style={{color:"#fff", fontSize:scaleFont(24)}}><Text style={{color:"#ababab", fontSize:scaleFont(20)}}>Score: </Text>{d.score}</Text>
        </View>

      </TouchableOpacity>
      
    </>
  )
}

export default TrophySpot