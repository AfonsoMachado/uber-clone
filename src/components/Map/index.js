import React, {Component} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

export default class index extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={{
            latitude: -27.210753,
            longitude: -49.644173,
            // zoom
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          }}
          showsUserLocation
          loadingEnabled
        />
      </View>
    );
  }
}
