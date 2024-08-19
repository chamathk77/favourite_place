import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'

import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'

import Map_Icon from '../../assets/icons/map.svg'
import Location_Icon from '../../assets/icons/location.svg'
import { Colors } from '../../constant/color'
import { get_address, getMapPreviewUrl } from '../../util/location'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'



function LocationPicker({onLocationPicked}:any) {
    const [locationPicked, setLocationPicked] = useState()

    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()



    const [locationPermissionInfo, requestPermission] = useForegroundPermissions()





    useEffect(() => {

        console.log("selected data ------------------------->>>>>>>>>>>>>>>>>>>> , lat   ", route.params?.Picked_Lat)
        console.log("selected data ------------------------->>>>>>>>>>>>>>>>>>>>  lng  ", route.params?.Picked_Lng)

        if (isFocused && route.params) {

            console.log(" location picker  is focused------------------------->>>>>>>>>>>>>>>>>>>>  lng  ", route.params?.Picked_Lng)


            const mapPickedLocation: any =
            {
                lat: route.params.Picked_Lat,
                lng: route.params.Picked_Lng
            }

            setLocationPicked(mapPickedLocation)


       
        }


    }, [route, isFocused])

    useEffect(() => {

        async function handlelocation(){

            if(locationPicked ){
            console.log("GET ADDRESS CALLED ----------------000000000000000000000000000000000000000",)
               const address =await get_address(locationPicked.lat,locationPicked.lng)
    
                onLocationPicked(address)
            }
        }

        handlelocation()

        
        
    },[locationPicked]) 

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
        navigation.navigate("Map")

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
