import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

import { useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';

type SkillPageProps = PropsWithChildren<{
    name:string,
}>

const SkillsPage = ({route}:any):JSX.Element => {
const {skillType} = route.params;
    return(
        <View>
            <Text>{skillType}</Text>
        </View>
    )
}

export default SkillsPage