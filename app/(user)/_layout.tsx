import { View, Text } from 'react-native'
import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='applied_jobs' options={{ headerShown: false }} />
      <Stack.Screen name='liked_jobs' options={{ headerShown: false }} />
      <Stack.Screen name='setting' options={{ headerShown: false }} />
    </Stack>
  )
};


export default _layout;
