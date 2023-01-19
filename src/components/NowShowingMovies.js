/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import http from '../helpers/http';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {transaction as transactionAction} from '../redux/reducers/transaction';

const NowShowing = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Get Now Showing Movies
  const [nowShowingMovies, setNowShowingMovies] = React.useState([]);
  React.useEffect(() => {
    getNowShowing();
  }, []);
  const getNowShowing = async () => {
    try {
      const response = await http().get(
        '/movies/nowShowing?limit=&page=&search&sort=DESC&sortBy=title',
      );
      setNowShowingMovies(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  // Handle Details
  const [isPress, setIsPress] = React.useState(false);
  const [selectedButton, setSelectedButton] = React.useState(null);
  const handleDetails = movieId => {
    setIsPress(true);
    setSelectedButton(movieId);
    setTimeout(() => {
      setIsPress(false);
      setSelectedButton(null);
    }, 1000);
    dispatch(transactionAction({movieId}));
    navigation.navigate('MovieDetails');
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.nowShowingWrapper}>
        <View style={styles.textNowShowingWrapper}>
          <Text style={styles.textNowShowing1}>Now Showing</Text>
          <Pressable onPress={() => navigation.navigate('ViewAll')}>
            <Text style={styles.textNowShowing2}>view all</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.listNowShowingWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {nowShowingMovies?.map((movie, index) => {
            return (
              <View key={String(index)}>
                <Pressable
                  onPress={() => setSelectedMovie(movie?.id)}
                  style={{
                    borderColor:
                      selectedMovie === movie?.id ? '#DEDEDE' : 'white',
                    backgroundColor:
                      selectedMovie === movie?.id ? 'white' : '#D6D8E7',
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: selectedMovie === movie?.id ? 0 : 1,
                    marginRight: 16,
                    padding: 10,
                    borderTopStartRadius: 6,
                    borderTopEndRadius: 6,
                    borderBottomStartRadius:
                      selectedMovie === movie?.id ? 0 : 6,
                    borderBottomEndRadius: selectedMovie === movie?.id ? 0 : 6,
                  }}>
                  <Image
                    source={{
                      uri: movie?.picture,
                    }}
                    style={styles.imageNowShowing}
                  />
                </Pressable>
                {selectedMovie === movie?.id && (
                  <>
                    <View style={styles.detailsWrapper}>
                      <Text
                        style={styles.textTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {movie?.title}
                      </Text>
                      <Text style={styles.textGenre}>{movie?.genre}</Text>
                      <Pressable
                        onPress={() => handleDetails(movie?.id)}
                        style={{
                          borderColor: '#00005C',
                          backgroundColor:
                            isPress && selectedButton === movie?.id
                              ? '#00005C'
                              : 'white',
                          borderWidth: 1,
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 30,
                          borderRadius: 4,
                          marginTop: 20,
                          marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            color:
                              isPress && selectedButton === movie?.id
                                ? 'white'
                                : '#00005C',
                          }}>
                          Details
                        </Text>
                      </Pressable>
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 480,
    backgroundColor: 'white',
    position: 'relative',
  },
  nowShowingWrapper: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#D6D8E7',
    height: 420,
  },
  textNowShowingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  textNowShowing1: {
    flex: 1,
    fontSize: 20,
    color: '#00005C',
    fontWeight: 'bold',
  },
  textNowShowing2: {
    color: '#00005C',
  },
  listNowShowingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    top: 110,
  },
  imageNowShowing: {
    resizeMode: 'contain',
    width: 150,
    height: 220,
    borderRadius: 4,
  },
  detailsWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 172,
    height: 120,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#DEDEDE',
    borderRightColor: '#DEDEDE',
    borderBottomColor: '#DEDEDE',
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textGenre: {
    textAlign: 'center',
    flex: 1,
  },
  btnDetails: {
    borderColor: '#00005C',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 15,
  },
  textBtnDetails: {
    color: '#00005C',
  },
});

export default NowShowing;
