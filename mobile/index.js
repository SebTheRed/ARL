/**
 * @format
 */
 import 'react-native-gesture-handler';
 import { LogBox } from 'react-native';
 LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
