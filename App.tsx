import { StatusBar, Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllPlaces from './src/screens/AllPlaces'
import AddPlace from './src/screens/AddPlace'

const Stack = createNativeStackNavigator()

function App() {

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AllPlaces'>
          <Stack.Screen name="AllPlaces" component={AllPlaces}options={{
            headerRight:({tintColor})=> <Text style={{color:tintColor}}>Test</Text>
            }}/>
          <Stack.Screen name="AddPlace" component={AddPlace} />
        </Stack.Navigator>

      </NavigationContainer>

    </>
  )
}


export default App