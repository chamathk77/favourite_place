import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from '../../constant/color'

function Button({onPress, children}: any) {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text} >{children}</Text>
        </TouchableOpacity>
    )
}


export default Button

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        backgroundColor:Colors.primary800,
        elevation: 2,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        borderRadius: 8
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50

    }
    
})