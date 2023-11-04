import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList
  } from 'react-native';
import {
  LineChart,
  } from "react-native-chart-kit";
import React, {useEffect, useState} from 'react'
import { db } from '../../Firebase/firebase';
import { getDocs, query, orderBy,collection,Timestamp } from "firebase/firestore"; // Import onSnapshot
import {useCurrentTraitStat} from '../../Contexts/CurrentTraitStat'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import styles from '../../styles'
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useLastPage } from '../../Contexts/LastPageContext';
import {scaleFont} from '../../Utilities/fontSizing'
import { useGameRules } from '../../Contexts/GameRules';


import FamilySVG from '../../IconBin/SkillIcons/family_1.svg'
import FriendsSVG from '../../IconBin/SkillIcons/friends_1.svg'
import FitnessSVG from '../../IconBin/SkillIcons/fitness_1.svg'
import EarthcraftSVG from '../../IconBin/SkillIcons/earthcraft_1.svg'
import CookingSVG from '../../IconBin/SkillIcons/cooking_1.svg'
import TechnologySVG from '../../IconBin/SkillIcons/technology_1.svg'
import GamesSVG from '../../IconBin/SkillIcons/games_3.svg'
import LanguageSVG from '../../IconBin/SkillIcons/language_2.svg'
import HumanitySVG from '../../IconBin/SkillIcons/humanity_2.svg'

const Stats = ():JSX.Element => {
  const {lastPage}:any = useLastPage()
  const {skillsList, XPScale, trophyData}:any = useGameRules()
  const navigation = useNavigation<any>();
  // const {uid}:any = useUID()
  const {profilePageUID}:any = useProfilePageUID()
  const {currentTraitTitle}:any = useCurrentTraitStat()
  const [currentLog,setCurrentLog] = useState<any>()
  const [allMatchingLogData,setAllMatchingLogData] = useState<any>([])
  const [lineChartData,setLineChartData] = useState<any>({})
  const [matchingColor,setMatchingColor] = useState("#fff")


  useEffect(()=>{
//FETCH ALL DATA
  const skillSwitch = ()=>{
    Object.values(skillsList).map((skill:any,i:number)=>{
      if (skill.title == currentTraitTitle){setMatchingColor(skill.color)}
    })
  }
  const fetchDataFresh = async () => {
    let feedQuery;
    const collectionPath = `users/${profilePageUID}/xpLog`
      feedQuery = query(
        collection(db, collectionPath),
        orderBy("timeStamp", "desc"),

      );

    const snapshot = await getDocs(feedQuery);
    let newDocs = snapshot.docs.map(doc => doc.data());
    console.log("newdocs", newDocs.length)

    if (newDocs.length > 0) {
      calculateLineGraphData(newDocs)
      skillSwitch()
      let sortedByTraitDocs:any = [{eventTitle:"Event Name", xp:"XP", timeStamp:"Timestamp", id:"HEADEROFLIST"}]
      newDocs.map((doc)=>{
        if (doc.traitType !== currentTraitTitle) { return; }
        sortedByTraitDocs.push(doc)
      })
      setAllMatchingLogData(sortedByTraitDocs)
    }
  };
  fetchDataFresh()
  },[])

  const handleGoBack = () => {
    if (lastPage == "profile") {
      navigation.navigate("Profile")
    } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'AuthedApp', // The name of the root navigator's screen that contains the child navigators
                state: {
                  routes: [
                    {
                      name: 'Skills', // The name of the child navigator
                      state:{
                        routes:[
                          {
                            name:`${lastPage}`
                          }
                        ]
                      }
                    },
                  ],
                },
              },
            ],
          })
        );
    
  }
}

