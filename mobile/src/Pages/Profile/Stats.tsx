import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import {
  LineChart,
  ContributionGraph,
  } from "react-native-chart-kit";
import React from 'react'
import {useCurrentTraitStat} from '../../Contexts/CurrentTraitStat'
import styles from '../../styles'

const Stats = ():JSX.Element => {
  const {currentTraitTitle}:any = useCurrentTraitStat()
    return(
        <View><Text>{currentTraitTitle} Stats</Text></View>
    )
} 

export default Stats