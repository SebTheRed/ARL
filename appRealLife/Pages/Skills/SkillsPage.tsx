import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
  } from 'react-native';

import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import HeaderBar from '../../Overlays/HeaderBar';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type SkillPageProps = PropsWithChildren<{
    route:any
}>
type RootStackParamList = {
  Skills:undefined,
}






const SkillsPage = ({route}:SkillPageProps):JSX.Element => {
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const {skillData} = route.params;
const [matchingSkillData, setMatchingSkillData] = useState({})


const handlePress = () => { //REALLY SHOULD NOT USE ANY HERE
  navigation.navigate("Skills");
}

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
          <TouchableOpacity onPress={()=>handlePress()} style={styles.backHeaderBar}>
            <Text style={styles.backHeaderText}>⇦Skills</Text>
          </TouchableOpacity>
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