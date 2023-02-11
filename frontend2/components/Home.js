import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { firebase } from "../utils/firebase";

const Home = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState();
  const [image, setImage] = useState();

  //
  // Request camera permissions
  //
  if (permission === null) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  } else if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function uploadImage() {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const ref = firebase.storage.ref().child(filename).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    Alert.alert("Photo uploaded");
    setImage(null);
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.buttonContainer} onPress={takePicture}>
        <Text style={styles.text}>Take picture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  camera: {
    height: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  takePicBtn: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
