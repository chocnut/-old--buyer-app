import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from "react-native";
import HeaderSecondary from '../../components/HeaderSecondary';
import ProfileAvatar from "../../components/ProfileAvatar";
import EewooInput from "../../components/EewooInput";
// import CountryPicker from "../../components/CountryPicker";
import Constants from "expo-constants";
import Colors from "../../constants/Colors";


export default class EditProfileScreen extends React.Component {
  state = {
    name: '',
    email: '',
    bio: '',
    errors: { name: '', email: '' },
    btnDisabled: true,
  };

  componentDidMount = async () => {
    this.setState({
      name: "Bo Dallas",
      email: "mightydallas@gmail.com",
    })
  };

  render() {
    const keyboardAvoidingViewBehavior = Constants.platform.ios
      ? "padding"
      : "height";

    return(
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={keyboardAvoidingViewBehavior}
      >
        <HeaderSecondary title="Profile"/>

        <ScrollView>
          <TouchableOpacity
            style={styles.btnHelp}
            activeOpacity={0.8}
            >
            <Image
              source={require('../../../assets/images/question-circle.png')}
              style={styles.btnHelpIcon}
            />
          </TouchableOpacity>
          <View style={styles.container}>

            <ProfileAvatar
              // avatar={'http://placekitten.com/200/200'}
              onPress={()=>{}}
            />

            <EewooInput
              label="Full name"
              placeholder="Full name"
              value={this.state.name}
              onChange={name => this.setState({ name })}
              error={this.state.errors.name}
              textContentType="name"
            />

            <EewooInput
              label="Email Address"
              placeholder="Email address"
              value={this.state.email}
              onChange={email => this.setState({ email })}
              keyboard="email-address"
              error={this.state.errors.email}
              textContentType="username"
            />

            <EewooInput
              label="Bio"
              placeholder="Tell suppliers about you"
              value={this.state.bio}
              onChange={bio => this.setState({ bio })}
              multiline={true}
            />

            <View style={styles.btnHolder}>
              <TouchableOpacity
                style={[styles.btn, this.state.btnDisabled ? styles.btnDisabled : {} ]}
                activeOpacity={!this.state.btnDisabled ? 0.8 : 1}
              >
                <Text style={[styles.btnText, this.state.btnDisabled ? styles.btnDisabledText : {}]}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center'
  },
  btnHelp: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 15,
  },
  btnHelpIcon: {
    width: 20,
    height: 20
  },
  btnHolder: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  btn: {
    width: 190,
    borderRadius: 5,
    padding: 12,
    backgroundColor: Colors.primary,
  },
  btnDisabled: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#F4F4F4',
    paddingVertical: 11,
  },
  btnText: {
    textTransform: 'uppercase',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    color: 'white',
  },
  btnDisabledText: {
    color: '#9996A2',
  }
})
