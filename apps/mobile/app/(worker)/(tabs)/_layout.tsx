import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WorkerTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
      <Tabs
          screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#DBA92E",
              tabBarInactiveTintColor: "#AAB8C2",
              tabBarStyle: {
                  backgroundColor: "#12357F",
                  borderTopWidth: 1,
                  borderTopColor: "rgba(255, 255, 255, 0.1)",
                  height: 60 + insets.bottom,
                  paddingBottom: Math.max(insets.bottom, 8),
                  paddingTop: 6,
              },
              tabBarLabelStyle: {
                  fontSize: 10,
                  fontWeight: "bold",
              },
          }}
      >
          <Tabs.Screen
              name="home"
              options={{
                  title: "Home",
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons
                          name={focused ? "home" : "home-outline"}
                          size={20}
                          color={color}
                      />
                  ),
              }}
          />
          <Tabs.Screen
              name="bookings"
              options={{
                  title: "Bookings",
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons
                          name={focused ? "calendar" : "calendar-outline"}
                          size={20}
                          color={color}
                      />
                  ),
              }}
          />
          <Tabs.Screen
              name="history"
              options={{
                  title: "Earnings",
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons
                          name={focused ? "card" : "card-outline"}
                          size={20}
                          color={color}
                      />
                  ),
              }}
          />
          <Tabs.Screen
              name="message"
              options={{
                  title: "Messages",
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons
                          name={focused ? "chatbubbles" : "chatbubbles-outline"}
                          size={20}
                          color={color}
                      />
                  ),
              }}
          />
          <Tabs.Screen
              name="reviews"
              options={{
                  title: "Reviews",
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons
                          name={focused ? "star" : "star-outline"}
                          size={20}
                          color={color}
                      />
                  ),
              }}
          />
          <Tabs.Screen
              name="profile"
              options={{
                  title: "Profile",
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons
                          name={focused ? "person" : "person-outline"}
                          size={20}
                          color={color}
                      />
                  ),
              }}
          />
      </Tabs>
  );
}
