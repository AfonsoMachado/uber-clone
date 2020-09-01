import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import {getPixelSize} from '../../utils';

import markerImage from '../../assets/marker.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';

Geocoder.init('AIzaSyBFB3x2buC_JWqwvjhYVLVDxdNw94XvfKg');

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  };

  // executado quando o componente for renderizado em tela
  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        const response = await Geocoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        // capturando os dados ate encontrar a virgula
        const location = address.substring(0, address.indexOf(','));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        });
      }, //sucesso
      () => {}, //erro
      {
        // tempo buscando a localização até dar erro
        timeout: 2000,
        // pegar localização via gps
        enableHighAccuracy: true,
        // cache da informação do usuario, para no maximo 1 segundo
        maximumAge: 1000,
      },
    );
  }

  handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  render() {
    const {region, destination, duration, location} = this.state;
    // console.log(region);

    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={region}
          showsUserLocation
          loadingEnabled
          // acesso a instancia do mapa
          ref={(el) => (this.MapView = el)}>
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  this.setState({duration: Math.floor(result.duration)});

                  this.MapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(50),
                    },
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{x: 0, y: 0}}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{x: 0, y: 0}}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
    );
  }
}
