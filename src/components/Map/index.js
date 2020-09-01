import React, {Component} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import Search from '../Search';
import Directions from '../Directions';
import {getPixelSize} from '../../utils';

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
  };

  // executado quando o componente for renderizado em tela
  async componentDidMount() {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
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
    const {region, destination} = this.state;
    // console.log(region);

    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={region}
          showsUserLocation
          loadingEnabled
          // showsMyLocationButton
          // acesso a instancia do mapa
          ref={(el) => (this.MapView = el)}>
          {destination && (
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => {
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
          )}
        </MapView>

        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
    );
  }
}
