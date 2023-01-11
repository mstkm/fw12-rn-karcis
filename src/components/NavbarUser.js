import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const NavbarUser = () => {
  const navigation = useNavigation();
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
            <View style={styles.inputWrapper}>
              <Icon
                name="search"
                size={30}
                color="#6E7191"
                style={styles.searchIcon}
              />
              <TextInput
                name="searchInput"
                style={styles.input}
                placeholder="Search..."
              />
            </View>
            <View>
              <Pressable
                onPress={() => navigation.navigate('HomePage')}
                onPressOut={() => setIsShowMenu(false)}
                style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>Home</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('ViewAll')}
                onPressOut={() => setIsShowMenu(false)}
                style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>List Movie</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Profile')}
                onPressOut={() => setIsShowMenu(false)}
                style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>Profile</Text>
              </Pressable>
              <Pressable style={styles.listMenuWrapper}>
                <Text style={styles.textListMenu}>Logout</Text>
              </Pressable>
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
    paddingTop: 5,
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
  inputWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 30,
    top: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 4,
  },
  listMenuWrapper: {
    borderTopColor: '#DEDEDE',
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  textListMenu: {
    fontSize: 18,
    color: '#14142B',
    textAlign: 'center',
  },
  textFooterMenuWrapper: {
    marginVertical: 25,
  },
  textFooterMenu: {
    textAlign: 'center',
    color: '#6E7191',
  },
  modal: {
    backgroundColor: 'black',
    height: '100%',
    opacity: 0.24,
  },
});

export default NavbarUser;
