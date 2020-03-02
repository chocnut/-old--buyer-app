import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    recording: false
  };

  async componentDidMount() {
    const camera_permissions = await Permissions.askAsync(Permissions.CAMERA);
    const mic_permissions = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasCameraPermission: camera_permissions.status === 'granted' && mic_permissions.status === 'granted' });
  }

  toggleRecord = async () => {
    const recording = !this.state.recording
    await this.setState({ recording })

    if (recording) {
      const data = await this.refs.cam.recordAsync({ quality: Camera.Constants.VideoQuality["720p"] })
      console.log(data.uri)
    }
    else {
      this.refs.cam.stopRecording()
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 0, position: 'absolute', top: 0, left: 0, zIndex: 1000, width: '100%', height: '100%' }}>
          <Camera style={{ flex: 1, height: 400 }} type={this.state.type} ref="cam">
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.toggleRecord}>
                <Text style={{ color: 'red', fontSize: 24 }}>{ this.state.recording ? 'Stop' : 'Record' }</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
