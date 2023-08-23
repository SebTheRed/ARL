import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import SkillsPage from './SkillsPage'
type SectionProps = PropsWithChildren<{
    title: string;
    flare: string;
  }>;
type SkillTileProps = PropsWithChildren<{
  title: string,
  level: number,
  color: string,
  flare: string,
}>;
type SkillsProps = PropsWithChildren<{
  route: any,
}>
type RootStackParamList = {
  Family: undefined,
  Friends: undefined,
  Agility: undefined,
  Strength: undefined,
  Earthcraft: undefined,
  Cooking: undefined,
  Coding: undefined,
  Gaming: undefined,
  Reading: undefined,
  Humanity: undefined,
}
////// FUNC COMPONENT START //////



function Skills({route}:SkillsProps): JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { skillsList } = route.params;
  const [chosenSkillPage,setChosenSkillPage] = useState("")
  
  // useEffect(()=>{
  //   setChosenSkillPage("")
  // },[route])

  const handlePress = (val:any) => { //REALLY SHOULD NOT USE ANY HERE
    navigation.navigate(val);
  }



function Section({children, title, flare}: SectionProps): JSX.Element {
  console.log(children)

  const isDarkMode = useColorScheme() === 'dark';
  return(
  <View></View>
  )
}
const SkillTile = ({title,flare, color,level}:SkillTileProps): JSX.Element => {
  return(
    <TouchableOpacity onPress={()=>{handlePress(title)}} style={styles.sectionContainer}>
      <View style={styles.sectionTextContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>{flare}</Text>
        
      </View>
      <View style={{...styles.sectionLevelBox, backgroundColor:color}}>
        <View style={styles.offsetWrapper}>
        </View>
        <Text style={{...styles.borderedTextShadow, color: 'black',}}>{level}</Text>
        <Text style={{...styles.borderedText, color: 'white' }}>{level}</Text>
      </View>
    </TouchableOpacity>
  )
}


    return(
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
            <View>
              {skillsList.map((d:any,i:number)=>{
                return(<SkillTile title={d.title} color={d.color} level={d.level} flare={d.flare} key={i}/>)
              })}
            </View>
      </ScrollView>
    )
}

export default Skills