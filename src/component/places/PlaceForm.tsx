import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Component, useCallback, useState} from 'react';
import {Colors} from '../../constant/color';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/button';
import {place} from '../model/place';

function PlaceForm({onCreatePlace}: any) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [pickedLocation, setPickedLocation] = useState();

  function Change_title_handler(enteredTitle: string) {
    setEnteredTitle(enteredTitle);
  }

  function onImageTaken(imagePath: string) {
    setSelectedImage(imagePath);
  }
  const onLocationPicked = useCallback((location: any) => {
    console.log(
      'onLocationPicked -------------->>>>>>>>0000000000000000000',
      location,
    );
    setPickedLocation(location);
  }, []);

  function saveplace_handler() {
    console.log('title', enteredTitle);
    console.log('image', selectedImage);
    console.log('location', pickedLocation);

    const placeData = new place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={Change_title_handler}
          value={enteredTitle}
        />
      </View>

      <ImagePicker onImageTaken={onImageTaken} />

      <LocationPicker onLocationPicked={onLocationPicked} />

      <Button onPress={saveplace_handler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 50,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
