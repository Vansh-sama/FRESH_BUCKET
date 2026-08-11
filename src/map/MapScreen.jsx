import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.2090,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 28.6139,
            longitude: 77.2090,
          }}
          title="Delhi"
          description="India Gate"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});