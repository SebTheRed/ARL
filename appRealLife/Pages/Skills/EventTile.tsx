import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
  } from 'react-native';

import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';

const EventTile = ({d, i}:any):JSX.Element => {
    return(
        <View>
            <Text>{i}</Text>
        </View>
    )
}

export default EventTile