import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import Elegant1 from '../IconBin/TrophyComponents/elegant1';
import styles from '../styles'

const Trophies = ():JSX.Element => {
    return(
        <ScrollView horizontal={true} style={styles.backgroundStyle}>
            <View style={styles.trophyBox}>
                <Elegant1 />
            </View>
        </ScrollView>
    )
}

export default Trophies