import { Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import PlacesList from '../component/places/placesList'
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../util/database';




export function AllPlaces({navigation, route}: any) {

  const [loadedPlaces, setLoadedPlaces] = useState([]);


  const isFocused = useIsFocused();
  useEffect(() => {

    async function fetchPlaces_list() {
     const result: any = await fetchPlaces()

     setLoadedPlaces(result)
     
     console.log("fetchPlaces_list 999999999999999999999999999999999", result)
    }
    if (isFocused ) {
      fetchPlaces_list()
  
      //setLoadedPlaces((prevPlaces) => [...prevPlaces, route.params.place]);

    }
    
  }, [isFocused]);
  return (
    
    
    <PlacesList places={loadedPlaces}   />


  )
}


export default AllPlaces