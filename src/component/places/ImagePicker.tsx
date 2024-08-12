import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker'
import { Colors } from '../../constant/color'

function ImagePicker() {

    const [pickedImage, setPickedImage] = useState<any>("")
    const [permissionInfo, requestPermission] = useCameraPermissions()

    async function verifyPermissions() {
        if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        if (permissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.')
            return false
        }
        return true
    }

    async function takeImage() {
        const hasPermission = await verifyPermissions()

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
            <Text >ImagePicker</Text>

            <View style={styles.imagePreview}>

               {imagePreview}
               
            </View>

            <Button title='Take Image' onPress={takeImage} />

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