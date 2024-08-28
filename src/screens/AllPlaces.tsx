import { Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import PlacesList from '../component/places/placesList'
import { useIsFocused } from '@react-navigation/native';




export function AllPlaces({navigation, route}: any) {

  const [loadedPlaces, setLoadedPlaces] = useState([]);


  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((prevPlaces) => [...prevPlaces, route.params.place]);

    }
    
  }, [isFocused]);
  return (
    
    
    <PlacesList places={loadedPlaces}   />


  )
}


export default AllPlaces