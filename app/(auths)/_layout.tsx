import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/hooks/useGlobalContext'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='sign_in' options={{ headerShown: false }} />
      <Stack.Screen name='sign_up' options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout