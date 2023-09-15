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
	RefreshControl,
	TextInput,
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles'

const People = ():JSX.Element => {

	const SearchBar = () => {
		return (
		  <View style={styles.searchContainer}>
			<TextInput
			  style={styles.searchInput}
			  placeholder="Search For People..."
			  placeholderTextColor="#999"
			/>
		  </View>
		);
	  };


    return(
        <ScrollView style={styles.peoplePageContainer}>
			<SearchBar />
		</ScrollView>
    )
}

export default People