import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllPlaces from './src/screens/AllPlaces'
import AddPlace from './src/screens/AddPlace'

import Seacrh_Icon from './src/assets/icons/Search.svg'
import Add_icon from './src/assets/icons/add.svg'
import { Colors } from './src/constant/color'
//import { Svg } from 'react-native-svg'




const Stack = createNativeStackNavigator()

function App() {

  return (
    <>
      <StatusBar barStyle={"dark-content"} />

      <NavigationContainer >
        <Stack.Navigator 
        initialRouteName='AllPlaces' 
        screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700},
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({

              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => navigation.navigate("AddPlace")}>
                  <Add_icon width={35} height={35} fill={"black"}  />
                </TouchableOpacity>

              )
            })} />
          <Stack.Screen 
          name="AddPlace" 
          component={AddPlace}
          options={({ navigation }) => ({
            
            title: "Add New Place",
          })}
           />
        </Stack.Navigator>

      </NavigationContainer>

    </>
  )
}


export default App