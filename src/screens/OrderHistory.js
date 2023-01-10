import {
  Box,
  NativeBaseProvider,
  ScrollView,
  Text,
  HStack,
  Pressable,
  Image,
  Stack,
  Button,
} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';
import Footer from '../components/Footer';

const OrderHistory = () => {
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <HStack px="5" bg="white">
          <Pressable width="50%">
            <Text fontSize={16} textAlign="center" py="5">
              Details Account
            </Text>
          </Pressable>
          <Pressable width="50%">
            <Text
              fontSize={16}
              textAlign="center"
              py="5"
              borderBottomWidth={2}
              fontWeight="bold"
              borderBottomColor="#00005C">
              Order History
            </Text>
          </Pressable>
        </HStack>
        <Stack px="5" py="8" bg="#E5E5E5">
          <Box bg="white" py="5" borderRadius={16}>
            <Box pb="8" px="5">
              <Image
                source={require('../images/cineone21.png')}
                alt="cineone21"
                width={120}
                height={50}
                resizeMode="contain"
                mb="3"
              />
              <Text>Tuesday, 07 July 2020 - 04:30pm</Text>
              <Text fontWeight="bold" fontSize={18}>
                Spider-Man: Homecoming
              </Text>
            </Box>
            <Box
              pt="8"
              pb="3"
              px="5"
              borderTopWidth={1}
              borderTopColor="#DEDEDE">
              <Button borderRadius={8} bg="#00BA88">
                <Text color="#FFFFFF">Ticket in active</Text>
              </Button>
            </Box>
          </Box>
        </Stack>
        <Stack px="5" pb="8" bg="#E5E5E5">
          <Box bg="white" py="5" borderRadius={16}>
            <Box pb="8" px="5">
              <Image
                source={require('../images/ebv.id.png')}
                alt="ebv.id"
                width={100}
                height={50}
                resizeMode="contain"
                mb="3"
              />
              <Text>Monday, 14 June 2020 - 02:00pm</Text>
              <Text fontWeight="bold" fontSize={18}>
                Avengers: End Game
              </Text>
            </Box>
            <Box
              pt="8"
              pb="3"
              px="5"
              borderTopWidth={1}
              borderTopColor="#DEDEDE">
              <Button borderRadius={8} bg="#6E7191">
                <Text color="#FFFFFF">Ticket used</Text>
              </Button>
            </Box>
          </Box>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default OrderHistory;
