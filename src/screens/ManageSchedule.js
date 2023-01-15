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

const ManageSchedule = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [sort, setSort] = React.useState('');
  const [premiere, setPremiere] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [locationSearch, setLocationSearch] = React.useState('');
  const [movie, setMovie] = React.useState('');
  const [page, setPage] = React.useState(1);
  const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

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
                  <Box>
                    <Select
                      bg="#FCFDFE"
                      selectedValue={sort}
                      onValueChange={value => setSort(value)}
                      minWidth="100"
                      height={38}
                      placeholder="Select movie"
                      fontSize="14"
                      borderRadius="16">
                      <Select.Item label="Spiderman" value="Spiderman">
                        Spiderman
                      </Select.Item>
                      <Select.Item label="Tenet" value="Tenet">
                        Tenet
                      </Select.Item>
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <Text mb="2">Price</Text>
                  <Input
                    fontSize={14}
                    isRequired={true}
                    keyboardType="numeric"
                    type="text"
                    placeholder="Enter movie genre"
                  />
                </Box>
                <Box>
                  <Text mb="2">Premiere</Text>
                  <Box>
                    <Select
                      bg="#FCFDFE"
                      selectedValue={premiere}
                      onValueChange={value => setPremiere(value)}
                      minWidth="100"
                      height={50}
                      placeholder="Select premiere"
                      fontSize="14"
                      borderRadius="16">
                      <Select.Item label="ebv.id" value="ebv.id">
                        ebv.id
                      </Select.Item>
                      <Select.Item label="CineOne21" value="CineOne21">
                        CineOne21
                      </Select.Item>
                      <Select.Item label="Hiflix" value="Hiflix">
                        Hiflix
                      </Select.Item>
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <Text mb="2">Location</Text>
                  <Box>
                    <Select
                      bg="#FCFDFE"
                      selectedValue={locationSearch}
                      onValueChange={value => setLocationSearch(value)}
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
                      onPress={() => setShowModal(true)}
                      isRequired={true}
                      borderWidth={1}
                      borderColor="#DEDEDE"
                      width="141"
                      height={47}
                      borderRadius={16}
                      justifyContent="center"
                      pl="3">
                      <Text color={selectedDate ? 'black' : 'grey'}>
                        {selectedDate ? selectedDate : 'Enter date start'}
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
                  <Box>
                    <Text mb="2">Date End</Text>
                    <Pressable
                      onPress={() => setShowModal(true)}
                      isRequired={true}
                      borderWidth={1}
                      borderColor="#DEDEDE"
                      width="141"
                      height={47}
                      borderRadius={16}
                      justifyContent="center"
                      pl="3">
                      <Text color={selectedDate ? 'black' : 'grey'}>
                        {selectedDate ? selectedDate : 'Enter date end'}
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
                    {times.map((time, index) => {
                      return (
                        <Pressable key={String(index)} width="33%" mb="3">
                          <Text textAlign="center">
                            {time + (time.split(':')[0] < 12 ? 'am' : 'pm')}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </Box>
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
                selectedValue={location}
                onValueChange={value => setLocation(value)}
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
                selectedValue={movie}
                onValueChange={value => setMovie(value)}
                minWidth="120"
                height={10}
                accessibilityLabel="Choose Service"
                placeholder="Movie"
                fontSize="14"
                borderRadius="16">
                <Select.Item label="Spiderman" value="Spiderman">
                  Spiderman
                </Select.Item>
              </Select>
            </Box>
          </HStack>
          <Box bg="white" borderRadius={8} alignItems="center" mb="5">
            <Box alignItems="center" py="5">
              <Image
                source={require('../images/ebv.id.png')}
                alt="ebv.id"
                resizeMode="contain"
                width={100}
                height={50}
                mb="1"
              />
              <Text>Purwokerto</Text>
            </Box>
            <Box
              flexDirection="row"
              flexWrap="wrap"
              borderTopWidth="0.5"
              py="5"
              px="5">
              {times.sort().map((time, index) => {
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
                {new Intl.NumberFormat('en-DE').format(100000)}
              </Text>
            </Box>
            <HStack space="5" mb="8">
              <Box>
                <Button
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

export default ManageSchedule;
