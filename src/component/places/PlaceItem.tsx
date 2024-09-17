import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {Colors} from '../../constant/color';

function PlaceItem({places, onSelect}: any) {
  console.log('777777777777777777777777', places.imageUrl);

  function onPressCard() {
    // onSelect.bind(this, places.id);

    console.log('777777777777777777777777', places.id);

    onSelect(places.id);
  }
  return (
    <TouchableOpacity style={styles.item} onPress={onPressCard}>
      <Image style={styles.image} src={places.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{places.title} </Text>
        <Text style={styles.address}>{places.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
