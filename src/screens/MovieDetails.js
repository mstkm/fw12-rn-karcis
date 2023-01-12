/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Box,
  Text,
  NativeBaseProvider,
  ScrollView,
  Image,
  HStack,
  Stack,
  Pressable,
  Modal,
  useDisclose,
  Actionsheet,
  Button,
  Skeleton,
} from 'native-base';
import NavbarUser from '../components/NavbarUser';
import Icon from 'react-native-vector-icons/Feather';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Footer from '../components/Footer';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {transaction as transactionAction} from '../redux/reducers/transaction';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const minDate = new Date(); // Today
  const maxDate = new Date(2023, 6, 3);

  const [selectedCity, setSelectedCity] = React.useState('');

  const [selectedTime, setSelectedTime] = React.useState(null);
  const [selectedCinema, setSelectedCinema] = React.useState(null);
  const handleSelectTime = (time, cinemaId) => {
    setSelectedTime(time);
    setSelectedCinema(cinemaId);
  };

  // Get Movie By Id
  const movieId = useSelector(state => state?.transaction?.movieId);
  const [movie, setMovie] = React.useState({});
  const movieTitle = movie?.title;
  React.useEffect(() => {
    getMovie().then(response => {
      setMovie(response?.data?.results);
    });
  }, []);
  const getMovie = async () => {
    try {
      const response = await http().get(`/movies/${movieId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Get Movie Schedules
  const [movieSchedules, setMovieSchedules] = React.useState([]);
  React.useEffect(() => {
    getMovieSchedules().then(response => {
      setMovieSchedules(response?.data?.results);
    });
  }, [movieId, selectedCity, selectedDate]);
  const getMovieSchedules = async () => {
    try {
      const response = await http().get(
        `/movieSchedule/listMovieSChedule/${movieId}/${selectedCity}/${selectedDate}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Book Now
  const handleBookNow = (
    cinemaId,
    cinemaName,
    price,
    movieScheduleId,
    cinemaPicture,
  ) => {
    dispatch(
      transactionAction({
        bookingDate: selectedDate,
        cinemaId,
        cinemaName,
        cinemaPicture,
        price,
        movieScheduleId,
        bookingTime: selectedTime,
        movieId,
        movieTitle,
      }),
    );
    navigation.navigate('OrderPage');
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        {movie?.picture ? (
          <Stack space={6} px="5" py={8} bg="white">
            <Box alignItems="center">
              <Box
                borderWidth={1}
                width="200"
                p="5"
                borderRadius="8"
                borderColor="#DEDEDE">
                <Image
                  source={{uri: movie?.picture}}
                  alt="spiderman"
                  width="160"
                  height="240"
                  borderRadius={8}
                  resizeMode="contain"
                />
              </Box>
            </Box>
            <Stack space={1}>
              <Text textAlign="center" fontSize="16" fontWeight="bold">
                {movie?.title}
              </Text>
              <Text textAlign="center">{movie?.genre}</Text>
            </Stack>
            <Stack space={3}>
              <HStack space={20}>
                <Box width={100}>
                  <Text>Release date</Text>
                  <Text fontWeight="bold">
                    {moment(movie?.releaseDate).format('ll')}
                  </Text>
                </Box>
                <Box width={160}>
                  <Text>Directed by</Text>
                  <Text fontWeight="bold">{movie?.director}</Text>
                </Box>
              </HStack>
              <HStack space={20}>
                <Box width={100}>
                  <Text>Duration</Text>
                  <Text fontWeight="bold">
                    {Number(String(movie?.duration).split(':')[0])} hrs{' '}
                    {Number(String(movie?.duration).split(':')[1])} min
                  </Text>
                </Box>
                <Box width={160}>
                  <Text>Casts</Text>
                  <Text fontWeight="bold">{movie?.casts}</Text>
                </Box>
              </HStack>
            </Stack>
            <Stack space={3} borderTopWidth="0.5" borderColor="#D6D8E7" pt={8}>
              <Text fontWeight="bold">Synopsis</Text>
              <Text>{movie?.synopsis}</Text>
            </Stack>
          </Stack>
        ) : (
          <Box px="5" py="10">
            <Skeleton h="500px" />
            <Skeleton.Text py="4" />
            <Skeleton px="4" my="4" rounded="xl" h="20" startColor="gray.300" />
          </Box>
        )}
        <Stack px="5" bg="#F5F6F8" py="10">
          <Box mb="5">
            <Text textAlign="center" fontSize={16} fontWeight="bold">
              Showtimes and Tickets
            </Text>
          </Box>
          <Box mb="2" alignItems="center">
            <Pressable
              onPress={() => setShowModal(true)}
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              borderWidth="1"
              borderRadius={4}
              borderColor="#EFF0F6"
              bg="#EFF0F6"
              px="3"
              width={180}
              height={35}>
              <Icon name="calendar" size={18} />
              <Text ml="3" flex={1}>
                {selectedDate ? selectedDate : 'Set a date'}
              </Text>
              <Icon name="chevron-down" size={18} />
            </Pressable>
            <Modal
              size="full"
              isOpen={showModal}
              onClose={() => setShowModal(false)}>
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Body backgroundColor="white">
                  <Box backgroundColor="white" pt="12">
                    <CalendarPicker
                      minDate={minDate}
                      maxDate={maxDate}
                      todayBackgroundColor="#f2e6ff"
                      selectedDayColor="#00005C"
                      selectedDayTextColor="#FFFFFF"
                      onDateChange={value =>
                        setSelectedDate(
                          String(moment(value).format()).split('T')[0],
                        )
                      }
                    />
                  </Box>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Box>
          <Box mb="8" alignItems="center">
            <Pressable
              onPress={onOpen}
              flexDirection="row"
              alignItems="center"
              borderWidth="1"
              borderRadius={4}
              borderColor="#EFF0F6"
              bg="#EFF0F6"
              px="3"
              width={180}
              height={35}>
              <Icon name="map-pin" size={18} />
              <Text ml="3" flex={1}>
                {selectedCity ? selectedCity : 'Set a city'}
              </Text>
              <Icon name="chevron-down" size={18} />
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Actionsheet.Item onPress={() => setSelectedCity('Jakarta')}>
                  Jakarta
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => setSelectedCity('Purwokerto')}>
                  Purwokerto
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </Box>
          {movieSchedules?.map(movieSchedule => {
            return (
              <Box
                key={String(movieSchedule?.id)}
                bg="white"
                borderRadius={8}
                alignItems="center"
                mb="5">
                <Box alignItems="center" py="5">
                  <Image
                    source={{
                      uri: movieSchedule?.cinemaPicture,
                    }}
                    alt={movieSchedule?.cinemaName}
                    resizeMode="contain"
                    width={100}
                    height={50}
                    mb="1"
                  />
                  <Text>{movieSchedule?.address}</Text>
                </Box>
                <Box
                  flexDirection="row"
                  flexWrap="wrap"
                  borderTopWidth="0.5"
                  py="5"
                  px="5">
                  {movieSchedule?.time.sort().map((time, index) => {
                    return (
                      <Pressable
                        key={String(index)}
                        width={75}
                        py="1.5"
                        onPress={() =>
                          handleSelectTime(time, movieSchedule?.id)
                        }>
                        <Text
                          color={
                            selectedTime === time &&
                            selectedCinema === movieSchedule?.id
                              ? '#00005C'
                              : 'black'
                          }
                          fontWeight={
                            selectedTime === time &&
                            selectedCinema === movieSchedule?.id
                              ? 'bold'
                              : ''
                          }>
                          {time.split(':')[0] +
                            ':' +
                            time.split(':')[1] +
                            (time.split(':')[0] < 12 ? 'am' : 'pm')}
                        </Text>
                      </Pressable>
                    );
                  })}
                </Box>
                <Box flexDirection="row" px="5" py="3">
                  <Text flex={1} fontSize={16}>
                    Price
                  </Text>
                  <Text fontSize={16} fontWeight="bold">
                    Rp
                    {new Intl.NumberFormat('en-DE').format(
                      movieSchedule?.price,
                    )}
                  </Text>
                </Box>
                <Box width="full" px="5" pt="3" pb="8">
                  <Button
                    onPress={() =>
                      handleBookNow(
                        movieSchedule?.cinemaId,
                        movieSchedule?.cinemaName,
                        movieSchedule?.price,
                        movieSchedule?.id,
                        movieSchedule?.cinemaPicture,
                      )
                    }
                    bg="#00005C"
                    borderColor="#00005C"
                    py="3"
                    borderRadius={4}
                    alignItems="center"
                    justifyContent="center">
                    <Text color="white">Book Now</Text>
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default MovieDetails;
