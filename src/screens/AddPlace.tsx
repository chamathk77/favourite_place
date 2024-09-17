import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PlaceForm from '../component/places/PlaceForm'
import { insertPlace } from '../util/database'

function AddPlace({navigation}: any) {

  async function createPlaceHandler(data: any) {


    console.log('createPlaceHandler 00000000000000---------------------<<<<<<<<<<<<',data)

    const insert=await insertPlace(data)

    console.log('insert 00000000000000---------------------<<<<<<<<<<<<',insert)

    navigation.navigate('AllPlaces');


  }


  return (
    <View style={{flex: 1}}> 
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </View>

  )
}


export default AddPlace