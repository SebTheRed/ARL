import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity,
	Animated,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import styles from '../../styles';
const NotificationTile = ({data}:any):JSX.Element => {
  const windowDimensions = Dimensions.get('window')
  const [timePast,setTimePast] = useState<string>()
  useEffect(() => {
    const calculateTimePast = () => {
      const now = new Date();
      const notificationTime = data.timeStamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      const diffInSeconds = Math.floor((now.getTime() - notificationTime.getTime()) / 1000);

      let timePastStr:string = '';
      if (diffInSeconds < 60) {
        timePastStr = `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        timePastStr = `${Math.floor(diffInSeconds / 60)} minutes ago`;
      } else if (diffInSeconds < 86400) {
        timePastStr = `${Math.floor(diffInSeconds / 3600)} hours ago`;
      } else {
        timePastStr = `${Math.floor(diffInSeconds / 86400)} days ago`;
      }

      setTimePast(timePastStr);
    };

    calculateTimePast();
    const intervalId = setInterval(calculateTimePast, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [data.timeStamp]);
  return(
    <View style={{...styles.notifTileContainer,borderColor:"#656565", width:(windowDimensions.width-10)}}>
      
      <View style={{...styles.notifIndicator, backgroundColor:"red",borderColor:"#fff"}}></View>
      <View style={styles.notifMessageContainer}>
        <Text style={{color:"white"}}>{data.message}</Text>
      </View>
      <Text style={{color:"gray"}}>{timePast}</Text>
    </View>
  )
}

export default NotificationTile