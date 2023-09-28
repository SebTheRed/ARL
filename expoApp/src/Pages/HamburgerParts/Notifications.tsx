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
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react'
import NotificationTile from './NotificationTile';
import styles from '../../styles';
import { useNotifications } from '../../Contexts/NotificationsContext';
const Notifications = () => {

  const [refreshing,setRefreshing] = useState<boolean>(false)

  const { currentNotifications, refreshNotifications, paginateNotifications }:any = useNotifications();

  const handleRefresh = async () => {
    setRefreshing(true);
    // await refreshNotifications();
    
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    paginateNotifications();
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

const NotificationHeader = () => {
  return (
    <View>
    </View>
  );
};