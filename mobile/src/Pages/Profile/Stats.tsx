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
import {
  LineChart,
  ContributionGraph,
  } from "react-native-chart-kit";
import React, {useEffect, useState} from 'react'
import { db } from '../../Firebase/firebase';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter } from "firebase/firestore"; // Import onSnapshot
import {useCurrentTraitStat} from '../../Contexts/CurrentTraitStat'
import { useUID } from '../../Contexts/UIDContext';
import styles from '../../styles'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const Stats = ():JSX.Element => {
  const navigation = useNavigation<any>();
  const {uid}:any = useUID()
  const {currentTraitTitle}:any = useCurrentTraitStat()
  const [currentLog,setCurrentLog] = useState<any>()
  const [allLogData,setAllLogData] = useState<any>()


  useEffect(()=>{
//FETCH ALL DATA
  const fetchDataFresh = async () => {
    let feedQuery;
    const collectionPath = `users/${uid}/xpLog`
      feedQuery = query(
        collection(db, collectionPath),
        orderBy("timeStamp", "desc"),

      );

    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      setAllLogData(() => [...newDocs]);
    }
  };
  fetchDataFresh()
  },[])

  const handleGoBack = () => {
    navigation.navigate("Profile")
  }

  const calculateHeatMapData = () => {

  }

  const calculateLineGraphData = () => {

  }
  const breakOutLogArray = () => {

  }


  const StatsHeader = ():JSX.Element => {
    return(
    <View style={styles.statsHeaderContainer}>
      <TouchableOpacity onPress={()=>handleGoBack()} style={styles.closeUploaderButton}>
          <Text style={{...styles.backHeaderText}}>⇦Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.statsTitle}>{currentTraitTitle}</Text>
        <View style={styles.statsGraphContainer}>
          {/* HEATMAP */}
        </View>
        <View style={styles.statsGraphContainer}>
          {/* LINE GRAPH */}
        </View>
    </View>
    )
  }



    return(
      <FlatList
      style={{...styles.feedFlatList}}
      ListHeaderComponent={StatsHeader}
      >
          <View style={styles.statsLogContainer}>
            {/* WELL OF OLD XP POSTS. PAGINATE THRU THEM!! IT'LL BE HUGE!! */}
          </View>
      </FlatList>
    )
} 

export default Stats