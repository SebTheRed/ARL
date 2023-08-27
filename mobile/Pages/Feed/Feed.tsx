import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity} from 'react-native'
	import React from 'react'
const Feed = ({route}:any):JSX.Element => {
const {uid} = route.params;
    return(
        <View><Text>Feed</Text></View>
    )
}
export default Feed