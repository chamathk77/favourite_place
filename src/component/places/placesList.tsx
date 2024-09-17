import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import PlaceItem from './PlaceItem';
import {Colors} from '../../constant/color';
import {useNavigation} from '@react-navigation/native';

function placesList({places}: any) {
  const navigation = useNavigation();

  function selectedPlaceID(data: any) {
    console.log(' selectedPlaceID 000000000000000000', data);
    navigation.navigate('PlaceDetails', {placeid: data});

    // navigation.navigate('PlaceDetails', {placeid: data});
  }

  if (!places || places.length === 0) {
    console.log('777777777777777777777777', !places);
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet - Start adding some
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.list}
        data={places}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PlaceItem places={item} onSelect={selectedPlaceID} />
        )}
      />
    </View>
  );
}

export default placesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },

  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary200,
  },
});
