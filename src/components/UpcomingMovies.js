/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import http from '../helpers/http';
// import Month from './Month';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {transaction as transactionAction} from '../redux/reducers/transaction';

const UpcomingMovies = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Get Upcoming Movies
  const [month, setMonth] = React.useState('');
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  React.useEffect(() => {
    getUpcomingMovies().then(response => {
      setUpcomingMovies(response?.data?.results);
    });
  }, [upcomingMovies]);
  const getUpcomingMovies = async () => {
    try {
      const response = await http().get(`/movies/upcoming?month=${month}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Month
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [selectedBtnMonth, setSelectedBtnMonth] = React.useState(0);
  const handlePressBtnMonth = index => {
    setSelectedBtnMonth(index);
    setMonth(index + 1);
  };

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
    <>
      <View style={styles.ucomingMoviesWrapper}>
        <View style={styles.textUpcomingMoviesWrapper}>
          <Text style={styles.textUpcomingMovies1}>Upcoming Movies</Text>
          <Pressable onPress={() => navigation.navigate('ViewAll')}>
            <Text style={styles.textUpcomingMovies2}>view all</Text>
          </Pressable>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {months?.map((monthItem, index) => {
            return (
              <Pressable
                key={String(index)}
                onPress={() => handlePressBtnMonth(index)}
                style={{
                  backgroundColor:
                    selectedBtnMonth === index ? '#00005C' : 'transparent',
                  borderColor: '#00005C',
                  borderWidth: 1,
                  width: 125,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  marginRight: 12,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    color: selectedBtnMonth === index ? 'white' : '#00005C',
                  }}>
                  {monthItem}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {upcomingMovies?.map(movie => (
              <View key={String(movie?.id)} style={styles.upcomingMovie}>
                <Image
                  source={{uri: movie?.picture}}
                  style={styles.imageUpcomingMovie}
                />
                <View style={styles.detailsWrapper}>
                  <Text numberOfLines={1} style={styles.textTitle}>
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
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ucomingMoviesWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  textUpcomingMoviesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  textUpcomingMovies1: {
    flex: 1,
    fontSize: 20,
    color: '#00005C',
    fontWeight: 'bold',
  },
  textUpcomingMovies2: {
    color: '#00005C',
  },
  upcomingMovie: {
    borderColor: '#DEDEDE',
    borderWidth: 1,
    width: 173,
    padding: 10,
    borderRadius: 6,
    marginRight: 16,
    marginTop: 30,
  },
  imageUpcomingMovie: {
    resizeMode: 'contain',
    width: 150,
    height: 230,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 15,
  },
  detailsWrapper: {
    alignItems: 'center',
    height: 120,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textGenre: {
    flex: 1,
    textAlign: 'center',
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
    marginBottom: 10,
  },
  textBtnDetails: {
    color: '#00005C',
  },
});

export default UpcomingMovies;
