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
	FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../../styles'

const FeedPost = ({data}:any):JSX.Element => {
    return(
        <View style={{...styles.feedPostWrapper}}>
            <Text style={{...styles.feedPostText}}>{data.eventTitle}</Text>
        </View>
    )
}

export default FeedPost