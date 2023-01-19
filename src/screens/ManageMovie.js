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
  TextArea,
  Button,
  Select,
  FormControl,
} from 'native-base';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import http from '../helpers/http';
import {useSelector} from 'react-redux';

const ManageMovie = () => {
  const token = useSelector(state => state?.auth?.token);
  const [sort, setSort] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  // Get movies
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    getMovies().then(response => {
      setMovies(response?.data);
    });
  }, [movies]);
  const getMovies = async () => {
    try {
      const response = await http().get(
        `/movies?limit=2&page=${page}&search=${search}&sort=${sort}&sortBy`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Get movie by id
  const [movie, setMovie] = React.useState(false);
  const getMovieById = async id => {
    try {
      const response = await http().get(`/movies/${id}`);
      setMovie(response?.data?.results);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const increamentPage = () => {
    if (page >= 1 && page < movies?.pageInfo?.totalPage) {
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

  // Handle Picture
  const [showModalPicture, setShowModalPicture] = React.useState(false);
  const [inputPicture, setInputPicture] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [alertSavePicture, setAlertSavePicture] = React.useState(false);
  const [alertNoPicture, setAlertNoPicture] = React.useState(false);
  const handleShowModalPicture = () => {
    setShowModalPicture(true);
    setInputPicture(null);
    setAlertNoPicture(false);
    setAlertSavePicture(false);
  };
  const handleSavePicture = () => {
    if (!inputPicture) {
      setAlertNoPicture(true);
    } else {
      setPicture(inputPicture);
      setAlertSavePicture(true);
      setTimeout(() => {
        setAlertSavePicture(false);
        setShowModalPicture(false);
      }, 3000);
    }
  };

  // Handle Title
  const [title, setTitle] = React.useState(null);

  // Handle Genre / Category
  const [inputCategory, setInputCategory] = React.useState(null);
  const inputCategoryArr = inputCategory?.split(', ');
  const [dataGenre, setDataGenre] = React.useState(null);
  const genres = dataGenre?.map(genre => genre.name);
  React.useEffect(() => {
    getGenre().then(response => {
      setDataGenre(response?.data?.results);
    });
  }, [dataGenre]);
  const getGenre = async () => {
    try {
      const response = await http().get('/genre?limit=1000');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Director
  const [director, setDirector] = React.useState(null);

  // Handle Casts
  const [inputCasts, setInputCasts] = React.useState(null);
  const inputCastsArr = inputCasts?.split(', ');
  const [dataCasts, setDataCasts] = React.useState(null);
  const casts = dataCasts?.map(cast => cast.name);
  React.useEffect(() => {
    getCasts().then(response => {
      setDataCasts(response?.data?.results);
    });
  }, [dataCasts]);
  const getCasts = async () => {
    try {
      const response = await http().get('/casts?limit=1000');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle release date
  const [showModalReleaseDate, setShowModalReleaseDate] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  // Handle duration
  const [durationHour, setDurationHour] = React.useState(null);
  const [durationMinute, setDurationMinute] = React.useState(null);
  const duration = `${durationHour}:${durationMinute}`;

  // Handle synopsis
  const [synopsis, setSynopsis] = React.useState(null);

  // Handle submit
  const [alertUpdateMovie, setAlertUpdateMovie] = React.useState(false);
  const handleSubmit = async () => {
    try {
      const responseMovie = await http(token).post('/movies', {
        title,
        picture,
        releaseDate: selectedDate,
        director,
        duration,
        synopsis,
      });
      const movieId = responseMovie?.data?.results?.id;
      inputCategoryArr.forEach(async genre => {
        // if (!genres.includes(genre)) {
        const responseGenre = await http(token).post('/genre', {name: genre});
        const genreId = responseGenre?.data?.results?.id;
        await http(token).post('/movieGenre', {movieId, genreId});
        // }
      });
      inputCastsArr.forEach(async cast => {
        // if (!casts.includes(cast)) {
        const responseCasts = await http(token).post('/casts', {name: cast});
        const castsId = responseCasts?.data?.results?.id;
        await http(token).post('/movieCasts', {movieId, castsId});
        // }
      });
      setAlertUpdateMovie(true);
      setTimeout(() => {
        setAlertUpdateMovie(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Reset
  const handleReset = () => {
    setMovie(null);
    setPicture(null);
    setTitle(null);
    setInputCategory(null);
    setDirector(null);
    setInputCasts(null);
    setSelectedDate(null);
    setDurationHour(null);
    setDurationMinute(null);
    setSynopsis(null);
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarAdmin />
        <Stack px="5" py="10" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Form Movie
          </Text>
          <Box bg="white" px="5" py="8" borderRadius={4}>
            <Box>
              <Box alignItems="center" mb="5">
                <Pressable
                  onPress={handleShowModalPicture}
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={1}
                  borderColor="#A0A3BD"
                  borderRadius={4}
                  width="223"
                  height="308"
                  p="8">
                  {movie ? (
                    <Image
                      source={{
                        uri: movie?.picture,
                      }}
                      alt={movie?.title}
                      width="156"
                      height="235"
                      resizeMode="contain"
                      borderRadius={4}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: picture
                          ? picture
                          : 'https://res.cloudinary.com/dvzrmzldr/image/upload/v1673950214/icons8-image-64_fzftmz.png',
                      }}
                      alt="banner movie"
                      width={picture ? '156' : '100'}
                      height={picture ? '235' : '100'}
                      resizeMode="contain"
                      borderRadius={4}
                    />
                  )}
                </Pressable>
                <Modal
                  isOpen={showModalPicture}
                  onClose={() => setShowModalPicture(false)}>
                  <Modal.Content maxWidth="400px">
                    <Modal.Header>Upload picture</Modal.Header>
                    <Modal.Body>
                      <FormControl>
                        <FormControl.Label>uri</FormControl.Label>
                        <Input
                          fontSize={14}
                          placeholder="Enter uri picture"
                          onFocus={() => setAlertNoPicture(false)}
                          onChangeText={value => setInputPicture(value)}
                        />
                      </FormControl>
                      {alertSavePicture && (
                        <Text color="green.600">
                          The picture has been saved
                        </Text>
                      )}
                      {alertNoPicture && (
                        <Text color="red.600">
                          The picture has not been entered
                        </Text>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button.Group space={2}>
                        <Button
                          variant="ghost"
                          colorScheme="blueGray"
                          onPress={() => {
                            setShowModalPicture(false);
                          }}>
                          Cancel
                        </Button>
                        <Button
                          onPress={handleSavePicture}
                          backgroundColor="#00005C">
                          Save
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </Box>
              <Stack space="5">
                <Box>
                  <Text mb="2">Movie Name</Text>
                  <Input
                    onChangeText={value => setTitle(value)}
                    defaultValue={movie ? movie?.title : title}
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie name"
                  />
                </Box>
                <Box>
                  <Text mb="2">Category</Text>
                  <Input
                    onChangeText={value => setInputCategory(value)}
                    defaultValue={movie ? movie?.genre : inputCategory}
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie genre"
                  />
                </Box>
                <Box>
                  <Text mb="2">Director</Text>
                  <Input
                    onChangeText={value => setDirector(value)}
                    defaultValue={movie ? movie?.director : director}
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie director"
                  />
                </Box>
                <Box>
                  <Text mb="2">Casts</Text>
                  <Input
                    onChangeText={value => setInputCasts(value)}
                    numberOfLines={1}
                    defaultValue={
                      movie ? movie?.casts?.slice(0, 38) + '...' : inputCasts
                    }
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie casts"
                  />
                </Box>
                <Box>
                  <Text mb="2">Release Date</Text>
                  <Pressable
                    onPress={() => setShowModalReleaseDate(true)}
                    isRequired={true}
                    borderWidth={1}
                    borderColor="#DEDEDE"
                    height={50}
                    borderRadius={3}
                    justifyContent="center"
                    pl="3">
                    <Text color={selectedDate || movie ? 'black' : 'grey'}>
                      {selectedDate
                        ? selectedDate
                        : movie
                        ? movie?.releaseDate?.split('T')[0]
                        : 'Enter movie release date'}
                    </Text>
                  </Pressable>
                  <Modal
                    size="full"
                    isOpen={showModalReleaseDate}
                    onClose={() => setShowModalReleaseDate(false)}>
                    <Modal.Content>
                      <Modal.CloseButton />
                      <Modal.Body backgroundColor="white">
                        <Box backgroundColor="white" pt="12">
                          <CalendarPicker
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
                <HStack space="5">
                  <Box>
                    <Text mb="2">Duration Hour</Text>
                    <Input
                      onChangeText={value => setDurationHour(value)}
                      defaultValue={
                        movie ? movie?.duration?.split(':')[0] : durationHour
                      }
                      width="141.5"
                      keyboardType="numeric"
                      fontSize={14}
                      isRequired={true}
                      type="text"
                      placeholder="Enter hour"
                    />
                  </Box>
                  <Box>
                    <Text mb="2">Duration Minute</Text>
                    <Input
                      onChangeText={value => setDurationMinute(value)}
                      defaultValue={
                        movie ? movie?.duration?.split(':')[1] : durationMinute
                      }
                      width="141.5"
                      keyboardType="numeric"
                      fontSize={14}
                      isRequired={true}
                      type="text"
                      placeholder="Enter minute"
                    />
                  </Box>
                </HStack>
                <Box>
                  <Text mb="2">Synopsis</Text>
                  <TextArea
                    onChangeText={value => setSynopsis(value)}
                    defaultValue={movie ? movie?.synopsis : synopsis}
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter synopsis"
                  />
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
                    onPress={() => handleSubmit(movie?.title)}
                    borderWidth={1}
                    borderColor="#00005C"
                    bg="#00005C">
                    <Text color="white">Submit</Text>
                  </Button>
                  {alertUpdateMovie && (
                    <Text color="green.500" textAlign="center" mt="5">
                      Movie updated
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
        <Stack px="5" pb="10" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Data Movie
          </Text>
          <HStack mb="3">
            <Box>
              <Select
                bg="#FCFDFE"
                selectedValue={sort}
                onValueChange={value => setSort(value)}
                minWidth="100"
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
              <Input
                bg="#FCFDFE"
                onChangeText={value => setSearch(value)}
                mx="3"
                placeholder="Search Movie Name ..."
                height={10}
                w="225"
                fontSize="14"
                borderRadius="16"
              />
            </Box>
          </HStack>
          <HStack mb="8" justifyContent="center" alignItems="center">
            {movies?.results?.map(movie => {
              return (
                <Box
                  key={String(movie?.id)}
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent="center">
                  <Box
                    width="160"
                    borderWidth="1"
                    borderColor="#DEDEDE"
                    backgroundColor="white"
                    p="3"
                    mx="1"
                    my="1.5"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="8">
                    <Image
                      source={{uri: movie?.picture}}
                      alt="spiderman"
                      width="150"
                      height="200"
                      mb="3"
                      borderRadius={8}
                      resizeMode="contain"
                    />
                    <Box alignItems="center" height="120">
                      <Text
                        fontSize="16"
                        fontWeight="bold"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {movie?.title}
                      </Text>
                      <Text flex={1} textAlign="center">
                        {movie?.genre}
                      </Text>
                      <Pressable
                        onPress={() => getMovieById(movie?.id)}
                        borderWidth="1"
                        borderColor="#00005C"
                        borderRadius="4"
                        justifyContent="center"
                        alignItems="center"
                        width="125"
                        height="30px"
                        mb="1">
                        <Text color="#00005C">Details</Text>
                      </Pressable>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </HStack>
          <HStack space={3} justifyContent="center">
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
          </HStack>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ManageMovie;
