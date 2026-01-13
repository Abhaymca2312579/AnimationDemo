import 'react-native-gesture-handler'; // MUST be at top

import React from 'react';
import { View, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <LoginScreen />
    </View>
  );
};

export default App;
