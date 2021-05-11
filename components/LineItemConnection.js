import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { toggleConnection } from '../actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Firebase, { db } from '../config/Firebase.js'
import firebase from "firebase/app"

const LineItemConnection = ({ name }) => {

  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      let currentUser = Firebase.auth().currentUser;
      const querySnapshot = await db
                  .collection('connections')
                  .where('user1', '==', currentUser.email)
                  .where('user2', '==', name)
                  .get();
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setDownloaded(doc.data().online);
      });
    }
    fetchData();
  }, []);

  toggleSwitch = async () => {
    setDownloaded(previousState => !previousState);
    let currentUser = Firebase.auth().currentUser;
    let querySnapshot = await db
                .collection('connections')
                .where('user1', '==', currentUser.email)
                .where('user2', '==', name)
                .get();
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      doc.ref.update({online: !downloaded});
    });
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
          {name}
        </Text>
      <View style={styles.containerRight}>
        <Switch
          onValueChange={toggleSwitch}
          value={downloaded}
        />
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
    width: '100%'
  },
  text: {
    fontSize: 18,
    paddingLeft: 8,
    paddingTop: 5,
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 5,
  },
});

export default LineItemConnection;