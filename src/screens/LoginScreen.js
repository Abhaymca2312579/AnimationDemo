// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import Animated, { useAnimatedStyle } from 'react-native-reanimated';
// import { useFadeIn } from '../animations/useFadeIn';
// import AnimatedButton from '../components/AnimatedButton';

// const LoginScreen = () => {
//   const { opacity, startFadeIn } = useFadeIn();

//   const animatedStyle = useAnimatedStyle(() => ({
//     opacity: opacity.value,
//   }));

//   useEffect(() => {
//     startFadeIn();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
//       <Animated.View style={animatedStyle}>
//         <Text
//           style={{
//             fontSize: 26,
//             textAlign: 'center',
//             marginBottom: 20,
//           }}
//         >
//           Welcome Back
//         </Text>

//         <AnimatedButton
//           title="Login"
//           onPress={() => console.log('Login Pressed')}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// export default LoginScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const LoginScreen = () => {
  // 🔹 STATE (User Input)
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 🔹 STATE (All Saved Users)
  const [savedUsers, setSavedUsers] = useState([]);

  // 🔹 Animation value
  const translateY = useSharedValue(350);

  // 🔹 Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // 🔹 Open form
  const openForm = () => {
    translateY.value = withTiming(0, { duration: 400 });
  };

  // 🔹 Close form
  const closeForm = () => {
    translateY.value = withTiming(350, { duration: 400 });
  };

  // 🔹 Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleString(); // date + time
  };

  // 🔹 Save login data (MULTIPLE USERS)
  const saveLoginData = async () => {
    if (!userId || !password) {
      Alert.alert('Error', 'Please enter User ID and Password');
      return;
    }

    try {
      const newUser = {
        userId,
        password,
        loginTime: getCurrentTime(),
      };

      const existingData = await AsyncStorage.getItem('LOGIN_USERS');
      const users = existingData ? JSON.parse(existingData) : [];

      users.push(newUser);

      await AsyncStorage.setItem(
        'LOGIN_USERS',
        JSON.stringify(users)
      );

      setSavedUsers(users);

      Alert.alert('Success', 'Login data saved');

      setUserId('');
      setPassword('');
      closeForm();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Get all users on app load
  const getLoginUsers = async () => {
    try {
      const data = await AsyncStorage.getItem('LOGIN_USERS');
      if (data) {
        setSavedUsers(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoginUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn} onPress={openForm}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Animated Bottom Sheet */}
      <Animated.View style={[styles.bottomSheet, animatedStyle]}>
        <TouchableOpacity style={styles.closeBtn} onPress={closeForm}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Welcome again</Text>

        <TextInput
          placeholder="User ID"
          placeholderTextColor="black"
          style={styles.input}
          value={userId}
          onChangeText={setUserId}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={saveLoginData}
        >
          <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 👇 ALL USERS DISPLAY */}
      {savedUsers.length > 0 && (
        <ScrollView style={styles.savedBox}>
          <Text style={styles.savedTitle}>User History</Text>

          {savedUsers.map((item, index) => (
            <View key={index} style={styles.userRow}>
              <Text>User {index + 1}</Text>
              <Text>User ID: {item.userId}</Text>
              <Text>Password: {item.password}</Text>
              <Text>Login Time: {item.loginTime}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  loginBtn: {
    backgroundColor: 'green',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 320,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 10,
  },

  closeBtn: {
    alignSelf: 'flex-end',
  },

  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  submitBtn: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 14,
    marginTop: 10,
  },

  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  savedBox: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '95%',
    maxHeight: 250,
  },

  savedTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },

  userRow: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
