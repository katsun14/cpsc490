import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { toggleConnection } from '../actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Firebase, { db } from '../config/Firebase.js'
import firebase from "firebase/app"

const LineItemCall = ({ name }) => {

  handleCall = () => {
    console.log("Calling")
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
          {name}
        </Text>
      <View style={styles.containerRight}>
        <TouchableOpacity style={styles.button} onPress={this.handleCall}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 24,
    width: '100%',
  },
  text: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 5,
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 5,
  },
  button: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#1ecbe1',
    borderColor: '#1ecbe1',
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
  },
  buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
  },
});

export default LineItemCall;