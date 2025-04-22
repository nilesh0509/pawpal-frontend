import { Tabs } from 'expo-router'; 
import Colors from '@/constants/Colors'; 
import AntDesign from '@expo/vector-icons/AntDesign'; 


export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.YELLOW }, 
        tabBarActiveTintColor: Colors.BOLDS, 
        tabBarInactiveTintColor: Colors.GRAY, 
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          headerShown: false,
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={24} color={color} /> 

          ),
        }}
      />
<Tabs.Screen
        name="addNewPet"
        options={{
          headerShown: false,
          tabBarLabel: 'AddNewPet',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={24} color={color} /> 

          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
