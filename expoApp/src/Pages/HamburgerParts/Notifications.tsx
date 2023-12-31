import {
	View,
  RefreshControl,
  FlatList
} from 'react-native';
import React, { useState } from 'react'
import NotificationTile from './NotificationTile';
import styles from '../../styles';
import { useUID } from '../../Contexts/UIDContext';
import { useNotifications } from '../../Contexts/NotificationsContext';
const Notifications = () => {

  const [refreshing,setRefreshing] = useState<boolean>(false)

  const { currentNotifications, refreshNotifications, paginateNotifications,updateNotificationReadStatus }:any = useNotifications();
  const {uid}:any = useUID()
  const handleRefresh = async () => {
    setRefreshing(true);
    // await refreshNotifications();
    
    setRefreshing(false);
  };



  const handleLoadMore = () => {
    paginateNotifications();
  };

    const NotificationHeader = () => {
      return (
        <View>
        </View>
      );
    };


  return (
    <FlatList
      data={currentNotifications}
      ListHeaderComponent={<NotificationHeader />}
      renderItem={({ item }) => <NotificationTile data={item} />}
      keyExtractor={item => item.timeStamp.toMillis()}
      style={styles.notificationFlatList}
      contentContainerStyle={{ alignItems: 'center' }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      scrollEventThrottle={150}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#FFF']}
          tintColor="#FFF"
        />
      }
    />
  );
};

export default Notifications

