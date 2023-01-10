import {
  Box,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
  Pressable,
  HStack,
  Image,
  Button,
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import NavbarUser from '../components/NavbarUser';

const OrderPage = () => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const number1 = [1, 2, 3, 4, 5, 6, 7];
  const number2 = [8, 9, 10, 11, 12, 13, 14];
  const [selectedSeat, setSelectedSeat] = React.useState([]);
  const handleChooseSeat = seat => {
    if (!selectedSeat.includes(seat)) {
      setSelectedSeat([...selectedSeat, seat]);
    } else {
      setSelectedSeat(selectedSeat.filter(el => el !== seat));
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <Stack px="5" py="8" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Choose Your Seat
          </Text>
          <Box bg="white" px="3" py="5" borderRadius={8}>
            <Box width="full" height="2" bg="#9570FE" borderRadius="8" />
            <HStack space={3} justifyContent="center" pb="5" pt="3">
              <Box>
                {alphabet.map(alp => {
                  return (
                    <Box flexDirection="row">
                      {number1.map(num => {
                        const seat = alp + num;
                        return (
                          <Pressable
                            borderWidth={1}
                            borderRadius={4}
                            w="18px"
                            h="18px"
                            m="0.5"
                            bg={
                              selectedSeat.includes(seat)
                                ? '#00005C'
                                : '#D6D8E7'
                            }
                            onPress={() => handleChooseSeat(seat)}
                          />
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
              <Box>
                {alphabet.map(alp => {
                  return (
                    <Box flexDirection="row">
                      {number2.map(num => {
                        const seat = alp + num;
                        return (
                          <Pressable
                            borderWidth={1}
                            borderRadius={4}
                            w="18px"
                            h="18px"
                            m="0.5"
                            bg={
                              selectedSeat.includes(seat)
                                ? '#00005C'
                                : '#D6D8E7'
                            }
                            onPress={() => handleChooseSeat(seat)}
                          />
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </HStack>
            <Text fontSize={16} fontWeight="bold" mb="3">
              Seating Key
            </Text>
            <HStack space={20} mb="1.5">
              <Box flexDirection="row" alignItems="center">
                <Icon name="arrow-down" size={20} />
                <Text ml="3">A - G</Text>
              </Box>
              <Box flexDirection="row" alignItems="center">
                <Icon name="arrow-right" size={20} />
                <Text ml="3">1 - 14</Text>
              </Box>
            </HStack>
            <HStack space="45px" mb="1.5">
              <Box flexDirection="row">
                <Box
                  borderWidth={1}
                  borderRadius={4}
                  borderColor="#D6D8E7"
                  w="5"
                  h="5"
                  m="0.5"
                  bg="#D6D8E7"
                />
                <Text ml="3">Available</Text>
              </Box>
              <Box flexDirection="row">
                <Box
                  borderWidth={1}
                  borderRadius={4}
                  borderColor="#00005C"
                  w="5"
                  h="5"
                  m="0.5"
                  bg="#00005C"
                />
                <Text ml="3">Selected</Text>
              </Box>
            </HStack>
            <Box flexDirection="row">
              <Box
                borderWidth={1}
                borderRadius={4}
                borderColor="#6E7191"
                w="5"
                h="5"
                m="0.5"
                bg="#6E7191"
              />
              <Text ml="3">Sold</Text>
            </Box>
          </Box>
        </Stack>
        <Stack px="5" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Order Info
          </Text>
          <Box p="5" bg="white" alignItems="center" borderRadius={8}>
            <Image
              source={require('../images/cineone21.png')}
              alt="cineone21"
              width={120}
              height={50}
              resizeMode="contain"
            />
            <Text fontSize={18} mb={1}>
              CineOne21 Cinema
            </Text>
            <Text mb="5">Spider-Man: Homecoming</Text>
            <HStack mb="2">
              <Text flex={1}>Tuesday, 07 July 2020</Text>
              <Text fontWeight="bold">02:00pm</Text>
            </HStack>
            <HStack mb="2">
              <Text flex={1}>One ticket price</Text>
              <Text fontWeight="bold">Rp50.000</Text>
            </HStack>
            <HStack mb="5">
              <Text flex={1}>Seat choosed</Text>
              <Text fontWeight="bold">C4, C5, C6</Text>
            </HStack>
            <HStack pt="5" borderTopWidth={1} borderTopColor="#E6E6E6">
              <Text flex={1} fontSize={16} fontWeight="bold">
                Total Payment
              </Text>
              <Text fontSize={16} color="#00005C" fontWeight="bold">
                Rp150.000
              </Text>
            </HStack>
          </Box>
          <Button
            my="8"
            width="full"
            height={45}
            bg="#00005C"
            borderRadius={16}
            alignItems="center"
            justifyContent="center">
            <Text color="white" fontWeight="bold">
              Checkout Now
            </Text>
          </Button>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default OrderPage;
