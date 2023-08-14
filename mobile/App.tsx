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

function Section({children, title}: SectionProps): JSX.Element {
  console.log(children)

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
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
    backgroundColor: '#ffffff',
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
        <View style={{
          flex: 1, // or whatever height you want
          backgroundColor: 'white',
          borderBottomColor: 'black',
          borderBottomWidth: 200,
          opacity: 0.5
        }} />
        <View>
          <Section title="Family">
            <Text>The highest priority.</Text>
            <Text>+XP by phoning or visiting family.</Text>
          </Section>
          <Section title="Friends">
            <Text>The greatest pleasure.</Text>
            <Text>+XP by going to social settings.</Text>
            <Text>Utilizes Google Maps API for proof.</Text>
          </Section>
          <Section title="Finance">
            <Text>The primary focus.</Text>
            <Text>+XP or -XP based on credit score.</Text>
          </Section>
          <Section title="Agility">
            <Text>The power to move.</Text>
            <Text>+XP for logging cardio exercise.</Text>
          </Section>
          <Section title="Strength">
            <Text>The force of will.</Text>
            <Text>+XP for tracking strength training.</Text>
          </Section>
          <Section title="Coding">
            <Text>The language of rocks.</Text>
            <Text>+XP using Github.</Text>
          </Section>
          <Section title="Gaming">
            <Text>The otherworldly immersion.</Text>
            <Text>+XP for playing games.</Text>
            <Text>++XP for gaming in groups.</Text>
          </Section>
          <Section title="Cooking">
            <Text>Fuel rules the Man.</Text>
            <Text>+XP for sharing recipes & pics.</Text>
          </Section>
          <Section title="The Arts">
            <Text>The decoration of time & space.</Text>
            <Text>+XP making/viewing IRL art.</Text>
            <Text>What is art ?_?</Text>
          </Section>
          <Section title="Philanthropy">
            <Text>The humbling altruism.</Text>
            <Text>+XP when logging into charity events.</Text>
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
