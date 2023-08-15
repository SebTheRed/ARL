/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { Animated, Easing } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title, flare}: SectionProps): JSX.Element {
  console.log(children)

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <View style={{flexDirection:"row", alignItems:"flex-end"}}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: "white",
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionFlare,
          ]}>
          &nbsp;&nbsp;{flare}
        </Text>
      </View>
      
      <Text
        style={[
          styles.sectionDescription,
          {
            color: "white"
          },
        ]}>
          
      <View style={styles.sectionDescriptionContainer}>
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <Text
              key={index}
              style={[
                styles.sectionDescription,
                {
                  color: "white",
                },
              ]}>
              {child}
            </Text>
          ))
        ) : (
          <Text
            style={[
              styles.sectionDescription,
              {
                color: "white",
              },
            ]}>
            {children}
          </Text>
        )}
      </View>
        

      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#1c1c1c',
    flex:1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* right here sweet baby Mr Plugin */}
        <View>
          <Section title="Family" flare="The highest priority.">
            <Text>+XP when calling & visiting family.</Text>
            <Text>++XP when family birthdays.</Text>
          </Section>
          <Section title="Friends" flare="The greatest pleasure.">
            <Text>+XP when calling & visiting family.</Text>
            <Text>++XP when going to social events.</Text>
          </Section>
          <Section title="Finance" flare="The primary focus.">
            <Text>+XP or -XP based on credit score.</Text>
            <Text>++XP when following budget.</Text>
          </Section>
          <Section title="Agility" flare="The power to move.">
            <Text>+XP when logging cardio exercise.</Text>
            <Text>++XP when classes or social exercise.</Text>
          </Section>
          <Section title="Strength" flare="The force of will.">
            <Text>+XP when tracking strength training.</Text>
            <Text>++XP following schedule.</Text>
          </Section>
          <Section title="Coding" flare="The language of rocks.">
            <Text>+XP using Github.</Text>
            <Text>++XP daily leetcode question.</Text>
          </Section>
          <Section title="Gaming" flare="The otherworldly immersion.">
            <Text>+XP when playing games.</Text>
            <Text>++XP when gaming with friends.</Text>
          </Section>
          <Section title="Cooking" flare="Fuel rules the Man.">
            <Text>+XP logging meals.</Text>
            <Text>++XP when sharing recipes & pics.</Text>
          </Section>
          <Section title="The Arts" flare="The decoration of space & time.">
            <Text>+XP making IRL art.</Text>
            <Text>++XP going to art shows/galleries.</Text>
          </Section>
          <Section title="Philanthropy" flare="The humbling altruism.">
            <Text>+XP when donating money to charity.</Text>
            <Text>++XP when logging into charity events.</Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 5,
    paddingHorizontal: 24,
    borderWidth:2,
    borderColor:"white",
    flexDirection:"column",
    backgroundColor:"#1c1c1c",
    borderRadius:10,
    filter:"drop-shadow(0 0 10 black)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: "X Company Regular"
  },
  sectionFlare:{
    fontSize:16,
    fontWeight:'400',
    color:"white",

  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    flexDirection:"column",
  },
  highlight: {
    fontWeight: '700',
  },
  headerIdk:{
    color:"blue",
  },
  sectionDescriptionContainer:{
    
  }
});

export default App;
