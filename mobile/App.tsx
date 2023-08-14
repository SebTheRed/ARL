/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
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
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
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
                  color: isDarkMode ? Colors.light : Colors.dark,
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
                color: isDarkMode ? Colors.light : Colors.dark,
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
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
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
            <Text>+XP for gaming.</Text>
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
    borderColor:"blue",
    flexDirection:"column",
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
