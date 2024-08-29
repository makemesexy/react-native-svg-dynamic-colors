import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import AvatarIcon from './src/boy1.svg';

const { width } = Dimensions.get('window');
const iconSize = width * 0.8;

const ColorBtn = ({ color, onPress, selectedColor }) => {
  const isSelected = color === selectedColor;
  return (
    <View style={[styles.btnCover, isSelected ? styles.selected : null]}>
      <TouchableOpacity
        style={[styles.colorBtn, { backgroundColor: color }]}
        onPress={() => onPress(color)}
      />
    </View>
  );
};

const generateNearbyColors = (baseColor, type, count = 5) => {
  const [r, g, b] = baseColor.match(/\d+/g).map(Number);
  const colors = [baseColor];
  
  const variation = {
    hair: 20,  // Smaller variation for hair, to stay within natural hair colors
    skin: 10,  // Even smaller variation for skin tones
    eye: 15   // Slightly more variation for eyes
  }[type] || 15;

  for (let i = 1; i < count; i++) {
    const newR = Math.max(0, Math.min(255, r + Math.floor(Math.random() * variation * 2 - variation)));
    const newG = Math.max(0, Math.min(255, g + Math.floor(Math.random() * variation * 2 - variation)));
    const newB = Math.max(0, Math.min(255, b + Math.floor(Math.random() * variation * 2 - variation)));
    
    // Ensure colors stay within a natural range based on the type
    if (type === 'hair') {
      colors.push(`rgb(${Math.min(newR, 150)}, ${Math.min(newG, 150)}, ${Math.min(newB, 150)})`);
    } else if (type === 'skin') {
      colors.push(`rgb(${Math.max(newR, 200)}, ${Math.max(newG, 160)}, ${Math.max(newB, 120)})`);
    } else {
      colors.push(`rgb(${newR}, ${newG}, ${newB})`);
    }
  }

  return colors;
};

export default function App() {
  const [predictedColors, setPredictedColors] = useState({
    hair: 'rgb(0, 0, 0)',
    skin: 'rgb(255, 206, 86)',
    eye: 'rgb(54, 162, 235)'
  });
  
  const [colorPalettes, setColorPalettes] = useState({
    hair: [],
    skin: [],
    eye: []
  });
  
  const [selectedColors, setSelectedColors] = useState({
    hair: '',
    skin: '',
    eye: ''
  });

  useEffect(() => {
    const fetchPredictedColors = async () => {
      const response = {
        hair: 'rgb(50, 50, 50)',
        skin: 'rgb(230, 190, 130)',
        eye: 'rgb(0, 0, 0)'
      };
      setPredictedColors(response);
  
      const palettes = {
        hair: generateNearbyColors(response.hair, 'hair'),
        skin: generateNearbyColors(response.skin, 'skin'),
        eye: generateNearbyColors(response.eye, 'eye')
      };
      setColorPalettes(palettes);
      setSelectedColors(response);
    };
  
    fetchPredictedColors();
  }, []);

  const handleColorSelect = (type, color) => {
    setSelectedColors(prev => ({ ...prev, [type]: color }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <AvatarIcon
          width={iconSize}
          height={iconSize}
          fill={selectedColors.hair}
          fillSecondary={selectedColors.skin}
          fillTertiary={selectedColors.eye}
        />
      </View>

      {['hair', 'skin', 'eye'].map((type) => (
        <View key={type} style={styles.footer}>
          <Text style={styles.label}>{type.charAt(0).toUpperCase() + type.slice(1)} Color</Text>
          <View style={styles.btnRow}>
            {colorPalettes[type].map((color, index) => (
              <ColorBtn
                key={index}
                color={color}
                selectedColor={selectedColors[type]}
                onPress={(color) => handleColorSelect(type, color)}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  icon: {
    marginBottom: 20
  },
  footer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-start'
  },
  label: {
    color: '#fff',
    marginBottom: 5
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%'
  },
  colorBtn: {
    width: '100%',
    height: '100%',
  },
  btnCover: {
    width: 40,
    height: 40,
    margin: 5
  },
  selected: {
    borderWidth: 2,
    borderColor: '#fff'
  }
});