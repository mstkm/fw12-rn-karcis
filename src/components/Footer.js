import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Footer = () => {
  return (
    <>
      <View style={styles.footerWrapper}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../images/bannerKarcis.png')}
            style={styles.logo}
          />
          <Text style={styles.logoHeadline}>
            Stop waiting in line. Buy tickets conveniently, watch movies
            quietly.
          </Text>
        </View>
        <View>
          <View style={styles.listMenuFooterWrapper}>
            <Text style={styles.textMenuFooter}>Explore</Text>
            <View style={styles.listContentMenuWrapper}>
              <Text style={styles.textContentMenu}>Home</Text>
              <Text>List Movie</Text>
            </View>
          </View>
          <View style={styles.listMenuFooterWrapper}>
            <Text style={styles.textMenuFooter}>Our Sponsor</Text>
            <View style={styles.listContentMenuWrapper}>
              <Image
                source={require('../images/ebv.id.png')}
                style={styles.logoSponsor1}
              />
              <Image
                source={require('../images/cineone21.png')}
                style={styles.logoSponsor2}
              />
              <Image
                source={require('../images/hiflix.png')}
                style={styles.logoSponsor3}
              />
            </View>
          </View>
          <View style={styles.listMenuFooterWrapper}>
            <Text style={styles.textMenuFooter}>Follow Us</Text>
            <View style={styles.listContentMenuWrapper}>
              <Icon name="facebook" size={20} style={styles.icon} />
              <Icon name="instagram" size={20} style={styles.icon} />
              <Icon name="twitter" size={20} style={styles.icon} />
              <Icon name="youtube" size={20} style={styles.icon} />
            </View>
          </View>
        </View>
        <View style={styles.textFooterEndWrapper}>
          <Text>© 2023 Tickitz. All Rights Reserved.</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  logoWrapper: {
    marginBottom: 30,
  },
  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 50,
  },
  logoHeadline: {
    width: 280,
  },
  listMenuFooterWrapper: {
    marginBottom: 20,
  },
  textMenuFooter: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContentMenuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContentMenu: {
    marginRight: 60,
  },
  logoSponsor1: {
    resizeMode: 'contain',
    width: 70,
    marginRight: 20,
  },
  logoSponsor2: {
    resizeMode: 'contain',
    width: 120,
    marginRight: 20,
  },
  logoSponsor3: {
    resizeMode: 'contain',
    width: 65,
  },
  icon: {
    marginRight: 30,
  },
  textFooterEndWrapper: {
    marginTop: 30,
  },
});

export default Footer;
