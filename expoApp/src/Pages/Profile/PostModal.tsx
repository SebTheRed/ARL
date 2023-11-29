import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../../styles'
import { useGameRules } from '../../Contexts/GameRules';
import { scaleFont } from '../../Utilities/fontSizing';
import BackArrow from '../../IconBin/svg/back_arrow.svg'

import ICONS from '../Trophies/TrophyIcons'

const PostModal = ({data,setData, }:any):JSX.Element => {
  const windowDimensions = Dimensions.get('window')

  const {gameRules}:any = useGameRules()
  const [logBoxHeight,setLogBoxHeight] = useState<number|null>(null)
  const [matchingSkillColor,setMatchingSkillColor] = useState("#fff")
  const [Icon,setIcon] = useState<any>(null)


  useEffect(()=>{
    const logLength = data.textLog;
    if (logLength < 30) {
      setLogBoxHeight(20)
      return;
    }
    if (logLength < 60) {
      setLogBoxHeight(40)
      return;
    }
    if (logLength < 90) {
      setLogBoxHeight(60)
      return;
    }
    if (logLength < 120) {
      setLogBoxHeight(80)
      return;
    }
    if (logLength < 150) {
      setLogBoxHeight(100)
      return;
    }
    if (logLength < 180) {
      setLogBoxHeight(120)
      return;
    }
    if (logLength < 210) {
      setLogBoxHeight(140)
      return;
    }
    if (logLength < 270) {
      setLogBoxHeight(160)
      return;
    }
    if (logLength < 330) {
      setLogBoxHeight(180)
      return;
    }
    if (logLength <= 360) {
      setLogBoxHeight(200)
      return;
    }
    const loadSVG = async()=>{
      setIcon(()=>ICONS[data.svgPath])
    }
    loadSVG()
    switch(data.postSkill){
      case"family": setMatchingSkillColor("#ff0000")
      break;
      case"friends":setMatchingSkillColor("#ff8400")
      break;
      case "fitness":setMatchingSkillColor("#ffea00")
      break;
      case "earthcraft":setMatchingSkillColor("#4dff00")
      break;
      case "cooking":setMatchingSkillColor("#00ff80")
      break;
      case "technology":setMatchingSkillColor("#00fffb")
      break;
      case "games":setMatchingSkillColor("#0080ff")
      break;
      case "language":setMatchingSkillColor("#7700ff")
      break;
      case "humanity":setMatchingSkillColor("#c800ff")
      break;
    }
  })




  return(
    <View style={{backgroundColor:"#1c1c1c"}}>
      <TouchableOpacity onPress={()=>{setData()}} style={{...styles.backHeaderBar, backgroundColor:"#1c1c1c"}}>
        <BackArrow width={scaleFont(20)} height={scaleFont(20)} />
        <Text style={styles.backHeaderText}>Go Back</Text>
      </TouchableOpacity>
      <ScrollView style={{...styles.feedPostWrapper, width: windowDimensions.width, height:"100%"}}>
        <View style={{...styles.postTopRow}}>
          <View style={{...styles.postProfileAndNameContainer}}>
            <View>
              
              {gameRules.skillsList && (<Text style={{...styles.postTopExperienceName,color:matchingSkillColor}}>{data.trophyTitle} <Text style={{color:"#656565"}}> {data.tier}</Text></Text>)}
              <Text style={{color:"#fff", width:"50%"}}>{data.desc}</Text>
            </View>
            
            
          </View>
          <View style={{position:"absolute",right:-15, top:0}}>

            {Icon && <Icon width={50} height={50} fill={"#fff"} />}

          </View>
        <View style={{...styles.postTopExperienceContainer}}>
          
        </View>
        </View>
        
        
        <View style={{height:"auto", justifyContent:"space-around"}}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ height: (windowDimensions.width) }}
          >
            {data.pictureList.map((item:string, index:number) => (
              <Image 
                key={index}
                style={{ width: (windowDimensions.width), height: (windowDimensions.width), resizeMode: 'cover' }}
                source={{ uri: item }}
              />
            ))}
          </ScrollView>

          <View style={{...styles.postContentContainer, marginBottom:0, height:logBoxHeight, borderTopWidth:0, alignItems:"center",}}>
            <Text style={{...styles.postContentLogText, color:"#656565"}}>⟵ Swipe to view Trophy pics ⟶</Text>
          </View>
          <View style={{...styles.postContentContainer, height:logBoxHeight}}>
            <Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
          </View>
        </View>
        


        <View style={{...styles.postBottomWrapper}}>
          <View style={styles.postBottomBox}>
            <Text style={{color:"#fff", fontSize:scaleFont(16)}}>Score:</Text>
            <Text style={{color:"#fff", fontSize:scaleFont(24)}}>{data.score}</Text>
          </View>
        </View>
        <View style={{height:100}} />
      </ScrollView>
    </View>
  )
}

export default PostModal