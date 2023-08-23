import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';

type SkillPageProps = PropsWithChildren<{
    route:any
}>

const SkillsPage = ({route}:SkillPageProps):JSX.Element => {
const {skillData} = route.params;
const [matchingSkillData, setMatchingSkillData] = useState({})

// useEffect(()=>{
//   const findSkillByTitle = (title:string) => skillsLlist.find(skill => skill.title === title);
//   const result = findSkillByTitle(skillType)
//   setMatchingSkillData(result)
// },[])
if (skillData) {
  return(
    <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle}}>
          <View style={{alignItems:"center", width:"100%"}}>
            <View style={styles.skillPageTitleBox}>
              <Text style={styles.skillPageTitle}>{skillData.title}</Text>
              <Text style={styles.skillPageTitle}>1/99</Text>
            </View>
            <View style={{...styles.skillPageXPBar,backgroundColor:skillData.color}}></View>
            <View style={styles.skillPageXPBox}>
              <Text style={styles.skillPageXPText}>PrevXP</Text>
              <Text style={styles.skillPageXPText}>CurrentXP</Text>
              <Text style={styles.skillPageXPText}>NextXP</Text>
            </View>
          </View>
        
    </ScrollView>
)
} else {
  return(<></>)
}

}

export default SkillsPage