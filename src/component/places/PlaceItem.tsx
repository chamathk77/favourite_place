import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

function PlaceItem({ places, onSelect }: any) {



    return (
        <TouchableOpacity onPress={() => onSelect(places)}>
            <View>
                <Image source={places.imageUri} />
                <View>
                    <Text>{places.title} </Text>
                    <Text>{places.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default PlaceItem

