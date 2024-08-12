import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from '../../constant/color'

function OutlinedButton({ onPress, icon, children }: any) {



    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>

            {icon && <View style={styles.icon}>{icon}</View>}

            <Text style={styles.text}>{children}</Text>
            
        </TouchableOpacity>
    )

}


export default OutlinedButton

const styles = StyleSheet.create({

    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.primary500
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    }

})