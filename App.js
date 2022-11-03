/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

} from 'react-native/Libraries/NewAppScreen';
import Donut from './Components/Donut';

const App = () => {
  
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:'rgba(0,0,0,0.9)',alignItems:'center'}}>
      <View style={{width:'90%',overflow:'hidden',borderRadius:20,height:400,justifyContent:'center',alignSelf:'center'}}>
        <Donut radius={100}/>
      </View>
    </SafeAreaView>
  );
};


export default App;
