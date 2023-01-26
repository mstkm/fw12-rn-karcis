/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  NativeBaseProvider,
  ScrollView,
  Text,
  Stack,
  Image,
  Input,
  Modal,
  Pressable,
  HStack,
  Button,
  Select,
} from 'native-base';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import http from '../helpers/http';
import {useSelector} from 'react-redux';

const ManageSchedule = () => {
  const token = useSelector(state => state?.auth?.token);
  // Get movies
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    getMovies().then(response => {
      setMovies(response?.data?.results);
    });
  }, [movies]);
  const getMovies = async () => {
    try {
      const response = await http().get('/movies?limit=1000&sortBy=title');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle select movie
  const [movieById, setMovieById] = React.useState(null);
  const getMovie = async movieId => {
    if (movieId) {
      try {
        const response = await http().get(`/movies/${movieId}`);
        setMovieById(response?.data?.results);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle Price
  const [price, setPrice] = React.useState(null);

  // Handle premiere & location
  const [premiere, setPremiere] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [cinemaId, setCinemaId] = React.useState(null);
  const handlePremiere = cinema => {
    setPremiere(cinema);
    if (location === 'Purwokerto' && cinema === 'ebv.id') {
      setCinemaId(1);
    } else if (location === 'Purwokerto' && cinema === 'Hiflix') {
      setCinemaId(2);
    } else if (location === 'Purwokerto' && cinema === 'CineOne21') {
      setCinemaId(3);
    } else if (location === 'Jakarta' && cinema === 'ebv.id') {
      setCinemaId(4);
    } else if (location === 'Jakarta' && cinema === 'Hiflix') {
      setCinemaId(5);
    } else if (location === 'Jakarta' && cinema === 'CineOne21') {
      setCinemaId(6);
    }
  };
  const handleLocation = city => {
    setLocation(city);
    if (city === 'Purwokerto' && premiere === 'ebv.id') {
      setCinemaId(1);
    } else if (city === 'Purwokerto' && premiere === 'Hiflix') {
      setCinemaId(2);
    } else if (city === 'Purwokerto' && premiere === 'CineOne21') {
      setCinemaId(3);
    } else if (city === 'Jakarta' && premiere === 'ebv.id') {
      setCinemaId(4);
    } else if (city === 'Jakarta' && premiere === 'Hiflix') {
      setCinemaId(5);
    } else if (city === 'Jakarta' && premiere === 'CineOne21') {
      setCinemaId(6);
    }
  };

  // Handle date start & date end
  const [showModalStart, setShowModalStart] = React.useState(false);
  const [showModalEnd, setShowModalEnd] = React.useState(false);
  const [dateStart, setDateStart] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);

  // Handle time
  const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const [selectedTimes, setSelectedTimes] = React.useState([]);
  const handleSelectTime = time => {
    if (!selectedTimes.includes(time)) {
      setSelectedTimes([...selectedTimes, time]);
    } else {
      setSelectedTimes(selectedTimes?.filter(el => el !== time));
    }
  };

  // Handle reset
  const handleReset = () => {
    setPrice(null);
    setPremiere(null);
    setLocation(null);
    setDateStart(null);
    setDateEnd(null);
    setSelectedTimes([]);
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      const response = await http(token).post('/movieSchedule', {
        movieId: movieById?.id,
        cinemaId,
        price,
        startDate: dateStart,
        endDate: dateEnd,
      });
      const movieScheduleId = response?.data?.results?.id;
      selectedTimes?.map(async item => {
        await http(token).post('/movieScheduleTimes', {
          time: item,
          movieScheduleId,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Data Schedule
  // Get data schedule
  const [sort, setSort] = React.useState(null);
  const [locationSchedule, setLocationSchedule] = React.useState(null);
  const [movieSchedule, setMovieSchedule] = React.useState(null);
  const [schedules, setSchedules] = React.useState([]);
  const today = moment().format().split('T')[0];
  React.useEffect(() => {
    getSchedules().then(response => {
      setSchedules(response?.data?.results);
    });
  }, [schedules]);
  const getSchedules = async () => {
    try {
      const response = await http(token).get(
        `/movieSchedule/listMovieSChedule/${movieSchedule}/${locationSchedule}/$today}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle update data schedule
  const updateShedule = () => {
    console.log(typeof today);
    console.log(typeof locationSchedule);
    console.log(typeof movieSchedule);
  };

  // Pagination
  const [page, setPage] = React.useState(1);
  const increamentPage = () => {
    if (page >= 1 && page < 5) {
      setPage(page + 1);
    } else {
      setPage(page);
    }
  };
  const decreamentPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarAdmin />
        <Stack px="5" py="10" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Form Schedule
          </Text>
          <Box bg="white" px="5" py="8" borderRadius={4}>
            <Box>
              <Box alignItems="center" mb="5">
                <Box
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={1}
                  borderColor="#A0A3BD"
                  borderRadius={4}
                  width="223"
                  height="308"
                  p="8">
                  {movieById ? (
                    <>
                      <Image
                        source={{
                          uri: movieById?.picture,
                        }}
                        alt={movieById?.title}
                        width="156"
                        height="236"
                        resizeMode="contain"
                        borderRadius={4}
                      />
                    </>
                  ) : (
                    <Image
                      source={{
                        uri: 'https://res.cloudinary.com/dvzrmzldr/image/upload/v1673950214/icons8-image-64_fzftmz.png',
                      }}
                      alt="banner movie"
                      width="100"
                      height="100"
                      resizeMode="contain"
                    />
                  )}
                </Box>
              </Box>
              <Stack space="5">
                <Box>
                  <Text mb="2">Movie Name</Text>
                  <Box>
                    <Select
                      bg="#FCFDFE"
                      onValueChange={value => getMovie(value)}
                      minWidth="100"
                      height={38}
                      placeholder="Select movie"
                      fontSize="14"
                      borderRadius="16">
                      {movies?.map(moviesItem => {
                        return (
                          <Select.Item
                            key={String(moviesItem?.id)}
                            label={moviesItem?.title}
                            value={moviesItem?.id}>
                            {moviesItem?.title}
                          </Select.Item>
                        );
                      })}
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <Text mb="2">Price</Text>
                  <Input
                    defaultValue={price ? price : null}
                    onChangeText={value => setPrice(value)}
                    fontSize={14}
                    isRequired={true}
                    keyboardType="numeric"
                    type="text"
                    placeholder="Enter price"
                  />
                </Box>
                <Box>
                  <Text mb="2">Premiere</Text>
                  <Box>
                    <Select
                      bg="#FCFDFE"
                      selectedValue={premiere}
                      onValueChange={value => handlePremiere(value)}
                      minWidth="100"
                      height={50}
                      placeholder="Select premiere"
                      fontSize="14"
                      borderRadius="16">
                      <Select.Item label="ebv.id" value="ebv.id">
                        ebv.id
                      </Select.Item>
                      <Select.Item label="Hiflix" value="Hiflix">
                        Hiflix
                      </Select.Item>
                      <Select.Item label="CineOne21" value="CineOne21">
                        CineOne21
                      </Select.Item>
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <Text mb="2">Location</Text>
                  <Box>
                    <Select
                      bg="#FCFDFE"
                      selectedValue={location}
                      onValueChange={value => handleLocation(value)}
                      minWidth="100"
                      height={50}
                      placeholder="Select location"
                      fontSize="14"
                      borderRadius="16">
                      <Select.Item label="Jakarta" value="Jakarta">
                        Jakarta
                      </Select.Item>
                      <Select.Item label="Purwokerto" value="Purwokerto">
                        Purwokerto
                      </Select.Item>
                    </Select>
                  </Box>
                </Box>
                <HStack space="5">
                  <Box>
                    <Text mb="2">Date Start</Text>
                    <Pressable
                      onPress={() => setShowModalStart(true)}
                      isRequired={true}
                      borderWidth={1}
                      borderColor="#DEDEDE"
                      width="141"
                      height={47}
                      borderRadius={16}
                      justifyContent="center"
                      pl="3">
                      <Text color={dateStart ? 'black' : 'grey'}>
                        {dateStart ? dateStart : 'Enter date start'}
                      </Text>
                    </Pressable>
                    <Modal
                      size="full"
                      isOpen={showModalStart}
                      onClose={() => setShowModalStart(false)}>
                      <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Body backgroundColor="white">
                          <Box backgroundColor="white" pt="12">
                            <CalendarPicker
                              todayBackgroundColor="#f2e6ff"
                              selectedDayColor="#00005C"
                              selectedDayTextColor="#FFFFFF"
                              onDateChange={value =>
                                setDateStart(
                                  String(moment(value).format()).split('T')[0],
                                )
                              }
                            />
                          </Box>
                        </Modal.Body>
                      </Modal.Content>
                    </Modal>
                  </Box>
                  <Box>
                    <Text mb="2">Date End</Text>
                    <Pressable
                      onPress={() => setShowModalEnd(true)}
                      isRequired={true}
                      borderWidth={1}
                      borderColor="#DEDEDE"
                      width="141"
                      height={47}
                      borderRadius={16}
                      justifyContent="center"
                      pl="3">
                      <Text color={dateEnd ? 'black' : 'grey'}>
                        {dateEnd ? dateEnd : 'Enter date end'}
                      </Text>
                    </Pressable>
                    <Modal
                      size="full"
                      isOpen={showModalEnd}
                      onClose={() => setShowModalEnd(false)}>
                      <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Body backgroundColor="white">
                          <Box backgroundColor="white" pt="12">
                            <CalendarPicker
                              todayBackgroundColor="#f2e6ff"
                              selectedDayColor="#00005C"
                              selectedDayTextColor="#FFFFFF"
                              onDateChange={value =>
                                setDateEnd(
                                  String(moment(value).format()).split('T')[0],
                                )
                              }
                            />
                          </Box>
                        </Modal.Body>
                      </Modal.Content>
                    </Modal>
                  </Box>
                </HStack>
                <Box>
                  <Text mb="2">Time</Text>
                  <Box flexDirection="row" flexWrap="wrap">
                    <Pressable
                      width="33%"
                      borderWidth={1}
                      borderRadius={16}
                      mb="3">
                      <Text textAlign="center">+</Text>
                    </Pressable>
                    {times.map((timesItem, index) => {
                      return (
                        <Pressable
                          key={String(index)}
                          onPress={() => handleSelectTime(timesItem)}
                          width="33%"
                          mb="3">
                          <Text
                            textAlign="center"
                            fontWeight={
                              selectedTimes.includes(timesItem)
                                ? 'bold'
                                : 'normal'
                            }
                            color={
                              selectedTimes.includes(timesItem)
                                ? '#00005C'
                                : 'black'
                            }>
                            {timesItem +
                              (timesItem.split(':')[0] < 12 ? 'am' : 'pm')}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </Box>
                </Box>
                <Stack space="2" mt="3">
                  <Button
                    onPress={handleReset}
                    borderWidth={1}
                    borderColor="#00005C"
                    bg="white">
                    <Text color="#00005C">Reset</Text>
                  </Button>
                  <Button
                    onPress={handleSubmit}
                    borderWidth={1}
                    borderColor="#00005C"
                    bg="#00005C">
                    <Text color="white">Submit</Text>
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
        <Stack px="5" pb="10" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Data Schedule
          </Text>
          <HStack mb="3">
            <Box>
              <Select
                bg="#FCFDFE"
                selectedValue={sort}
                onValueChange={value => setSort(value)}
                minWidth="90"
                height={10}
                accessibilityLabel="Choose Service"
                placeholder="Sort"
                fontSize="14"
                borderRadius="16">
                <Select.Item label="ASC" value="ASC">
                  ASC
                </Select.Item>
                <Select.Item label="DESC" value="DESC">
                  DESC
                </Select.Item>
              </Select>
            </Box>
            <Box>
              <Select
                bg="#FCFDFE"
                mx="1"
                selectedValue={locationSchedule}
                onValueChange={value => setLocationSchedule(value)}
                minWidth="120"
                height={10}
                accessibilityLabel="Choose Service"
                placeholder="Location"
                fontSize="14"
                borderRadius="16">
                <Select.Item label="Jakarta" value="Jakarta">
                  Jakarta
                </Select.Item>
                <Select.Item label="Purwokerto" value="Purwokerto">
                  Purwokerto
                </Select.Item>
              </Select>
            </Box>
            <Box>
              <Select
                bg="#FCFDFE"
                onValueChange={value => setMovieSchedule(value)}
                minWidth="120"
                height={10}
                accessibilityLabel="Choose Service"
                placeholder="Movie"
                fontSize="14"
                borderRadius="16">
                {movies?.map(moviesItem => {
                  return (
                    <Select.Item
                      key={String(moviesItem?.id)}
                      label={moviesItem?.title}
                      value={moviesItem?.id}>
                      {moviesItem?.title}
                    </Select.Item>
                  );
                })}
              </Select>
            </Box>
          </HStack>
          {schedules?.map(elSchedules => {
            return (
              <Box bg="white" borderRadius={8} alignItems="center" mb="5">
                <Box alignItems="center" py="5">
                  <Image
                    source={{uri: elSchedules?.cinemaPicture}}
                    alt="ebv.id"
                    resizeMode="contain"
                    width={100}
                    height={50}
                    mb="1"
                  />
                  <Text>{elSchedules?.address}</Text>
                </Box>
                <Box
                  flexDirection="row"
                  flexWrap="wrap"
                  borderTopWidth="0.5"
                  py="5"
                  px="5">
                  {elSchedules?.time.sort().map((time, index) => {
                    return (
                      <Pressable key={String(index)} width={75} py="1.5">
                        <Text>
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
                    {new Intl.NumberFormat('en-DE').format(elSchedules?.price)}
                  </Text>
                </Box>
                <HStack space="5" mb="8">
                  <Box>
                    <Button
                      onPress={updateShedule}
                      width="145"
                      height={35}
                      bg="white"
                      on
                      borderWidth={1}
                      borderColor="#00005C"
                      borderRadius={4}
                      p={0}
                      alignItems="center"
                      justifyContent="center">
                      <Text color="#00005C">Update</Text>
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      width="145"
                      height={35}
                      bg="white"
                      borderWidth={1}
                      borderColor="red.600"
                      borderRadius={4}
                      p={0}
                      alignItems="center"
                      justifyContent="center">
                      <Text color="red.600">Delete</Text>
                    </Button>
                  </Box>
                </HStack>
              </Box>
            );
          })}
          {/* <HStack space={3} justifyContent="center">
            <Pressable
              onPress={decreamentPage}
              borderWidth="1"
              borderRadius="8"
              borderColor="#00005C"
              backgroundColor="#00005C"
              w="35px"
              h="35px"
              justifyContent="center"
              alignItems="center">
              <Icon name="chevron-left" size={20} color="white" />
            </Pressable>
            <Pressable
              borderWidth="1"
              borderRadius="8"
              borderColor="#00005C"
              w="35px"
              h="35px"
              justifyContent="center"
              alignItems="center">
              <Text fontSize="16" color="#00005C">
                {page}
              </Text>
            </Pressable>
            <Pressable
              onPress={increamentPage}
              borderWidth="1"
              borderRadius="8"
              borderColor="#00005C"
              backgroundColor="#00005C"
              w="35px"
              h="35px"
              justifyContent="center"
              alignItems="center">
              <Icon name="chevron-right" size={20} color="white" />
            </Pressable>
          </HStack> */}
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ManageSchedule;
