import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>P</Text>,
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>C</Text>,
        }}
      />
      <Tabs.Screen 
        name="QuestBoard"
        options={{
          title: 'Quest Board',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>Q</Text>,
        }}
      />
    </Tabs>
  );
}
