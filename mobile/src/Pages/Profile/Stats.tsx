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
  const [lineChartData,setLineChartData] = useState<any>({})


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
      // setAllLogData(() => [...newDocs]);
      calculateHeatMapData(newDocs)
      calculateLineGraphData(newDocs)
    }
  };
  fetchDataFresh()
  },[])

  const handleGoBack = () => {
    navigation.navigate("Profile")
  }

  const calculateHeatMapData = (logList:Object[]) => {

  }

  const calculateLineGraphData = (logList:Object[]) => {
    let testXPMonthData = [100,99,98,97,96,95,94,93,92,91,90,79,78,77,76,75,74,73,72,71,70,59,58,57,56,55,54,53,52,51]
    let data = {
      labels: [30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,19,9,8,7,6,5,4,3,2,1],
      datasets:[
        {
          data: testXPMonthData,//PUT ARRAY OF COMBINED TOTAL OF EACH 30 DAYS HERE!!
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ]
    }
    setLineChartData(data)
  }
  
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
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
          {Object.keys(lineChartData).length > 0 && <LineChart data={lineChartData} width={300} height={200} chartConfig={chartConfig} />}
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