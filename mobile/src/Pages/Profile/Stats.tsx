import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions
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

const Stats = ({route}:any):JSX.Element => {
  const {skillsList, XPScale, trophyData}:any = route.params;
  const navigation = useNavigation<any>();
  const {uid}:any = useUID()
  const {currentTraitTitle}:any = useCurrentTraitStat()
  const [currentLog,setCurrentLog] = useState<any>()
  const [allLogData,setAllLogData] = useState<any>()
  const [lineChartData,setLineChartData] = useState<any>({})
  const [heatMapData,setHeatMapData] = useState<any>([])
  const [matchingColor,setMatchingColor] = useState(String)


  useEffect(()=>{
//FETCH ALL DATA
  const skillSwitch = ()=>{
    skillsList.map((skill:any,i:number)=>{
      if (skill.title == currentTraitTitle){setMatchingColor(skill.color)}
    })
  }
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
      skillSwitch()
    }
  };
  fetchDataFresh()
  },[])

  const handleGoBack = () => {
    navigation.navigate("Profile")
  }

  const calculateHeatMapData = (logList:Object[]) => {
      const heatMapList:any = [];
    
      logList.forEach((doc:any) => {
        if (doc.traitType !== currentTraitTitle) { return; }
        const docDate = doc.timeStamp.split('-').slice(0, 3).join('-'); // Extract the date part from the timestamp
    
        // Check if this date already exists in heatmapData
        const existingDate = heatMapList.find((data:any) => data.date === docDate);
    
        if (existingDate) {
          // If the date already exists, increment the count
          existingDate.count += doc.xp;
        } else {
          // If the date doesn't exist, add it to heatmapData
          heatMapList.push({ date: docDate, count: doc.xp });
        }
      });
      console.log(heatMapData)
      setHeatMapData(heatMapList)
      // return heatmapData;
  };

  const calculateLineGraphData = (logList:Object[]) => {
    // let testXPMonthData = [100,99,98,97,96,95,94,93,92,91,90,79,78,77,76,75,74,73,72,71,70,59,58,57,56,55,54,53,52,51]
    // const xpPerDay = {};
    const calculated30Days = () => {
      const today = new Date();
      const xpArray = new Array(30).fill(0); // Initialize an array of 30 nulls
  
      for (let i = 0; i < 30; i++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - i); // Go back i days from today
        const targetDateString = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
  
        let totalXP = 0;
        let hasData = false;
  
        logList.forEach((doc:any) => {
          if (doc.traitType !== currentTraitTitle) { return; }
          const docDate = doc.timeStamp.split('-').slice(0, 3).join('-'); // Extract the date part from the timestamp
          if (docDate === targetDateString) {
            totalXP += doc.xp;
            hasData = true;
          }
        });
  
        if (hasData) {
          xpArray[29 - i] = totalXP; // Fill in the XP for that day
        }
      }
  
      return xpArray;
    };
  



    
    let data = {
      labels: [30,""," Days","","","","","","","",20,""," Days","","","","","","","",10,""," Days","","","","","","","Today",""],
      datasets:[
        {
          data: calculated30Days(),//PUT ARRAY OF COMBINED TOTAL OF EACH 30 DAYS HERE!!
        },
      ],
    }
    setLineChartData(data)
  }
  
  const chartConfig = {
    backgroundGradientFrom: "#1c1c1c",
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: "#656565",
    backgroundGradientToOpacity: 0.3,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "1",
      strokeWidth: "3",
      stroke: matchingColor
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const heatMapConfig = {}
  const breakOutLogArray = () => {

  }
  const handleToolTipDataAttrs = () => {
    //ONLY HERE TO STOP BUG WITH CHART LIBRARY
  }
  const calculateOneHundredDaysAgo = () => {
    const today = new Date()
    const hundredDays = new Date(today)
    hundredDays.setFullYear(today.getDate()-100)
    return hundredDays
  }


  const StatsHeader = ():JSX.Element => {
    return(
      <>
      <TouchableOpacity onPress={()=>handleGoBack()} style={{...styles.closeUploaderButton, height:80,}}>
        <Text style={{...styles.backHeaderText}}>⇦Go Back</Text>
      </TouchableOpacity>
      <View style={styles.statsHeaderContainer}>
        
          <Text style={{...styles.statsTitle, color:`${matchingColor}`}}>{currentTraitTitle}</Text>
          <View style={styles.statsGraphContainer}>
            {heatMapData.length > 0 &&
              <View>
                <Text style={{...styles.statsTitle, fontSize:16,}}> •Post frequency over the last 100 days:</Text>
                <ContributionGraph
                tooltipDataAttrs={(value)=>{handleToolTipDataAttrs}}
                values={heatMapData}
                endDate={calculateOneHundredDaysAgo()} //MAKE THIS A YEAR AGO FROM TODAY
                numDays={100}
                width={(Dimensions.get("window").width)-20}
                height={220}
                chartConfig={chartConfig}
                style={{
                  alignItems:"center",
                  marginVertical: 8,
                  borderRadius: 8,
                  borderColor:"#fff",
                  borderWidth:2,
                }}
                />
              </View>
            }
          </View>
          <View style={styles.statsGraphContainer}>
            {Object.keys(lineChartData).length > 0 && 
              <View style={{}}>
                <Text style={{...styles.statsTitle, fontSize:16,}}> •XP over the last 30 days:</Text>
                <LineChart
                  data={lineChartData}
                  width={(Dimensions.get("window").width)-20}
                  height={220}
                   chartConfig={chartConfig}
                  yAxisSuffix="XP"
                  style={{
                    alignItems:"center",
                    marginVertical: 8,
                    borderRadius: 8,
                    borderColor:"#fff",
                    borderWidth:2,
                  }}
                />
              </View>
            }
          </View>
      </View>
    </>
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