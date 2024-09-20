import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="seek_job"
        options={{
          title: 'Seek Job',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="post_job"
        options={{
          title: 'Post Job',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cloud-upload' : 'cloud-upload-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="external_job"
        options={{
          title: 'External Job',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'airplane' : 'airplane-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
