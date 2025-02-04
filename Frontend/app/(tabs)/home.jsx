import { View, Image, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Swiper from 'react-native-swiper'; // Import Swiper

export default function Home() {
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const [images, setImages] = useState([
    { id: 1, uri: require('../../assets/images/homelogo.png') },
    { id: 2, uri: require('../../assets/images/homelogo2.png') },
    { id: 3, uri: require('../../assets/images/homelogo3.png') },
  ]);

  const handleAddPhoto = () => {
    const newPhoto = { id: images.length + 1, uri: require('../../assets/images/homelogo.png') };
    setImages((prevImages) => [...prevImages, newPhoto]);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      {/* Swiper Carousel */}


      <Swiper
        style={styles.swiper}
        showsPagination={true}
        loop={true}
        autoplay={true} // Optional for autoplay feature
      >
        {images.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image source={item.uri} style={[styles.image, { width: width * 0.9 }]} />
            <BlurView intensity={50} style={styles.blurOverlay}>
              <Text style={styles.overlayText}>{item.id}</Text>
            </BlurView>
          </View>
        ))}
      </Swiper>



      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          If you see any trash or dust, click a photo and submit it by tapping the button below.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push('/camera/PhotoClick')}
        style={styles.cameraButtonContainer}
      >
        <FontAwesome name="camera" size={40} color="black" />
        <Text style={styles.cameraButtonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7FAFC',
    height: '100%',
    paddingBottom: 20,
  },
  swiper: {
    height: 180, // Adjust as needed
    marginBottom: 20,
    backgroundColor:'white'
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    borderRadius: 10,
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoText: {
    fontSize: 16,
    color: '#4A5568',
  },
  cameraButtonContainer: {
    alignItems: 'center',
    margin: 10,
    padding: 30,
  },
  cameraButtonText: {
    backgroundColor: '#38A169',
    color: '#FFF',
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },
});