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
import Month from './Month';
import {useNavigation} from '@react-navigation/native';

const UpcomingMovies = () => {
  const navigation = useNavigation();
  // Get Upcoming Movies
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  React.useEffect(() => {
    getUpcomingMovies().then(response => {
      setUpcomingMovies(response?.data?.results);
    });
  }, []);
  const getUpcomingMovies = async () => {
    try {
      const response = await http().get('/movies/upcoming');
      return response;
    } catch (error) {
      console.log(error);
    }
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
        <Month />
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {upcomingMovies?.map(movie => {
              return (
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
                    <Pressable style={styles.btnDetails}>
                      <Text style={styles.textBtnDetails}>Details</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
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
