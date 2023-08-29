import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
	TextInput,
  } from 'react-native';
  import React from 'react'
  import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
  import { useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {db, auth,} from '../../Firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useUserData } from '../../Contexts/UserDataContext';
import LinearGradient from 'react-native-linear-gradient';


const ExperienceUploader = ():JSX.Element => {
    return(
        <View></View>
    )
}

export default ExperienceUploader