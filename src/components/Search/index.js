import React, {Component} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Text, View} from 'react-native';

export default class Search extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        placeholderTextColor="#333"
        onPress={() => {}}
        query={{
          key: 'AIzaSyBFB3x2buC_JWqwvjhYVLVDxdNw94XvfKg',
          language: 'pt',
        }}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
        // busca latitude e longitude
        fetchDetails
        enablePoweredByContainer={false}
      />
    );
  }
}
