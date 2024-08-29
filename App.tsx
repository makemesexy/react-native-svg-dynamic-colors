import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import AvatarIcon from './src/avatar.svg';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');
const iconSize = width * 0.3;

const hslToRgb = (h, s, l) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return `rgb(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)})`;
};

export default function App() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(0.5);

  const primaryColor = hslToRgb(hue, saturation, lightness);
  const [secondaryColor, setSecondaryColor] = useState('rgb(255, 159, 64)');
  const [tertiaryColor, setTertiaryColor] = useState('brown');

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <AvatarIcon
          width={iconSize}
          height={iconSize}
          fill={primaryColor}
          fillSecondary={secondaryColor}
          fillTertiary={tertiaryColor}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Hue: {hue.toFixed(0)}°</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={360}
          value={hue}
          onValueChange={setHue}
          minimumTrackTintColor={primaryColor}
          maximumTrackTintColor="#000000"
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Saturation: {(saturation * 100).toFixed(0)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={saturation}
          onValueChange={setSaturation}
          minimumTrackTintColor={primaryColor}
          maximumTrackTintColor="#000000"
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Lightness: {(lightness * 100).toFixed(0)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={lightness}
          onValueChange={setLightness}
          minimumTrackTintColor={primaryColor}
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  icon: {
    paddingTop: 20
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff'
  },
  slider: {
    width: '100%',
    height: 40
  }
});
