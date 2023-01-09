import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const NavbarBeforeLogin = () => {
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const showMenu = () => {
    if (isShowMenu === false) {
      setIsShowMenu(true);
    } else {
      setIsShowMenu(false);
    }
  };
  return (
    <View style={styles.navbarUserWrapper}>
      <View style={styles.navbarWrapper}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../images/bannerKarcis.png')}
            style={styles.logo}
          />
        </View>
        <View>
          <Icon
            onPress={showMenu}
            name={isShowMenu ? 'x' : 'menu'}
            size={30}
            color="black"
          />
        </View>
      </View>
      <View style={styles.dropDownMenuWrapper}>
        {isShowMenu ? (
          <View>
            <View>
              <View style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>Home</Text>
              </View>
              <View style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>List Movie</Text>
              </View>
              <View style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>Sign In</Text>
              </View>
              <View style={styles.textFooterMenuWrapper}>
                <Text style={styles.textFooterMenu}>
                  © 2023 Karcis. All Rights Reserved.
                </Text>
              </View>
            </View>
            <View style={styles.modal} />
          </View>
        ) : (
          false
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarUserWrapper: {
    position: 'relative',
  },
  navbarWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoWrapper: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  dropDownMenuWrapper: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  listMenuWrapper: {
    borderTopColor: '#DEDEDE',
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  textListMenu: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  textFooterMenuWrapper: {
    marginVertical: 25,
  },
  textFooterMenu: {
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'black',
    height: '100%',
    opacity: 0.24,
  },
});

export default NavbarBeforeLogin;
