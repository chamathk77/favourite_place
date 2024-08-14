import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker'
import { Colors } from '../../constant/color'
import OutlinedButton from '../UI/OutlinedButton'

import Seacrh_Icon from '../../assets/icons/Search.svg'
import Camera_Icon from '../../assets/icons/camera.svg'

function ImagePicker() {

    const [pickedImage, setPickedImage] = useState<any>("")
    const [permissionInfo, requestPermission] = useCameraPermissions()

    async function verifyPermissions() {

        if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            console.log("00000000000000000000000000000",permissionResponse)
            console.log("888888888888888888888888888888",PermissionStatus)
            return permissionResponse.granted
        }
        if (permissionInfo.status === PermissionStatus.DENIED) {
            console.log("65656565656565656565656",PermissionStatus)
            console.log("")


            Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.')
            return false
        }
        return true
    }

    async function takeImage() {
        const hasPermission = await verifyPermissions()

        console.log("2333333333333333333333333333333",hasPermission)

        if (hasPermission === false) {
            return

        }
        const image = await launchCameraAsync({

            // allowsEditing:true,
            aspect: [9, 16],
            quality: 1,
            // allowsEditing:true,



        })
        setPickedImage(image.assets[0].uri)
        console.log("------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>",image)
        console.log("------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>",image.assets[0].uri)
    }

    let imagePreview = <Text style={{ textAlign: 'center' , fontWeight: 'bold' , fontSize: 20}}>No image taken yet.</Text>

    if (pickedImage) {

        imagePreview = <Image source={{ uri: pickedImage }} style={styles.imagePreview} />
    }

    return (
        <View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 ,color:Colors.primary500}} >ImagePicker</Text>

            <View style={styles.imagePreview}>

               {imagePreview}
               
            </View>

            <OutlinedButton onPress={takeImage} icon={<Camera_Icon  width={18} height={22} fill={Colors.primary500} />}>Take Image</OutlinedButton>

        </View>
    )
}


export default ImagePicker

const styles = StyleSheet.create({
    
    imagePreview: {
        width: '100%',
        height: 300,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
    },
    image:{
        width:'100%',
        height:'100%'
    }
})