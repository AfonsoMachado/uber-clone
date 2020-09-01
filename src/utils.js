import {Platform, PixelRatio} from 'react-native';

export function getPixelSize(pixels) {
  return Platform.select({
    ios: pixels,
    // calcula o tamanho em pixels baseado na densidade
    android: PixelRatio.getPixelSizeForLayoutSize(pixels),
  });
}