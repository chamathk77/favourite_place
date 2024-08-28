import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PlaceForm from '../component/places/PlaceForm'

function AddPlace({navigation}: any) {

  function createPlaceHandler(data: any) {
    console.log('createPlaceHandler 00000000000000---------------------<<<<<<<<<<<<',data)

    navigation.navigate('AllPlaces',{
      place:data
    });


  }


  return (
    <View style={{flex: 1}}> 
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </View>

  )
}


export default AddPlace