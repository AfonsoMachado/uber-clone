import React from 'react';
import Map from './components/Map';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Map />
    </>
  );
};

export default App;
