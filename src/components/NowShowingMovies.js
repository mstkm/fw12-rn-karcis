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

const NowShowing = () => {
  // Get Now Showing Movies
  const [nowShowingMovies, setNowShowingMovies] = React.useState([]);
  React.useEffect(() => {
    getNowShowing();
  }, []);
  const getNowShowing = async () => {
    try {
      const response = await http().get('/movies/nowShowing');
      setNowShowingMovies(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  return (
    <View style={styles.wrapper}>
      <View style={styles.nowShowingWrapper}>
        <View style={styles.textNowShowingWrapper}>
          <Text style={styles.textNowShowing1}>Now Showing</Text>
          <Text style={styles.textNowShowing2}>view all</Text>
        </View>
      </View>
      <View style={styles.listNowShowingWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {nowShowingMovies.map((movie, index) => {
            return (
              <View key={String(index)}>
                <Pressable
                  onPress={() => setSelectedMovie(index)}
                  style={{
                    borderColor: selectedMovie === index ? '#DEDEDE' : 'white',
                    backgroundColor:
                      selectedMovie === index ? 'white' : '#D6D8E7',
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: selectedMovie === index ? 0 : 1,
                    marginRight: 16,
                    padding: 10,
                    borderTopStartRadius: 6,
                    borderTopEndRadius: 6,
                    borderBottomStartRadius: selectedMovie === index ? 0 : 6,
                    borderBottomEndRadius: selectedMovie === index ? 0 : 6,
                  }}>
                  <Image
                    source={{
                      uri: movie?.picture,
                    }}
                    style={styles.imageNowShowing}
                  />
                </Pressable>
                {selectedMovie === index ? (
                  <View style={styles.detailsWrapper}>
                    <Text
                      style={styles.textTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {movie?.title}
                    </Text>
                    <Text style={styles.textGenre}>{movie?.genre}</Text>
                    <Pressable style={styles.btnDetails}>
                      <Text style={styles.textBtnDetails}>Details</Text>
                    </Pressable>
                  </View>
                ) : (
                  false
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
    height: 230,
    borderRadius: 4,
  },
  line: {
    position: 'absolute',
    width: 169,
    left: 1,
    bottom: 100,
    height: 10,
    borderTopColor: 'black',
    borderTopWidth: 3,
  },
  detailsWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 172,
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
