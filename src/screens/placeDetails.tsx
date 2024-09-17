import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import OutlinedButton from '../component/UI/OutlinedButton';
import Map_Icon from '../assets/icons/map.svg';
import {Colors} from '../constant/color';
import {useEffect, useLayoutEffect, useState} from 'react';
import {fetchPlaceDetails} from '../util/database';

function PlaceDetails({route, navigation}: any) {
  const [fetchPlace, setFetchPlace] = useState([]);

  const className = '[PlaceDetails] ';

  function ShowOnMapHandler() {
    navigation.navigate('Map',{
      initialLat: fetchPlace.lat,
      initialLng: fetchPlace.lng,
    });
  }
  const selectedPlaceID = route.params.placeid;
  console.log(
    className + '  selectedPlace --------->>>>>>>>>>',
    selectedPlaceID,
  );

  useEffect(() => {
    async function fetchdata() {
      const res: any = await fetchPlaceDetails(selectedPlaceID);

      setFetchPlace(res);

      console.log(className + ' selectedPlace --------->>>>>>>>>>', res.title);

      navigation.setOption({
        title: res.title,
      });
    }

    fetchdata();
  }, [selectedPlaceID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: fetchPlace.title,
    });
  });
  if (!fetchPlace) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} src={fetchPlace.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchPlace.address}</Text>
        </View>

        <OutlinedButton
          icon={
            <Map_Icon
              width={30}
              height={30}
              fill={Colors.primary500}
              
            />
            
          }
          
          onPress={ShowOnMapHandler}
          >
          {' '}
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    // backgroundColor:'#ccc'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
