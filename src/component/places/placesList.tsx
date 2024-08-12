import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constant/color'

function placesList({ places }: any) {
    if (!places || places.length === 0) {

        console.log("777777777777777777777777",!places)
        return (
            <View style={styles.fallBackContainer}>
                <Text style={styles.fallBackText}>No places added yet - Start adding some</Text>
            </View>
        )
    }


    return (
        <View>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PlaceItem places={item} />} />
        </View>
    )
}


export default placesList

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallBackText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary200
    }
})