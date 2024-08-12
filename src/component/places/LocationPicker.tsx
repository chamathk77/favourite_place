import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import React, { Component, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'

import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'

import Map_Icon from '../../assets/icons/map.svg'
import Location_Icon from '../../assets/icons/location.svg'
import { Colors } from '../../constant/color'
import { getMapPreviewUrl } from '../../util/location'



function LocationPicker() {
    const [locationPicked, setLocationPicked] = useState()

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions()

    async function verifyPermissions() {

        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.')
            return false
        }
        return true
    }



    async function getLocationHandler() {

        const hasPermission = await verifyPermissions()
        console.log("------------permission location--------------->>>>>>>>", hasPermission)

        if (!hasPermission) {
            return
        }



        const location = await getCurrentPositionAsync()
        console.log(location)
        setLocationPicked({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }
    function pickOnMapHandler() {
        console.log("pickOnMapHandler")

    }

    let location_picker = <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>No location picked yet.</Text>

    if (locationPicked) {

        location_picker = <Image style={{ width: '100%', height: '100%' }} source={{ uri: getMapPreviewUrl(locationPicked.lat, locationPicked.lng) }} />
    }





    return (
        <View style={{ flex: 1 }}>
            <View style={styles.map_Preview}>

                {location_picker}

            </View>
            <View style={styles.action}>
                <OutlinedButton onPress={getLocationHandler} icon={<Location_Icon width={30} height={30} fill={Colors.primary500} />}>Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon={<Map_Icon width={30} height={30} fill={Colors.primary500} />}>Pick on Map</OutlinedButton>

            </View>

            <View style={{ marginTop: 50 }}></View>
        </View>
    )

}



export default LocationPicker

const styles = StyleSheet.create({
    map_Preview: {
        width: '100%',
        height: 300,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }

})

function verifyPermissions() {
    throw new Error('Function not implemented.')
}
