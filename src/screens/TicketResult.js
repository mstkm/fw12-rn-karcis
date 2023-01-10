import {
  Box,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import Footer from '../components/Footer';
import NavbarUser from '../components/NavbarUser';

const TicketResult = () => {
  return (
    <NativeBaseProvider>
      <ScrollView>
        <NavbarUser />
        <Box p="10" bg="#E5E5E5">
          <Box bg="#FFFFFF" borderRadius={8}>
            <Box alignItems="center" pb="10" pt="8">
              <Image
                source={require('../images/qr-code.png')}
                alt="qrcode"
                width={200}
                height={200}
              />
            </Box>
            <Stack
              space={5}
              p="10"
              borderTopWidth={2}
              borderTopColor="#DEDEDE"
              borderStyle="dashed"
              position="relative">
              <Box
                w="12"
                h="12"
                borderRadius="full"
                top={-24}
                left={-28}
                bg="#E5E5E5"
                position="absolute"
              />
              <Box
                w="12"
                h="12"
                borderRadius="full"
                top={-24}
                right={-28}
                bg="#E5E5E5"
                position="absolute"
              />
              <HStack>
                <Box width="40%">
                  <Text>Movie</Text>
                  <Text numberOfLines={1} fontWeight="bold">
                    Spider-Man: Homecoming
                  </Text>
                </Box>
                <Box ml="12">
                  <Text>Category</Text>
                  <Text fontWeight="bold">Action</Text>
                </Box>
              </HStack>
              <HStack>
                <Box width="40%">
                  <Text>Date</Text>
                  <Text numberOfLines={1} fontWeight="bold">
                    07 Jul
                  </Text>
                </Box>
                <Box ml="12">
                  <Text>Time</Text>
                  <Text fontWeight="bold">2:00pm</Text>
                </Box>
              </HStack>
              <HStack>
                <Box width="40%">
                  <Text>Count</Text>
                  <Text numberOfLines={1} fontWeight="bold">
                    3 pcs
                  </Text>
                </Box>
                <Box ml="12">
                  <Text>Seats</Text>
                  <Text fontWeight="bold">C4, C5, C6</Text>
                </Box>
              </HStack>
              <HStack
                borderWidth={1}
                borderRadius={4}
                height={45}
                alignItems="center"
                justifyContent="center"
                px="5">
                <Text flex={1} fontSize={16}>
                  Total
                </Text>
                <Text fontSize={16} fontWeight="bold">
                  Rp150.000
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Box>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default TicketResult;
