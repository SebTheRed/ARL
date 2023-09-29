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
import { useNotifications } from '../../Contexts/NotificationsContext';
const NotificationTile = ({data}:any):JSX.Element => {
  const windowDimensions = Dimensions.get('window')
  const [timePast,setTimePast] = useState<string>()
  const {updateNotificationReadStatus}:any = useNotifications()

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


  const markRead = () => {
    if (data.id && !data.read) { // Check if the notification has an id and is unread
      updateNotificationReadStatus(data.id); // Call the function to update the read status in Firestore
    }
  }




  return(
    <TouchableOpacity 
      onPress={markRead} 
      style={{
        ...styles.notifTileContainer,
        width: (windowDimensions.width - 10),
        borderColor: data.read ? "#656565" : "#FFFFFF" // Change color based on read status
      }}
    >
      <View style={{
        ...styles.notifIndicator, 
        backgroundColor: data.read ? "transparent" : "red",
        borderColor: data.read ? "transparent" : "#fff",
        opacity: data.read ? 0.5 : 1 // Change opacity based on read status
      }}></View>
      <View style={styles.notifMessageContainer}>
        <Text style={{color: data.read ? "gray" : "white"}}>{data.message}</Text>
      </View>
      <Text style={{color: "gray"}}>{timePast}</Text>
    </TouchableOpacity>
  )
}

export default NotificationTile