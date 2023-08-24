/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import type {PropsWithChildren} from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Skills from './Pages/Skills/Skills';
import SkillsPage from './Pages/Skills/SkillsPage'
import Stats from './Pages/Stats';
import Map from './Pages/Map';
import Profile from './Pages/Profile';
import Trophies from './Pages/Trophies/Trophies'
import HeaderBar from './Overlays/HeaderBar';
import { useState } from 'react';
import styles from './styles';
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
import BottomBar from './Overlays/BottomBar';
const Stack = createStackNavigator();
const SkillStack = createStackNavigator();
type RootStackParamList = {
  Profile: undefined;
  Map: undefined;
  Skills: undefined;
  Stats: undefined;
  Trophies: undefined;
};






////// COMPONENT FUNCTION BEGINNING //////
function App(): JSX.Element {
  const [XPScale, setXPScale] = useState({
    1: 15, 2: 45, 3: 90, 4: 150, 5: 225, 6: 315, 7: 420, 8: 540, 9: 675, 10: 825,
    11: 990, 12: 1170, 13: 1365, 14: 1575, 15: 1800, 16: 2040, 17: 2295, 18: 2565, 19: 2850, 20: 3150,
    21: 3465, 22: 3795, 23: 4140, 24: 4500, 25: 4875, 26: 5265, 27: 5670, 28: 6090, 29: 6525, 30: 6975,
    31: 7440, 32: 7920, 33: 8415, 34: 8925, 35: 9450, 36: 9990, 37: 10545, 38: 11115, 39: 11700, 40: 12300,
    41: 12915, 42: 13545, 43: 14190, 44: 14850, 45: 15525, 46: 16215, 47: 16920, 48: 17640, 49: 18375, 50: 19125,
    51: 19890, 52: 20670, 53: 21465, 54: 22275, 55: 23100, 56: 23940, 57: 24795, 58: 25665, 59: 26550, 60: 27450,
    61: 28365, 62: 29295, 63: 30240, 64: 31200, 65: 32175, 66: 33165, 67: 34170, 68: 35190, 69: 36225, 70: 37275,
    71: 38340, 72: 39420, 73: 40515, 74: 41625, 75: 42750, 76: 43890, 77: 45045, 78: 46215, 79: 47400, 80: 48600,
    81: 49815, 82: 51045, 83: 52290, 84: 53550, 85: 54825, 86: 56115, 87: 57420, 88: 58740, 89: 60075, 90: 61425,
    91: 62790, 92: 64170, 93: 65565, 94: 66975, 95: 68400, 96: 69840, 97: 71295, 98: 72765, 99: 74250
});

  const [XPTriggerEvents,setXPTriggerEvents] = useState({
    family:{
      call_loved_one: {type:"phone",title:"Call a Loved One",desc:"Place a phone call to a starred or favorited contact in your phone." ,xp: 10, unlocksAt: 0, perDay: 3 , perWeek: 0, perMonth: 0},
      family_photo: {type:"camera",title:"Take a Family Photo",desc:"Take a picture with you & 2 other family members.",xp: 20, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth: 0,},
      send_letter: {type:"log",title:"Send a Letter",desc:"Send a letter to anyone! Receiving a letter must mean that they're family!", xp: 5, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0},
      visit_relative: {type:"gps",title:"Visit a Relative",desc:"Check in with the Map at a relative's place.", xp: 20, unlocksAt: 5, perDay:1, perWeek:0, perMonth:0},
      organize_reunion: {type:"timeline",title:"Family Reunion",desc:"Organize & attend a family reunion of at least 3 generations present.", xp: 100, unlocksAt: 10, perDay:0, perWeek:0, perMonth:1},
      help_with_chores: {type:"camera",title:"Chore Time",desc:"Help a family member with one of their chores.", xp: 30, unlocksAt: 15, perDay:2, perWeek:0, perMonth:0},
      family_game_night: {type:"camera",title:"Game Night!",desc:"Attend a family game night with at least 4 members.", xp: 40, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0},
      family_trip: {type:"timeline",title:"Family Vacation",desc:"Take & document a family vacation.", xp: 300, unlocksAt: 30, perDay:0, perWeek:0, perMonth:1},
      weekly_family_meeting: {type:"camera",title:"Weekly Family Zoom",desc:"Organize & attend a family zoom meeting.", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      house_project: {type:"timeline",title:"House Project",desc:"Design & document a large project that involves many members of your family.", xp: 500, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1}
    },
    friends: {
      message_with_friends: {type:"log",title:"",desc:"", xp: 5, unlocksAt: 0, perDay:10, perWeek:0, perMonth:0},
      call_friend: {type:"phone",title:"",desc:"", xp: 10, unlocksAt: 0, perDay: 3, perWeek:0, perMonth: 0},
      coffee_shop: {type:"gps",title:"",desc:"", xp: 20, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0},
      restaurant_bar: {type:"gps",title:"",desc:"", xp: 40, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      movie_theater: {type:"gps",title:"",desc:"", xp: 100, unlocksAt: 20, perDay:0, perWeek:1, perMonth:0},
      attend_private_party: {type:"gps",title:"",desc:"",xp: 150, unlocksAt: 25, perDay: 0, perWeek: 2, perMonth: 0},
      attend_club_meeting: {type:"gps",title:"",desc:"", xp: 100, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0},
      surprise_party: {type:"timeline",title:"",desc:"", xp: 250, unlocksAt: 40, perDay:0, perWeek:0, perMonth:1},
      friends_road_trip: {type:"timeline",title:"",desc:"", xp: 400, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1},
    },
    fitness: {
      do_pushups: {type:"gyro",title:"",desc:"", xp: 5, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0},
      stretching_routine: {type:"log",title:"",desc:"", xp: 5, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0},
      walking: {type:"acceleration",title:"",desc:"", xp: 10, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0},
      attend_gym: {type:"gps",title:"",desc:"", xp: 25, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      running: {type:"acceleration",title:"",desc:"", xp: 25, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      yoga_at_home: {type:"log",title:"",desc:"", xp: 10, unlocksAt: 15, perDay:1, perWeek:0, perMonth:0},
      attend_fitness_class: {type:"gps",title:"",desc:"", xp: 35, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0},
      achieve_pr: {type:"timeline",title:"",desc:"", xp: 100, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0},
      master_yoga_pose: {type:"timeline",title:"",desc:"", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      run_5k: {type:"acceleration",title:"",desc:"", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      belt_rank: {type:"timeline",title:"",desc:"", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      attendance_streak: {type:"gps",title:"Can't Stop Won't Stop",desc:"Attend gyms/classes/exercises for 5 of 7 days in a week.",xp: 100, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth: 0}
    },
    earthcraft: {
      plant_tree: {type:"camera",title:"",desc:"", xp: 10, unlocksAt: 0, perDay:3, perWeek:0, perMonth:0},
      new_plant: {type:"camera",title:"",desc:"", xp: 20, unlocksAt: 0, perDay:0, perWeek:1, perMonth:0},
      bird_watch: {type:"camera",title:"",desc:"",xp: 20, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth: 0},
      water_garden: {type:"log",title:"",desc:"", xp: 5, unlocksAt: 5, perDay:1, perWeek:0, perMonth:0},
      nature_hike: {type:"gps",title:"",desc:"", xp: 20, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      community_garden: {type:"camera",title:"",desc:"", xp: 50, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0},
      clean_up_event: {type:"timeline",title:"",desc:"", xp: 250, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0},
      camping: {type:"timeline",title:"",desc:"", xp: 100, unlocksAt: 35, perDay:0, perWeek:1, perMonth:0},
      compost: {type:"log",title:"",desc:"", xp: 10, unlocksAt: 40, perDay:2, perWeek:0, perMonth:0},
      outdoor_project: {type:"timeline",title:"",desc:"",xp: 250, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth: 1},
      wildlife_park: {type:"gps",title:"",desc:"", xp: 350, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1}
    },
    cooking: {
      make_meal: {type:"log",title:"",desc:"", xp: 5, unlocksAt: 0, perDay: 3, perWeek: 0, perMonth:0 },
      bake: {type:"log",title:"",desc:"", xp: 5, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 },
      try_new_recipe: {type:"camera",title:"",desc:"", xp: 20, unlocksAt: 10, perDay: 2, perWeek: 0, perMonth:0 },
      random_week_recipe:{type:"camera",title:"",desc:"",xp:100,unlocksAt:20,perDay:0,perWeek:1,perMonth:0},
      // submit_recipe:{type:"camera",title:"",desc:"",xp:50, unlocksAt: 20, perDay:0, perWeek: 1, perMonth:0},
      // create_diet:{type:"",title:"",desc:"",xp:50, unlocksAt: 30, perDay:0, perWeek: 0, perMonth:1},
      host_dinner: {type:"camera",title:"",desc:"", xp: 200, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 },
      random_month_challenge: {type:"timeline",title:"",desc:"", xp: 100, unlocksAt: 40, perDay: 0, perWeek: 1, perMonth:0 },
      cooking_class: {type:"timeline",title:"",desc:"", xp: 350, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    },
    technology: {
      github_commit: {type:"api",title:"",desc:"", xp: 5, unlocksAt: 0, perDay: 10, perWeek: 0, perMonth:0 },
      build_3d_model: {type:"camera",title:"",desc:"",xp : 10, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth: 0},
      electricity_work: {type:"camera",title:"",desc:"", xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth:0 },
      commit_open_src: {type:"api",title:"",desc:"", xp: 10, unlocksAt: 10, perDay: 10, perWeek: 0, perMonth:0 },
      threeD_printing: {type:"camera",title:"",desc:"", xp: 200, unlocksAt: 10, perDay: 0, perWeek: 1, perMonth:0 },
      build_app: {type:"timeline",title:"",desc:"", xp: 250, unlocksAt: 20, perDay: 0, perWeek: 0, perMonth:1 },
      threeD_model_animation: {type:"camera",title:"",desc:"",xp : 30, unlocksAt: 30, perDay: 1, perWeek: 0, perMonth: 0},
      leetcode_challenge: {type:"api",title:"",desc:"", xp: 30, unlocksAt: 40, perDay: 1, perWeek: 0, perMonth:0 },
      attend_tech_conference: {type:"timeline",title:"",desc:"", xp: 350, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 },
      full_stack_app: {type:"timeline",title:"",desc:"",xp : 500, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth: 1},
    },
    games: {
      play_board_game: {type:"camera",title:"",desc:"", xp: 10, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth:0 },
      playtime_hour: {type:"api",title:"",desc:"", xp: 5, unlocksAt: 0, perDay: 10, perWeek: 0, perMonth:0 },
      sports_practive: { type:"camera",title:"",desc:"",xp: 10, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 },
      sports_match: {type:"timeline",title:"",desc:"", xp: 30, unlocksAt: 10, perDay: 0, perWeek: 3, perMonth:0 },
      game_achievement: {type:"api",title:"",desc:"", xp: 10, unlocksAt: 20, perDay: 2, perWeek: 0, perMonth:0 },
      stream_time: {type:"api",title:"",desc:"", xp: 10, unlocksAt: 25, perDay: 10, perWeek: 0, perMonth:0 },
      tabletop_rpg: {type:"timeline",title:"",desc:"", xp: 150, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 },
      tournament: {type:"timeline",title:"",desc:"", xp: 500, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 },
      full_completion: {type:"api",title:"",desc:"", xp: 250, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    },
    language: {
      daily_duolingo: {type:"api",title:"",desc:"", xp: 20, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 },
      daily_reading: {type:"log",title:"",desc:"",xp: 5, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth: 0},
      converse_foreign_language: {type:"log",title:"",desc:"", xp: 5, unlocksAt: 10, perDay: 2, perWeek: 0, perMonth:0 },
      watch_foreign_movie: {type:"camera",title:"",desc:"", xp: 25, unlocksAt: 20, perDay: 1, perWeek: 0, perMonth:0 },
      read_foreign_book: {type:"log",title:"",desc:"", xp: 10, unlocksAt: 30, perDay: 1, perWeek: 0, perMonth:0 },
      duolingo_month: {type:"api",title:"",desc:"", xp: 100, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 },
      travel_foreign_country: {type:"timeline",title:"",desc:"", xp: 1000, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 },
      // record_speaking_language: {type:"",title:"",desc:"", xp: 50, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth:0 },
      // master_language_exam: {type:"exam",title:"",desc:"", xp: 250, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    },
    humanity: {
      vote: {type:"camera",title:"",desc:"",xp: 1000, unlocksAt: 0, perDay: 0, perMonth: 0},
      create_art: {type:"camera",title:"",desc:"",xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth: 0},
      create_music: {type:"upload",title:"",desc:"",xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth: 0},
      volunteer_event: {type:"gps",title:"",desc:"", xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth:0 },
      attend_live_show: {type:"timeline",title:"",desc:"", xp: 100, unlocksAt: 10, perDay: 0, perWeek: 0, perMonth:1 },
      visit_museum: {type:"gps",title:"",desc:"", xp: 100, unlocksAt: 20, perDay: 0, perWeek: 1, perMonth:0 },
      attend_art_show: {type:"timeline",title:"",desc:"", xp: 250, unlocksAt: 30, perDay: 0, perWeek: 0, perMonth:1 },
      attend_church:{type:"camera",title:"",desc:"",xp: 100, unlocksAt: 35, perDay: 0, perWeek: 1, perMonth: 0},
      organize_charity: {type:"timeline",title:"",desc:"", xp: 350, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 },
      present_art_show: {type:"timeline",title:"",desc:"", xp: 1000, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    }
  })

  const [skillsList,setSkillsList] = useState([
    {title:"Family",color:"#ff0000",flare:"Calls - Visits - Reunions",level:99},
    {title:"Friends",color:"#ff8400",flare:"Events - Meetups - Dates",level:12},
    {title:"Fitness",color:"#ffea00",flare:"Gyms - Runs - Routines",level:8},
    {title:"Earthcraft",color:"#4dff00",flare:"Plants - Animals - Outdoors",level:60},
    {title:"Cooking",color:"#00ff80",flare:"Recipes - Dieting - Baking",level:50},
    {title:"Technology",color:"#00fffb",flare:"Code - Electronics - 3D",level:75},
    {title:"Games",color:"#0080ff",flare:"Tabletop - Video - Sports",level:15},
    {title:"Language",color:"#7700ff",flare:"Duolingo - Travel - Reading",level:10},
    {title:"Humanity",color:"#c800ff",flare:"Activism - Volunteering - Arts",level:20},
  ]);

  const [trophyData,setTrophyData] = useState([
    {title:"Titan of Steel",progressQTY:21,imgPath:require('./IconBin/TrophyPNG/goblet1.png'),tier:"Bronze",desc:"Go to the gym for 21 days straight without missing a single day.",unlocked:false},
    {title:"Uphill Battle",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/gem1.png'),tier:"Silver",desc:"Go to the gym for at least 100 days out of the year. Counter starts Jan 1.",unlocked:false},
    {title:"Progress of Pain",progressQTY:200,imgPath:require('./IconBin/TrophyPNG/number1.png'),tier:"Gold",desc:"Go to the gym for at least 200 days of the year. Counter starts and ends Jan 1.",unlocked:false},
    {title:"Sisyphus' Prized Work",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/pedistal1.png'),tier:"Gold",desc:"Log into ARL at the gym 1,000 times.",unlocked:false},
    {title:"Marathon's March",progressQTY:1000, imgPath:require('./IconBin/TrophyPNG/gem2.png'), tier:"Silver", desc:"Run or walk a total of 1,000 miles tracked in ARL.", unlocked:false},
    {title:"Martial Master",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant2.png'),tier:"Silver",desc:"Earn a new belt in a martial art. Any rank-up counts.",unlocked:false},
    {title:"26.2",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/gem3.png'), tier:"Gold", desc:"Run and complete a Marathon", unlocked:false},
    {title:"Powerhouse",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/simple1.png'), tier:"Gold", desc:"Lift & Upload a combined weight of 25,000 lbs in under an hour. Any lift counts.", unlocked:false},
    {title:"Resolution Revolution I",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star1.png'),tier:"Silver",desc:"Log 365 exercises into ARL",unlocked:false},

    {title:"Resolution Revolution II",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star3.png'),tier:"Silver",desc:"Cook & Log 365 total dinners.",unlocked:false},
    {title:'Grandma Would Be Proud',progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Gold",desc:"Cook & Log 1,000 total meals.",unlocked:false},
    {title:"Cooking Contributor",progressQTY:25,imgPath:require('./IconBin/TrophyPNG/shield1.png'),tier:"Silver",desc:"Cook & Upload 25 different meal recipes.",unlocked:false},
    {title:"Family Feast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star2.png'),tier:"Bronze",desc:"Cook & Upload a holiday dinner with at least 6 family members in attendance.",unlocked:false},

    {title:"Numb Fingers",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/elegant3.png'),tier:"Gold",desc:"Make 1000 contributions to Github tracked through ARL.",unlocked:false},
    {title:"Bearing FAANGs",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star4.png'),tier:"Silver",desc:"Make an app for the iOS and Google Play store.",unlocked:false},
    {title:"Internet Property",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person4.png'),tier:"Bronze",desc:"Create & host your own domain name server. HTTPS required.",unlocked:false},
    {title:"Digital Playground",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gear.png'),tier:"Silver",desc:"Develop & release your own game onto Steam, The Web, or both App Stores",unlocked:false},
    {title:"Core Contributor",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple4.png'), tier:"Bronze", desc:"Contribute to 10 different open-source projects.", unlocked:false},

    {title:"Gamer with Taste",progressQTY:50,imgPath:require('./IconBin/TrophyPNG/simple5.png'),tier:"Bronze",desc:"Play 50 different Steam games for 10 hours each.",unlocked:false},
    {title:"Above & Beyond",progressQTY:2500,imgPath:require('./IconBin/TrophyPNG/shield2.png'),tier:"Gold",desc:"Unlock 2,500 Steam achievements",unlocked:false},
    {title:"The Grind",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/gem4.png'),tier:"Silver",desc:"Play 1,000 hours in Steam one year. Counter starts Jan 1",unlocked:false},
    {title:"Gotta Go Fast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/number2.png'),tier:"Gold",desc:'Hold the world record in any video game that is considered "speed-runable"',unlocked:false},
    {title:"Cant Stop Wont Stop",progressQTY:24,imgPath:require('./IconBin/TrophyPNG/gem5.png'),tier:"Bronze",desc:"Play a single game for 24 hours straight.",unlocked:false},

    {title:"Lightfoot Traveler",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant4.png'),tier:"Bronze",desc:"Visit any foreign country.",unlocked:false},
    {title:"Globe Trotter",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple6.png'), tier:"Gold", desc:"Visit 10 different countries and check-in via ARL.", unlocked:false},
    {title:"Artistic Soul",progressQTY:20, imgPath:require('./IconBin/TrophyPNG/gem6.png'), tier:"Bronze", desc:"Visit & Check in at 20 different art museums and galleries.", unlocked:false},
    {title:"Social Butterfly",progressQTY:150, imgPath:require('./IconBin/TrophyPNG/mirror2.png'), tier:"Silver", desc:"Attend & Check in at 150 different social events or meetups. Family and/or Friends", unlocked:false},
    {title:"All Abord",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/steering1.png'),tier:"Silver",desc:"Take a roadtrip totaling at least 1,000 miles over the course of one week.",unlocked:false},

    {title:"Family Reunion",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/star5.png'), tier:"Gold", desc:"Organize & Upload a family reunion with at least 15 members.", unlocked:false},
    {title:"Ring Ring",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/pedistal2.png'), tier:"Bronze", desc:"Make 100 calls to close friends or loved ones.", unlocked:false},
    {title:"Game of Life",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Bronze",desc:"Host a family game night with 3 generations present.",unlocked:false},
    {title:"Clean Leader",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star6.png'),tier:"Bronze",desc:"Host a family cleanup of the entire house.",unlocked:false},

    {title:"Hands of Bronze",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/gem7.png'), tier:"Bronze", desc:"Volunteer for 100+ hours in community service.", unlocked:false},
    {title:"Eyes of Silver",progressQTY:50, imgPath:require('./IconBin/TrophyPNG/star7.png'), tier:"Silver", desc:"Create & Upload 50 physical pieces of art that you have created.", unlocked:false},
    {title:"Voice of Gold",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person1.png'),tier:"Gold",desc:"Act in a play or perform live music, on a stage in front of an audience.",unlocked:false},
    {title:"Decoration of Space",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gem8.png'),tier:"Silver",desc:"Create & Display a piece of physical art at a public art gallery.",unlocked:false},
    {title:"Decoration of Time",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star8.png'),tier:"Silver",desc:"Upload an album of at least 12 songs into Soundcloud",unlocked:false},

    {title:"Lost in Nature",progressQTY:15,imgPath:require('./IconBin/TrophyPNG/goblet3.png'),tier:"Bronze",desc:"Hike 15 different non-vehicle trails.",unlocked:false},
    {title:"Finding Nature",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Hike 100 miles on non-vehicle trails.",unlocked:false},
    {title:"Chief Trailfoot",progressQTY:500,imgPath:require('./IconBin/TrophyPNG/star10.png'),tier:"Gold",desc:"Hike 500 miles on non-vehicle trails.",unlocked:false},
    {title:"Butcher & Shepherd",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield3.png'),tier:"Gold",desc:"Construct & maintain your own animal livestock collection of at least 12 animals.",unlocked:false},
    {title:"Of The Earth",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield4.png'),tier:"Bronze",desc:"Plant & harvest from a vegetable garden of at least 4 species.",unlocked:false},
    {title:"Nature's Friend",progressQTY:25, imgPath:require('./IconBin/TrophyPNG/person2.png'), tier:"Bronze", desc:"Plant & Upload 25 unique species plants of any shape or size.", unlocked:false},
    {title:"Nature's Steward",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/person3.png'), tier:"Silver", desc:"Plant & Upload 100 unique species plants of any shape or size.", unlocked:false},
    {title:"Off The Pipeline",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Construct & Upload a functioning rainwater collection system.",unlocked:false},
    // {title:"Save The Bees",imgPath:require('./IconBin/TrophyPNG/trophyAndMedal.png'),tier:"Silver",desc:"Set up & Maintain a small beekeeping hive.",unlocked:false},
    // {title:"Earth's Beautiful Surface",imgPath:"",tier:"Bronze",desc:"Participate in an environmental cleanup drive.",unlocked:false},
    // {title:"Earth's Amazing People",imgPath:"",tier:"Gold",desc:"Organize an environmental cleanup drive.",unlocked:false},

  ])

  const [playerData,setPlayerData] = useState({
    userName:"SebTheRed",
    xp:{
      family:1000,
      friends:11,
      fitness:17800,
      earthcraft:140,
      cooking:15000,
      technology:16000,
      games:170,
      language:1500,
      humanity:1800,
    },
    trophies:{
      0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,
      10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false,
      20:false,21:false,22:false,23:false,24:false,25:false,26:false,27:false,28:false,29:false,
      30:false,31:false,32:false,33:false,34:false,35:false,36:false,37:false,38:false,39:false,
      40:false,41:false,42:false,43:false,44:false,45:false,46:false,47:false,48:false,49:false,
    },
  })


const SkillsNav = () => {
  return(
    <SkillStack.Navigator initialRouteName='SkillsMain' screenOptions={{ headerShown: false }}>
      <SkillStack.Screen name="SkillsMain" component={Skills} initialParams={{ skillsList: skillsList, playerData:playerData, XPScale:XPScale }}/>
      <SkillStack.Screen name="Family" initialParams={{skillData:skillsList[0], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Friends" initialParams={{skillData:skillsList[1], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Fitness" initialParams={{skillData:skillsList[2], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      {/* <SkillStack.Screen name="Agility" initialParams={{skillData:skillsList[3]}} component={SkillsPage} ></SkillStack.Screen> */}
      <SkillStack.Screen name="Earthcraft" initialParams={{skillData:skillsList[3], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Cooking" initialParams={{skillData:skillsList[4], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Technology" initialParams={{skillData:skillsList[5], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Games" initialParams={{skillData:skillsList[6], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Language" initialParams={{skillData:skillsList[7], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Humanity" initialParams={{skillData:skillsList[8], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
    </SkillStack.Navigator>
  )
  
}


  // const isDarkMode = useColorScheme() === 'dark';
  return (
<SafeAreaView style={styles.backgroundStyle}>
  <NavigationContainer>
      <HeaderBar />
      <Stack.Navigator initialRouteName='Skills' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Skills" component={SkillsNav} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Trophies" initialParams={{trophyData: trophyData}} component={Trophies} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <BottomBar/>
  </NavigationContainer>
</SafeAreaView>
  );
}



export default App;
