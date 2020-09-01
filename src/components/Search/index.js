import React, {Component} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Platform} from 'react-native';

export default class Search extends Component {
  state = {
    searchFocused: false,
  };

  render() {
    const {searchFocused} = this.props;
    // lidando no componente de mapa quando o usario clica numa localização
    const {onLocationSelected} = this.props;

    return (
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        placeholderTextColor="#333"
        onPress={onLocationSelected}
        query={{
          key: 'AIzaSyBFB3x2buC_JWqwvjhYVLVDxdNw94XvfKg',
          language: 'pt',
        }}
        textInputProps={{
          // para ocultar a listview
          onFocus: () => {
            this.setState({searchFocused: true});
          },
          onBlur: () => {
            this.setState({searchFocused: false});
          },
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
        listViewDisplayed={searchFocused}
        // busca latitude e longitude
        fetchDetails
        enablePoweredByContainer={false}
        // estilizações da barra de pesquisa
        styles={{
          container: {
            position: 'absolute',
            // escolhendo estilização filtrando por plataforma
            top: Platform.select({
              ios: 60,
              android: 40,
            }),
            width: '100%',
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 54,
            marginHorizontal: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            padding: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            // propriedade de sombra no android
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {x: 0, y: 0},
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: '#DDD',
            fontSize: 18,
          },
          listView: {
            borderWidth: 1,
            borderColor: '#DDD',
            backgroundColor: '#FFF',
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {x: 0, y: 0},
            shadowRadius: 15,
            marginTop: 10,
          },
          description: {
            fontSize: 16,
          },
          row: {
            padding: 20,
            height: 58,
          },
        }}
      />
    );
  }
}
