/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import type {PropsWithChildren} from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationContainer, StackActions,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Skills from './Pages/Skills/Skills';
import SkillsPage from './Pages/Skills/SkillsPage'
import Stats from './Pages/Stats';
import Map from './Pages/Map/Map';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile'
import Trophies from './Pages/Trophies/Trophies'
import HeaderBar from './Overlays/HeaderBar';
import { useState } from 'react';
import styles from './styles';
import Feed from './Pages/Feed/Feed';
import Login from './Pages/Login/Login'
import SignUp from './Pages/Login/SignUp';
import { UIDProvider } from './Contexts/UIDContext';
import { FeedProvider } from './Contexts/FeedContext';
import {CurrentEventProvider} from './Contexts/CurrentEventContext'
import {ProfilePageUIDProvider} from './Contexts/ProfilePageUID'
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
import Geolocation from '@react-native-community/geolocation';
import BottomBar from './Overlays/BottomBar';
import { useEffect, } from 'react';
import { useUID } from './Contexts/UIDContext';
import ExperienceUploader from './Pages/Skills/ExperienceUploader';
import {db} from './Firebase/firebase'
import {UserDataProvider, useUserData} from './Contexts/UserDataContext';
import UserPassPopup from './Pages/Profile/UserPassPopup';
const Stack = createStackNavigator();
const SkillStack = createStackNavigator();
const AuthStack = createStackNavigator();
type RootStackParamList = {
  Profile: undefined;
  Map: undefined;
  Skills: undefined;
  Stats: undefined;
  Trophies: undefined;
};


