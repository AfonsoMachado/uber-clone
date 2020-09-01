import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({destination, origin, onReady}) => {
  return (
    // Para mostrar o caminho entre dois pontos no mapa
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyBFB3x2buC_JWqwvjhYVLVDxdNw94XvfKg"
      // largura da linha entre origem e destino
      strokeWidth={3}
      // cor da linha
      strokeColor={'#222'}
    />
  );
};

export default Directions;
