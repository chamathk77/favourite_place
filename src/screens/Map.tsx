import React, { Component, useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { GOOGLE_MAPS_API_KEY } from '../util/location'

import Save_icon from '../assets/icons/save.svg'
import { Colors } from '../constant/color'
function Map({ navigation }: any) {

    const [selected_location, set_selected_location] = useState()

    const regiom = {
        latitude: 6.9271,
        longitude: 79.8612,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421

    }

    function select_location_handler(event: any) {
        console.log("select_location_handler----------------------->>>>>>>>>>>>>>>>>>>>" ,event.nativeEvent)
        

        const lat: any = event.nativeEvent.coordinate.latitude
        const lng: any = event.nativeEvent.coordinate.longitude

        set_selected_location({ lat: lat, lng: lng })
    }

    const save_location_handler = useCallback(()=> {
        console.log("save_location_handler----------------------->>>>>>>>>>>>>>>>>>>>")
        console.log("66666666666666666666666666666666-------------",selected_location)

        if (!selected_location) {

            Alert.alert("Please select a location", "Please select a location on the map")
            return
        }

        navigation.navigate("AddPlace",
            {
                Picked_Lat: selected_location.lat,
                Picked_Lng: selected_location.lng
            })

    }, [navigation,selected_location])

    useLayoutEffect(() => {
        navigation.setOptions({

            headerRight: () => <Save_icon
                width={35}
                height={35}
                fill={Colors.primary500}
                onPress={save_location_handler} />
        })

    }, [navigation,save_location_handler])

    return (


        <MapView
            style={styles.map}
            initialRegion={regiom}
            onPress={select_location_handler}

        >
            {selected_location &&
                (

                    <Marker
                        title='Picked Location'

                        coordinate={{
                            latitude: selected_location.lat,
                            longitude: selected_location.lng
                        }} />
                )}

        </MapView>


        //   <Text>Map</Text>

    )
}

export default Map


const styles = StyleSheet.create({

    map: {
        flex: 1
    }
})