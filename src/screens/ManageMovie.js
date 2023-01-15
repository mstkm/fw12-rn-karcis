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
  Skeleton,
} from 'native-base';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';

const ManageMovie = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [sort, setSort] = React.useState('');
  const [search, setSearch] = React.useState('');
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
            Form Movie
          </Text>
          <Box bg="white" px="5" py="8" borderRadius={4}>
            <Box>
              <Box alignItems="center" mb="5">
                <Box
                  borderWidth={1}
                  borderColor="#A0A3BD"
                  borderRadius={4}
                  width="223"
                  height="308"
                  p="8">
                  <Image
                    source={require('../images/spiderman.png')}
                    alt="spiderman"
                    width="159"
                    height="244"
                    resizeMode="contain"
                    // borderRadius={4}
                  />
                </Box>
              </Box>
              <Stack space="5">
                <Box>
                  <Text mb="2">Movie Name</Text>
                  <Input
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie name"
                  />
                </Box>
                <Box>
                  <Text mb="2">Category</Text>
                  <Input
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie genre"
                  />
                </Box>
                <Box>
                  <Text mb="2">Director</Text>
                  <Input
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie director"
                  />
                </Box>
                <Box>
                  <Text mb="2">Casts</Text>
                  <Input
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter movie casts"
                  />
                </Box>
                <Box>
                  <Text mb="2">Release Date</Text>
                  <Pressable
                    onPress={() => setShowModal(true)}
                    isRequired={true}
                    borderWidth={1}
                    borderColor="#DEDEDE"
                    height={50}
                    borderRadius={3}
                    justifyContent="center"
                    pl="3">
                    <Text color={selectedDate ? 'black' : 'grey'}>
                      {selectedDate ? selectedDate : 'Enter movie release date'}
                    </Text>
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
                    fontSize={14}
                    isRequired={true}
                    type="text"
                    placeholder="Enter synopsis"
                  />
                </Box>
                <Stack space="2" mt="3">
                  <Button borderWidth={1} borderColor="#00005C" bg="white">
                    <Text color="#00005C">Reset</Text>
                  </Button>
                  <Button borderWidth={1} borderColor="#00005C" bg="#00005C">
                    <Text color="white">Submit</Text>
                  </Button>
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
          <HStack mb="8">
            <Box
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
                  source={require('../images/spiderman.png')}
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
                    Spiderman
                  </Text>
                  <Text flex={1} textAlign="center">
                    Action, Action, Action
                  </Text>
                  <Pressable
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
            <Box
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
                mx="1.5"
                my="1.5"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="8">
                <Image
                  source={require('../images/spiderman.png')}
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
                    Spiderman
                  </Text>
                  <Text flex={1} textAlign="center">
                    Action, Action, Action
                  </Text>
                  <Pressable
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
