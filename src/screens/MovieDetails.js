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
} from 'native-base';
import NavbarUser from '../components/NavbarUser';
import Icon from 'react-native-vector-icons/Feather';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Footer from '../components/Footer';

const MovieDetails = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const date = String(selectedDate).split('T')[0];
  const minDate = new Date(); // Today
  const maxDate = new Date(2023, 6, 3);
  const [showModal, setShowModal] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();

  const [selectedCity, setSelectedCity] = React.useState('');

  const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [isPress, setIsPress] = React.useState(false);
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <Stack space={6} px="5" py={8} bg="white">
          <Box alignItems="center">
            <Box
              borderWidth={1}
              width="200"
              p="5"
              borderRadius="8"
              borderColor="#DEDEDE">
              <Image
                source={require('../images/spiderman.png')}
                alt="spiderman"
                width="160"
                resizeMode="contain"
              />
            </Box>
          </Box>
          <Stack space={2}>
            <Text textAlign="center" fontSize="16" fontWeight="bold">
              Spider-Man: Homecoming
            </Text>
            <Text textAlign="center">Adventure, Action, Sci-Fi</Text>
          </Stack>
          <Stack space={3}>
            <HStack space={20}>
              <Box width={100}>
                <Text>Release date</Text>
                <Text fontWeight="bold">June 28, 2017</Text>
              </Box>
              <Box width={160}>
                <Text>Directed by</Text>
                <Text fontWeight="bold">Jon Watss</Text>
              </Box>
            </HStack>
            <HStack space={20}>
              <Box width={100}>
                <Text>Duration</Text>
                <Text fontWeight="bold">2 hrs 13 min</Text>
              </Box>
              <Box width={160}>
                <Text>Casts</Text>
                <Text fontWeight="bold">
                  Tom Holland, Robert Downey Jr., etc.
                </Text>
              </Box>
            </HStack>
          </Stack>
          <Stack space={3} borderTopWidth="0.5" borderColor="#D6D8E7" pt={8}>
            <Text fontWeight="bold">Synopsis</Text>
            <Text>
              Thrilled by his experience with the Avengers, Peter returns home,
              where he lives with his Aunt May, under the watchful eye of his
              new mentor Tony Stark, Peter tries to fall back into his normal
              daily routine - distracted by thoughts of proving himself to be
              more than just your friendly neighborhood Spider-Man - but when
              the Vulture emerges as a new villain, everything that Peter holds
              most important will be threatened.{' '}
            </Text>
          </Stack>
        </Stack>
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
                {date ? date : 'Set a date'}
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
                        setSelectedDate(moment(value).format())
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
          <Box bg="white" borderRadius={8} alignItems="center">
            <Box alignItems="center" py="5">
              <Image
                source={require('../images/ebv.id.png')}
                alt="ebv.id"
                resizeMode="contain"
                width={100}
                height={50}
                mb="1"
              />
              <Text>Whatever street No.12, South Purwokerto</Text>
            </Box>
            <Box
              flexDirection="row"
              flexWrap="wrap"
              borderTopWidth="0.5"
              py="5"
              px="5">
              {times.map((time, index) => {
                return (
                  <Pressable
                    key={String(index)}
                    width={75}
                    py="1.5"
                    onPress={() => setSelectedTime(time)}>
                    <Text
                      color={selectedTime === time ? '#00005C' : 'black'}
                      fontWeight={selectedTime === time ? 'bold' : ''}>
                      {time + (time.split(':')[0] < 12 ? 'am' : 'pm')}
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
                Rp50.000
              </Text>
            </Box>
            <Box width="full" px="5" pt="3" pb="8">
              <Pressable
                onPressIn={() => setIsPress(true)}
                onPressOut={() => setIsPress(false)}
                bg={isPress ? 'black' : '#00005C'}
                borderColor="#00005C"
                height={35}
                borderRadius={4}
                alignItems="center"
                justifyContent="center">
                <Text color="white">Book Now</Text>
              </Pressable>
            </Box>
          </Box>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default MovieDetails;
