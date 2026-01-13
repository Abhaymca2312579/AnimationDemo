import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const BottomLoginForm = ({ visible, onClose }) => {
  // 🔹 Animated style for bottom slide
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(visible ? 0 : height, {
          duration: 400,
        }),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="User ID"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.loginBtn} onPress={onClose}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
      </Pressable>
    </Animated.View>
  );
};

export default BottomLoginForm;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.45,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
});