////// COMPONENT FUNCTION BEGINNING //////
function App(): JSX.Element {
  const [isWaitingUserData,setIsWaitingUserData] = useState(false)
  const [userGeoData,setUserGeoData] = useState({})
  const [arrayOPlaces, setArrayOPlaces] = useState({
    parks:[],
    gyms:[],
    restaurants:[],
  })
  
  
  useEffect(()=>{
  Geolocation.getCurrentPosition(info => {
    console.log(info.coords.latitude, info.coords.longitude);
    console.log("coords received")
    setUserGeoData({latitude:info.coords.latitude, longitude:info.coords.longitude})
    // fetchPlaces(info.coords.latitude, info.coords.longitude)
  });
  },[])
  

  const [XPScale, setXPScale] = useState({
    1: 0, 2: 10, 3: 50, 4: 100, 5: 180, 6: 315, 7: 420, 8: 540, 9: 675, 10: 825,
    11: 990, 12: 1170, 13: 1365, 14: 1575, 15: 1800, 16: 2040, 17: 2295, 18: 2565, 19: 2850, 20: 3150,
    21: 3465, 22: 3795, 23: 4140, 24: 4500, 25: 4875, 26: 5265, 27: 5670, 28: 6090, 29: 6525, 30: 6975,
    31: 7440, 32: 7920, 33: 8415, 34: 8925, 35: 9450, 36: 9990, 37: 10545, 38: 11115, 39: 11700, 40: 12300,
    41: 12915, 42: 13545, 43: 14190, 44: 14850, 45: 15525, 46: 16215, 47: 16920, 48: 17640, 49: 18375, 50: 19125,
    51: 19890, 52: 20670, 53: 21465, 54: 22275, 55: 23100, 56: 23940, 57: 24795, 58: 25665, 59: 26550, 60: 27450,
    61: 28365, 62: 29295, 63: 30240, 64: 31200, 65: 32175, 66: 33165, 67: 34170, 68: 35190, 69: 36225, 70: 37275,
    71: 38340, 72: 39420, 73: 40515, 74: 41625, 75: 42750, 76: 43890, 77: 45045, 78: 46215, 79: 47400, 80: 48600,
    81: 49815, 82: 51045, 83: 52290, 84: 53550, 85: 54825, 86: 56115, 87: 57420, 88: 58740, 89: 60075, 90: 61425,
    91: 62790, 92: 64170, 93: 65565, 94: 66975, 95: 68400, 96: 69840, 97: 71295, 98: 72765, 99: 74250, 100: 100000,
});

  const [XPTriggerEvents,setXPTriggerEvents] = useState({
    family:{
      call_loved_one: {type:"log",title:"Call a Loved One",desc:"Place a phone call to a starred or favorited contact in your phone." ,xp: 5, unlocksAt: 0, perDay: 3 , perWeek: 0, perMonth: 0,lockedBy:""},
      family_photo: {type:"camera",title:"Take a Family Photo",desc:"Take a picture with you & 2 other family members.",xp: 10, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth: 0,lockedBy:""},
      send_letter: {type:"camera",title:"Send a Letter",desc:"Send a letter to anyone! Receiving a letter must mean that they're family!", xp: 5, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      visit_relative: {type:"camera",title:"Visit a Relative",desc:"Visit a family member who you don't live with.", xp: 10, unlocksAt: 5, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      organize_reunion: {type:"timeline",title:"Family Reunion",desc:"Organize & attend a family reunion of at least 3 generations present.", xp: 100, unlocksAt: 10, perDay:0, perWeek:0, perMonth:1,lockedBy:""},
      help_with_chores: {type:"camera",title:"Chore Time",desc:"Help a family member with one of their chores.", xp: 15, unlocksAt: 15, perDay:2, perWeek:0, perMonth:0,lockedBy:""},
      family_game_night: {type:"camera",title:"Game Night!",desc:"Attend a family game night with at least 4 members.", xp: 20, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      family_trip: {type:"timeline",title:"Family Vacation",desc:"Attend & document a family vacation.", xp: 150, unlocksAt: 30, perDay:0, perWeek:0, perMonth:1,lockedBy:""},
      weekly_family_meeting: {type:"camera",title:"Weekly Family Zoom",desc:"Organize & attend a family zoom meeting.", xp: 50, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      house_project: {type:"timeline",title:"House Project",desc:"Design & document a large project that involves many members of your family.", xp: 200, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1,lockedBy:""}
    },
    friends: {
      message_with_friends: {type:"log",title:"Message with Friends",desc:"Log about a conversation you had with a friend today.", xp: 5, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0,lockedBy:""},
      call_friend: {type:"log",title:"Call a Friend.",desc:"Log about a phone call you had with a friend today.", xp: 5, unlocksAt: 0, perDay: 2, perWeek:0, perMonth: 0,lockedBy:""},
      coffee_shop: {type:"camera",title:"Cafe Love",desc:"Spend time at any coffee shop, and take a picture of your order.", xp: 10, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      date_night: {type:"timeline",title:"Date Night",desc:"Take your significant other out for a night on the town.", xp: 15, unlocksAt: 5, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      restaurant_bar: {type:"camera",title:"Out on the Town",desc:"Spend time at any restaurant / bar / brewery.", xp: 15, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      movie_theater: {type:"camera",title:"Movie Night",desc:"Spend some time watching a movie at a theater. Be sure to turn off your phone during the film!", xp: 30, unlocksAt: 20, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      attend_private_party: {type:"timeline",title:"Private Party",desc:"Have a party of at least 4 friends.",xp: 40, unlocksAt: 25, perDay: 0, perWeek: 1, perMonth: 0,lockedBy:""},
      attend_club_meeting: {type:"camera",title:"Private Club",desc:"Check in with the Map at your club's meeting.", xp: 50, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      surprise_party: {type:"timeline",title:"Surprise Party",desc:"Attend a surprise party for any celebration.", xp: 150, unlocksAt: 40, perDay:0, perWeek:0, perMonth:1,lockedBy:""},
      friends_road_trip: {type:"timeline",title:"Road Trip!",desc:"Take a roadtrip totaling 3 destinations with at least 1 friend or significant other.", xp: 200, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1,lockedBy:""},
    },
    fitness: {
      daily_pushups: {type:"log",title:"Daily Pushups",desc:"Perform a slowly incrementing number of pushups every day.", xp: 10, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      stretching_routine: {type:"log",title:"Stretch it Out",desc:"Log yes or no to doing stretches in the morning and at night.", xp: 5, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0,lockedBy:""},
      walking: {type:"acceleration",title:"Go for a Walk",desc:"Go for a walk. Be sure to press start when you begin or it won't count!", xp: 20, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0,lockedBy:""},
      attend_gym: {type:"camera",title:"Go to the Gym",desc:"Spend time at any gym. Use this as motivation.", xp: 10, unlocksAt: 10, perDay:2, perWeek:0, perMonth:0,lockedBy:""},
      running: {type:"acceleration",title:"Runner's High",desc:"Go for a run. Be sure to press start when you begin!", xp: 20, unlocksAt: 10, perDay:2, perWeek:0, perMonth:0,lockedBy:""},
      yoga_at_home: {type:"camera",title:"Home Yoga Studio",desc:"Complete a yoga exercise in the warmth of your home.", xp: 15, unlocksAt: 15, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      attend_fitness_class: {type:"camera",title:"Fitness Class",desc:"Complete a fitness class.", xp: 20, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0},
      achieve_pr: {type:"timeline",title:"Personal Record",desc:"Accomplish & document a person record of any category.", xp: 100, unlocksAt: 30, perDay:0, perWeek:0, perMonth:1,lockedBy:""},
      run_5k: {type:"acceleration",title:"Five Kilometers",desc:"Run 3.2 miles. Be sure to press start when you begin!", xp: 50, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      belt_rank: {type:"timeline",title:"Martial Master",desc:"Ascend in belt rank at an official martial arts academy.", xp: 150, unlocksAt: 40, perDay:0, perWeek:0, perMonth:1,lockedBy:""},
      attendance_streak: {type:"camera",title:"Can't Stop Won't Stop",desc:"Attend gyms/classes/exercises for 5 of 7 days in a week.",xp: 100, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth: 0,lockedBy:""}
    },
    earthcraft: {
      plant_tree: {type:"camera",title:"Plant a Tree",desc:"Plant a tree and log its species.", xp: 5, unlocksAt: 0, perDay:5, perWeek:0, perMonth:0,lockedBy:""},
      new_plant: {type:"camera",title:"New House Plant",desc:"Acquire a new house plant.", xp: 10, unlocksAt: 0, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      nature_hike: {type:"acceleration",title:"The Great Outdoors",desc:"Hike/Bike/Climb/Be in any area considered nature.", xp: 10, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      water_garden: {type:"log",title:"Water your Plants",desc:"Log that you watered your plants. Treat this as a reminder to do so!", xp: 5, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      bird_watch: {type:"camera",title:"Bird Watching",desc:"Snap a picture of a bird that you can see and identify it.",xp: 5, unlocksAt: 10, perDay: 2, perWeek: 0, perMonth: 0,lockedBy:""},
      community_garden: {type:"timeline",title:"Community Gardening",desc:"Help cultivate your community garden.", xp: 30, unlocksAt: 20, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      clean_up_event: {type:"timeline",title:"Community Cleanup",desc:"Clean up your community, with your community! 4 members are required.", xp: 100, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      camping: {type:"timeline",title:"Camping Trip",desc:"Spend the night in any area considered nature on the Map.", xp: 50, unlocksAt: 35, perDay:0, perWeek:1, perMonth:0,lockedBy:""},
      compost: {type:"log",title:"Composting",desc:"Log whether or not you've composted your food remains today.", xp: 10, unlocksAt: 40, perDay:1, perWeek:0, perMonth:0,lockedBy:""},
      outdoor_project: {type:"timeline",title:"Outdoors Project",desc:"Imagine & create something outdoors. Let your imagination run wild!",xp: 150, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth: 1,lockedBy:""},
      wildlife_park: {type:"camera",title:"Natural Parks",desc:"Spend time in any of this great nation's National Parks.", xp: 200, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1,lockedBy:""}
    },
    cooking: {
      make_meal: {type:"camera",title:"Cook a Meal",desc:"Cook a meal & label what it is.", xp: 5, unlocksAt: 0, perDay: 3, perWeek: 0, perMonth:0 ,lockedBy:""},
      bake: {type:"camera",title:"Bake Something",desc:"Bake anything & label what it is.", xp: 5, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth:0 ,lockedBy:""},
      try_new_recipe: {type:"camera",title:"Unique Recipe",desc:"Document unique recipe than any you previously have.", xp: 20, unlocksAt: 10, perDay: 1, perWeek: 0, perMonth:0 ,lockedBy:""},
      random_week_recipe:{type:"camera",title:"Weekly Recipe",desc:"Cook the assigned weekly recipe.",xp:30,unlocksAt:20,perDay:0,perWeek:1,perMonth:0},
      host_dinner: {type:"camera",title:"Host a Dinner Party",desc:"Host a dinner party for yourself and 4 other family or friends!", xp: 50, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 ,lockedBy:""},
      random_month_challenge: {type:"timeline",title:"Monthly Challenge",desc:"Complete the monthly challenge.", xp: 150, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""},
      cooking_class: {type:"timeline",title:"Cooking Class",desc:"Host or attend a cooking class.", xp: 200, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""}
    },
    technology: {
      github_commit: {type:"api",title:"Git Commit",desc:"Commit code to a github repository. Requires Github linking.", xp: 5, unlocksAt: 0, perDay: 10, perWeek: 0, perMonth:0 },
      build_3d_model: {type:"camera",title:"3D Model",desc:"Show off a 3D model you made.",xp : 3, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth: 0},
      electricity_work: {type:"camera",title:"Electricity Work",desc:"Work with live electricity in any capacity.", xp: 10, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth:0 },
      commit_open_src: {type:"api",title:"Open Source",desc:"Commit code to a public github repository.", xp: 2, unlocksAt: 10, perDay: 10, perWeek: 0, perMonth:0 },
      threeD_printing: {type:"camera",title:"3D Print",desc:"3D print something and show the world!", xp: 15, unlocksAt: 10, perDay: 0, perWeek: 1, perMonth:0 },
      build_app: {type:"timeline",title:"Computer Application",desc:"Create a basic computer program in any language.", xp: 50, unlocksAt: 20, perDay: 0, perWeek: 0, perMonth:1 },
      threeD_model_animation: {type:"camera",title:"3D Animation",desc:"Animate a 3D model that you created.",xp : 20, unlocksAt: 30, perDay: 1, perWeek: 0, perMonth: 0},
      leetcode_challenge: {type:"api",title:"LeetCode Challenge",desc:"Complete any leetcode challenge you haven't already completed.", xp: 25, unlocksAt: 40, perDay: 1, perWeek: 0, perMonth:0 },
      attend_tech_conference: {type:"timeline",title:"Tech Conference",desc:"Attend a tech conference of any kind. Must take picture of crowd.", xp: 250, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 },
      full_stack_app: {type:"timeline",title:"Full Stack App",desc:"Create and deploy a full stack application. HTTPS required.",xp : 200, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth: 1},
    },
    games: {
      play_board_game: {type:"camera",title:"Tabletop Game",desc:"Play a board or card game with at least 2 other people.", xp: 5, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth:0 ,lockedBy:""},
      playtime_hour: {type:"api",title:"Steam Playtime Hours",desc:"XP for every hour you play a Steam game.", xp: 5, unlocksAt: 0, perDay: 10, perWeek: 0, perMonth:0 ,lockedBy:""},
      sports_practice: { type:"camera",title:"Practice?",desc:"Train in anything that can be considered a physical sport.",xp: 5, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 ,lockedBy:""},
      sports_match: {type:"timeline",title:"Sports Match",desc:"Compete in anything that can be considered a physical sport. Must be at least one other contestant.", xp: 20, unlocksAt: 10, perDay: 0, perWeek: 3, perMonth:0 ,lockedBy:""},
      game_achievement: {type:"api",title:"Video Game Achievement",desc:"Unlock a Steam achievement.", xp: 20, unlocksAt: 20, perDay: 1, perWeek: 0, perMonth:0 ,lockedBy:""},
      stream_time: {type:"api",title:"Stream Time",desc:"Steam yourself gaming! Must connect steaming platform account.", xp: 5, unlocksAt: 25, perDay: 10, perWeek: 0, perMonth:0 ,lockedBy:""},
      tabletop_rpg: {type:"timeline",title:"Play a TTRPG",desc:"Play a tabletop roleplaying game like D&D, either in person or online.", xp: 30, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 ,lockedBy:""},
      tournament: {type:"timeline",title:"Tournament",desc:"Host a gaming or sporting tournament of any kind with 8 participants.", xp: 50, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth:0 ,lockedBy:""},
      live_event: {type:"timeline",title:"Live Sports Event",desc:"Attend a sporting competition in real life. Must take picture of crowd.", xp: 250, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""},
      full_completion: {type:"api",title:"100%'ing The Game",desc:"Achieve 100% of all achievements in any video game.", xp: 50, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth:0 ,lockedBy:""}
    },
    language: {
      daily_duolingo: {type:"api",title:"Daily Duo Lesson",desc:"Complete one duolingo lesson today.", xp: 20, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 ,lockedBy:""},
      daily_reading: {type:"log",title:"Daily Reading",desc:"Read at least one time today.",xp: 5, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth: 0,lockedBy:""},
      converse_foreign_language: {type:"log",title:"Foreign Language Conversation",desc:"Log about a conversation you had in your non-native language.", xp: 5, unlocksAt: 10, perDay: 2, perWeek: 0, perMonth:0 ,lockedBy:""},
      watch_foreign_movie: {type:"camera",title:"Watch Foreign Movie",desc:"Watch a foreign movie.", xp: 25, unlocksAt: 20, perDay: 1, perWeek: 0, perMonth:0 ,lockedBy:""},
      read_foreign_book: {type:"log",title:"Read Foreign Book",desc:"Log about a book you are reading that is written in your non-native language.", xp: 10, unlocksAt: 30, perDay: 1, perWeek: 0, perMonth:0 ,lockedBy:""},
      duolingo_month: {type:"api",title:"Duolingo Month",desc:"Complete your daily Duolingo challenge every day for each month. Counter resets on the 1st.", xp: 100, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""},
      travel_foreign_country: {type:"timeline",title:"Travel to Foreign Country",desc:"Spread your wings! Share your travels with the world.", xp: 250, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""},
      record_speaking_language: {type:"camera",title:"Babbel",desc:"Upload your foreign language skills for the world to hear!", xp: 50, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth:0 ,lockedBy:""},
      // master_language_exam: {type:"exam",title:"",desc:"", xp: 250, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    },
    humanity: {
      vote: {type:"camera",title:"Your Vote Matters",desc:"Cast your vote for an official Federal or State election. Must use the Map.",xp: 2000, unlocksAt: 0, perDay: 0, perMonth: 0,lockedBy:""},
      create_art: {type:"camera",title:"Artist's Hand",desc:"Create your own art and upload it here for the world to enjoy.",xp: 20, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth: 0,lockedBy:""},
      create_music: {type:"camera",title:"Making of the Music",desc:"Play & upload music you have created for the world to hear.",xp: 20, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth: 0,lockedBy:""},
      volunteer_event: {type:"camera",title:"Volunteering",desc:"Get out and give back to your community.", xp: 30, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth:0 },
      attend_live_show: {type:"timeline",title:"Live Show",desc:"Attend a live show of any kind. Must take picture of crowd.", xp: 100, unlocksAt: 10, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""},
      visit_museum: {type:"timeline",title:"Museum Day",desc:"Visit a museum of any kind.", xp: 40, unlocksAt: 20, perDay: 0, perWeek: 1, perMonth:0 },
      attend_art_show: {type:"timeline",title:"Art Show",desc:"Attend an art show, and see if any art is worth your dollar.", xp: 50, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 ,lockedBy:""},
      attend_church:{type:"camera",title:"Holy Day",desc:"Attend any religious gathering.",xp: 50, unlocksAt: 35, perDay: 0, perWeek: 1, perMonth: 0},
      organize_charity: {type:"timeline",title:"Organize Charity Work",desc:"Organize and accomplish charity work with 4+ people including yourself.", xp: 100, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""},
      present_talent: {type:"timeline",title:"Present Your Talent",desc:"Share your art at shows, comedy on a stage, etc. Any real life showing of your art counts!", xp: 200, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 ,lockedBy:""}
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
    {title:"Titan of Steel",progressQTY:21,imgPath:require('./IconBin/TrophyPNG/goblet1.png'),tier:"Bronze",desc:"Log gym attendence for 21 days straight without missing a single day."},
    {title:"Fitness Fanatic",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/gem1.png'),tier:"Silver",desc:"Log gym attendence for at least 100 days out of the year. Counter starts Jan 1."},
    {title:"Golden Devotion",progressQTY:200,imgPath:require('./IconBin/TrophyPNG/number1.png'),tier:"Gold",desc:"Log gym attendence for at least 200 days of the year. Counter starts and ends Jan 1."},
    {title:"Sisyphus' Prized Work",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/pedistal1.png'),tier:"Gold",desc:"Log 1,000 gym posts on ARL"},
    {title:"Marathon's March",progressQTY:1000, imgPath:require('./IconBin/TrophyPNG/gem2.png'), tier:"Silver", desc:"Run or walk & Log a total of 1,000 miles tracked on ARL.",},
    {title:"Martial Master",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant2.png'),tier:"Gold",desc:"Place top 3 in a large martial arts contest. Log yourself with your trophy."},
    {title:"26.2",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/gem3.png'), tier:"Gold", desc:"Run and complete a Marathon. Log yourself at the finish line."},
    {title:"Yoga Yogi",progressQTY:1000, imgPath:require('./IconBin/TrophyPNG/simple1.png'), tier:"Gold", desc:"Log 1000 at home yoga posts.",},
    {title:"Exercise Enthusiast",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star1.png'),tier:"Silver",desc:"Log 365 exercises into ARL"},

    {title:"Chef of the Year",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star3.png'),tier:"Silver",desc:"Cook & Log 365 total meals."},
    {title:'Cooking Connoisseur',progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Gold",desc:"Cook & Log 1,000 total meals."},
    {title:"Iron Chef",progressQTY:25,imgPath:require('./IconBin/TrophyPNG/shield1.png'),tier:"Silver",desc:"Cook & Log 25 different weekly challenge recipes."},
    {title:"Family Feast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star2.png'),tier:"Bronze",desc:"Cook & Log a holiday dinner with at least 6 family members in attendance."},

    {title:"Code Crusader",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/elegant3.png'),tier:"Gold",desc:"Make & Log 1000 contributions to Github tracked through ARL."},
    {title:"Bearing FAANGs",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star4.png'),tier:"Silver",desc:"Make & Log an app for the iOS and Google Play store."},
    {title:"Internet Property",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person4.png'),tier:"Bronze",desc:"Create and host your own domain name server. Log the link (HTTPS required)."},
    {title:"Digital Playground",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gear.png'),tier:"Silver",desc:"Develop & release your own game onto Steam, The Web, or both App Stores. Log the link."},
    {title:"Web3 Wizard",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/simple4.png'), tier:"Bronze", desc:"Purchase & Hold an NFT. Log your 1/1 claim.",},

    {title:"Gamer with Taste",progressQTY:50,imgPath:require('./IconBin/TrophyPNG/simple5.png'),tier:"Silver",desc:"Play 50 different Steam games for 10 hours each."},
    {title:"Steam Star",progressQTY:2500,imgPath:require('./IconBin/TrophyPNG/shield2.png'),tier:"Gold",desc:"Unlock 2,500 Steam achievements"},
    {title:"The Grind",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/gem4.png'),tier:"Silver",desc:"Play & Log 1,000 hours in Steam one year. Counter starts Jan 1"},
    {title:"Gotta Go Fast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/number2.png'),tier:"Gold",desc:'Prove by posting that you own the world record speedrun in any video game.'},
    {title:"Can't Pause This Game",progressQTY:30,imgPath:require('./IconBin/TrophyPNG/gem5.png'),tier:"Bronze",desc:"Play a video game every day for at least 1 hour, for 30 days straight."},

    {title:"Lightfoot Traveler",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant4.png'),tier:"Bronze",desc:"Visit & Log any foreign country."},
    {title:"Globe Trotter",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple6.png'), tier:"Gold", desc:"Visit & Log 10 different countries.",},
    {title:"Gallery Guru",progressQTY:20, imgPath:require('./IconBin/TrophyPNG/gem6.png'), tier:"Bronze", desc:"Visit & Log in at 20 different art museums and galleries.",},
    {title:"Social Butterfly",progressQTY:200, imgPath:require('./IconBin/TrophyPNG/mirror2.png'), tier:"Silver", desc:"Attend & Log in at 200 different social events or meetups. Family and/or Friends",},
    {title:"All Abord",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/steering1.png'),tier:"Silver",desc:"Organize & Log a family or friends road trip with at least 3 other people. Make it huge!"},

    {title:"Family Reunion",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/star5.png'), tier:"Gold", desc:"Organize & Log a family reunion with at least 15 family members.",},
    {title:"Checking In",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/pedistal2.png'), tier:"Bronze", desc:"Log 100 calls to close friends or loved ones.",},
    {title:"Game of Life",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Bronze",desc:"Log a family game night with 3 generations present."},
    {title:"Cleanup Captain",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star6.png'),tier:"Bronze",desc:"Organize & Log a family cleanup of the entire house."},

    {title:"Hands of Bronze",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/gem7.png'), tier:"Bronze", desc:"Volunteer & Log 10 service events, without any pay.",},
    {title:"Eyes of Silver",progressQTY:50, imgPath:require('./IconBin/TrophyPNG/star7.png'), tier:"Silver", desc:"Create & Log 50 physical pieces of art that you have created.",},
    {title:"Voice of Gold",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person1.png'),tier:"Gold",desc:"Log your acting in a play or performance of any kind, on a stage in front of an audience."},
    {title:"Decoration of Space",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gem8.png'),tier:"Silver",desc:"Display & Log a piece of physical art at a public art gallery."},
    {title:"Decoration of Time",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star8.png'),tier:"Bronze",desc:"Link & Log an album of at least 12 songs that you created into Soundcloud"},

    {title:"Lost in Nature",progressQTY:50,imgPath:require('./IconBin/TrophyPNG/goblet3.png'),tier:"Bronze",desc:"Log 50 outdoor experiences."},
    {title:"Finding Nature",progressQTY:200,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Log 200 outdoor experiences."},
    {title:"One with Nature",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/star10.png'),tier:"Gold",desc:"Log 1,000 outdoor experiences"},
    {title:"Butchers & Shepherds",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield3.png'),tier:"Silver",desc:"Construct & Log your own animal livestock collection."},
    {title:"Of The Earth",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield4.png'),tier:"Bronze",desc:"Cultivate & Log a vegetable garden of at least 4 species."},
    {title:"Nature's Friend",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/person2.png'), tier:"Bronze", desc:"Plant & Log 100 unique trees of any shape or size.",},
    {title:"Nature's Steward",progressQTY:30, imgPath:require('./IconBin/TrophyPNG/person3.png'), tier:"Silver", desc:"Volunteer & Log 30 different community cleanups.",},
    {title:"Off The Grid",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Construct & Log a functioning rainwater collection system."},
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
    <SkillStack.Navigator initialRouteName='SkillsMain' screenOptions={{ headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,}}>
      <SkillStack.Screen name="SkillsMain" component={Skills} initialParams={{skillsList: skillsList, playerData:playerData,XPScale:XPScale }}/>
      <SkillStack.Screen name="Family" initialParams={{skillData:skillsList[0], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Friends" initialParams={{skillData:skillsList[1], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Fitness" initialParams={{skillData:skillsList[2], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Earthcraft" initialParams={{skillData:skillsList[3], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Cooking" initialParams={{skillData:skillsList[4], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Technology" initialParams={{skillData:skillsList[5], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Games" initialParams={{skillData:skillsList[6], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Language" initialParams={{skillData:skillsList[7], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Humanity" initialParams={{skillData:skillsList[8], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="ExperienceUploader" component={ExperienceUploader}></SkillStack.Screen>
    </SkillStack.Navigator>
  )
  
}


const AuthApp = ()=>{
  const {userData}:any = useUserData()
  // console.log("authapp, ", userData)
  if (Object.values(userData).length>0) {
    return(
      <>
        <HeaderBar />
          <Stack.Navigator initialRouteName='Skills' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Skills"  component={SkillsNav} />
            <Stack.Screen name="Stats"  component={Stats} />
            <Stack.Screen name="Trophies" initialParams={{trophyData: trophyData,}} component={Trophies} />
            <Stack.Screen name="Map" initialParams={{userGeoData: userGeoData, arrayOPlaces: arrayOPlaces,}} component={Map} />
            <Stack.Screen name="Feed" initialParams={{skillsList: skillsList}} component={Feed} />
            <Stack.Screen name="Profile" initialParams={{skillsList:skillsList, XPScale, trophyData}} component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="UserPassPopup" component={UserPassPopup} />
          </Stack.Navigator>
        <BottomBar/>
      </>
    )
  } else {
    return(
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
          <Text>LOADING</Text>
        </ScrollView>
    )
  }
}

  return(
    <UIDProvider>
      <UserDataProvider>
        <ProfilePageUIDProvider>
        <CurrentEventProvider>
          <FeedProvider>
            <SafeAreaView style={styles.backgroundStyle}>
              <NavigationContainer >
                <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                  <AuthStack.Screen name="Login" component={Login}/>
                  <AuthStack.Screen name="AuthedApp" component={AuthApp} />
                  <AuthStack.Screen name="SignUp" component={SignUp} />
                </AuthStack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </FeedProvider>
        </CurrentEventProvider>
        </ProfilePageUIDProvider>
      </UserDataProvider>
    </UIDProvider>
  )
}



export default App;


  
  // const apiKey = 'AIzaSyARFSBf48RxnNhBWxtQZbCGEhlLm9yfvCk';
  // const fetchPlaces = async (latitude, longitude) => {
  //   console.log(latitude,longitude)
  //   const parkUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=park&key=${apiKey}`;
  //   const gymUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=gym&key=${apiKey}`;
  //   const restaurantUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=restaurant&key=${apiKey}`;
  //   const theaterUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=coffee&key=${apiKey}`;
  //   // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=nature_reserve&key=${apiKey}`;
  //   // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=&key=${apiKey}`;
  //   const parkResponse = await fetch(parkUrl);
  //   const parkData = await parkResponse.json();

  //   const gymResponse = await fetch(gymUrl);
  //   const gymData = await gymResponse.json();

  //   const restaurantReponse = await fetch(restaurantUrl);
  //   const restauarantData = await restaurantReponse.json();

  //   const coffeeResponse = await fetch(theaterUrl);
  //   const coffeeData = await coffeeResponse.json();

  //   let assembler = {
  //     parks:parkData.results,
  //     gyms:gymData.results,
  //     restaurants:restauarantData.results,
  //     coffee:coffeeData.results,
  //   }

  //   setArrayOPlaces(assembler)
  //   // return data.results; // This will be an array of places
  // };