const calculateLineGraphData = (logList: Object[]) => {
  const today = new Date();
  const xpArray = new Array(30).fill(0); // Initialize an array of 30 zeros
  
  for (let i = 0; i < 30; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i); // Go back i days from today
    const targetTimestamp = Timestamp.fromDate(targetDate); // Convert to Firestore Timestamp
    
    let totalXP = 0;
    let hasData = false;
  
    logList.forEach((doc: any) => {
      if (doc.traitType !== currentTraitTitle) { return; }
      
      // Compare Firestore Timestamps directly
      const docDate = new Date(doc.timeStamp.seconds*1000)
      if (docDate.getFullYear() === targetTimestamp.toDate().getFullYear() &&
          docDate.getMonth() === targetTimestamp.toDate().getMonth() &&
          docDate.getDate() === targetTimestamp.toDate().getDate()) {
        totalXP += doc.xp;
        hasData = true;
      }
    });
  
    if (hasData) {
      xpArray[29 - i] = totalXP; // Fill in the XP for that day
    }
  }
  
  let data = {
    labels: [30,""," Days","","","","","","","",20,""," Days","","","","","","","",10,""," Days","","","","","","","Today",""],
    datasets:[
      {
        data: xpArray, // Updated array
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
  const breakOutLogArray = () => {

  }
  const handleToolTipDataAttrs = () => {
    //ONLY HERE TO STOP BUG WITH CHART LIBRARY
  }
  const calculateOneHundredDaysAgo = () => {
    const today = new Date()
    const hundredDays = new Date(today)
    return hundredDays.setDate(today.getDate()-100)
  }
  const handleLoadMoreLogs = () => {

  }
  const convertTimestampToMMDDYY = (timestamp:any) => {
    if (timestamp === "Timestamp") { return "Date"; }
    
    let date;
    if (typeof timestamp === 'string') {
      // If timestamp is a string, split it by '-' to get each component
      const [year, month, day] = timestamp.split('-').slice(0, 3);
      date = new Date(`${year}-${month}-${day}`);
    } else {
      // If timestamp is a Firestore Timestamp, convert it to a Date object
      date = new Date(timestamp.seconds*1000)
    }
    
    // Get the components from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    // Convert to MM/DD/YY format
    const formattedDate = `${month}/${day}/${String(year).slice(-2)}`;
    
    return formattedDate;
  };


  const CurrentIcon = ()=> {
    switch(currentTraitTitle){
      case "Family": return <FamilySVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Friends": return <FriendsSVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Fitness": return <FitnessSVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Earthcraft": return <EarthcraftSVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Cooking": return <CookingSVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Technology": return <TechnologySVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Games": return <GamesSVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Language": return <LanguageSVG width={scaleFont(30)} height={scaleFont(30)} />
      case "Humanity": return <HumanitySVG width={scaleFont(30)} height={scaleFont(30)} />
      default: return <></>
    }
  }



  const StatsHeader = ():JSX.Element => {
    return(
      <>
      <TouchableOpacity onPress={()=>handleGoBack()} style={{...styles.closeUploaderButton, paddingTop:0,}}>
        <Text style={{...styles.backHeaderText}}>⇦Go Back</Text>
      </TouchableOpacity>
      <View style={styles.statsHeaderContainer}>
        <View style={styles.statsHeaderTitleBox}>
          <CurrentIcon />
          <Text style={{...styles.statsTitle, color:`${matchingColor}`}}> {currentTraitTitle}</Text>
        </View>
        
          <View style={styles.statsGraphContainer}>
            {Object.keys(lineChartData).length > 0 && 
              <View style={{alignItems:"center"}}>
                <Text allowFontScaling={false} style={{...styles.statsTitle, fontSize:scaleFont(22),}}>{currentTraitTitle} XP over the last 30 days:</Text>
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
                <View style={{height:20,}}></View>
                <Text allowFontScaling={false} style={{...styles.statsTitle, fontSize:scaleFont(22),}}>All of your {currentTraitTitle} Experiences:</Text>
              </View>
            }
          </View>
      </View>
      
    </>
    )
  }

const LogPost = ({data}:any):JSX.Element => {
  return(
    <View style={{...styles.logPostContainer, width:(Dimensions.get("window").width)-20}}>
      <Text allowFontScaling={false} style={{...styles.logPostTitle, width:"45%"}}>{data.eventTitle}</Text>
      <Text allowFontScaling={false} style={{...styles.logPostTitle, width:"10%", color:`${matchingColor}`}}>{data.xp}</Text>
      <Text allowFontScaling={false} style={{...styles.logPostTitle, width:"25%"}}>{convertTimestampToMMDDYY(data.timeStamp)}</Text>
    </View>
  )
}

    return(
      <FlatList
      renderItem={({item})=><LogPost data={item} />}
      style={{...styles.feedFlatList}}
      ListHeaderComponent={StatsHeader}
      data={allMatchingLogData}
      keyExtractor={item=>item.id.toString()}
      />
    )
} 

export default Stats