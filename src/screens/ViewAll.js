/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  NativeBaseProvider,
  HStack,
  Text,
  Select,
  Input,
  ScrollView,
  Stack,
  Image,
  Pressable,
  Skeleton,
} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';
// import Month from '../components/Month';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import http from '../helpers/http';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {transaction as transactionAction} from '../redux/reducers/transaction';

const ViewAll = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sort, setSort] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const increamentPage = () => {
    if (page >= 1 && page < dataMovies?.pageInfo?.totalPage) {
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
  // Get movies
  const [dataMovies, setDataMovies] = React.useState({});
  React.useEffect(() => {
    getMovies().then(response => {
      setDataMovies(response?.data);
    });
  }, [page, sort, search]);
  const getMovies = async () => {
    try {
      const response = await http().get(
        `/movies?limit=4&page=${page}&search=${search}&sort=${sort}&sortBy=title`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Details
  const [isPress, setIsPress] = React.useState(false);
  const [selectedButton, setSelectedButton] = React.useState(null);
  const handleDetailsViewAll = movieId => {
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
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <Stack space="5" px="5" py="8" bg="#F5F6F8" zIndex={-10}>
          <Text fontSize="18" fontWeight="bold">
            List Movie
          </Text>
          <HStack>
            <Box>
              <Select
                selectedValue={sort}
                onValueChange={value => setSort(value)}
                minWidth="100"
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
                onChangeText={value => setSearch(value)}
                mx="3"
                placeholder="Search Movie Name"
                w="225"
                fontSize="14"
                borderRadius="16"
              />
            </Box>
          </HStack>
          {/* <Box>
            <Month />
          </Box> */}
          {dataMovies?.results?.length === 0 && (
            <Text textAlign="center">No result</Text>
          )}
          {dataMovies?.results ? (
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center">
              {dataMovies?.results?.map(movie => {
                return (
                  <Box
                    key={String(movie?.id)}
                    width="160"
                    borderWidth="1"
                    borderColor="#DEDEDE"
                    backgroundColor="white"
                    p="3"
                    mx="1.5"
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
                        onPress={() => handleDetailsViewAll(movie?.id)}
                        borderWidth="1"
                        borderColor="#00005C"
                        backgroundColor={
                          isPress && selectedButton === movie?.id
                            ? '#00005C'
                            : 'white'
                        }
                        borderRadius="4"
                        justifyContent="center"
                        alignItems="center"
                        width="125"
                        height="30px"
                        mb="1">
                        <Text
                          color={
                            isPress && selectedButton === movie?.id
                              ? 'white'
                              : '#00005C'
                          }>
                          Details
                        </Text>
                      </Pressable>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box>
              <Skeleton h="48" />
              <Skeleton.Text py="4" />
              <Skeleton
                px="4"
                my="4"
                rounded="xl"
                h="20"
                startColor="gray.300"
              />
            </Box>
          )}
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

export default ViewAll;
