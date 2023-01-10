import {
  Box,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Text,
  Stack,
  Image,
  Pressable,
  Input,
  Button,
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import NavbarUser from '../components/NavbarUser';

const PaymentPage = () => {
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <HStack px="5" py="5" bg="white" borderBottomRadius={16}>
          <Text flex={1} fontSize={18}>
            Total Payment
          </Text>
          <Text fontWeight="bold" fontSize={18}>
            Rp150.000
          </Text>
        </HStack>
        <Stack px="5" pt="8" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Payment Method
          </Text>
          <Box bg="white" px="3" py="5" borderRadius={16}>
            <Box space="10px" flexDirection="row" flexWrap="wrap">
              <Pressable
                borderWidth={1}
                borderRadius={8}
                borderColor="#DEDEDE"
                width="100px"
                justifyContent="center"
                alignItems="center"
                my="2">
                <Image
                  source={require('../images/google-pay.png')}
                  alt="gopay"
                  width="80px"
                  height="50px"
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                borderWidth={1}
                borderRadius={8}
                borderColor="#DEDEDE"
                width="100px"
                justifyContent="center"
                alignItems="center"
                my="2"
                mx="2">
                <Image
                  source={require('../images/visa.png')}
                  alt="gopay"
                  width="80px"
                  height="50px"
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                borderWidth={1}
                borderRadius={8}
                borderColor="#DEDEDE"
                width="100px"
                justifyContent="center"
                alignItems="center"
                my="2">
                <Image
                  source={require('../images/gopay.png')}
                  alt="gopay"
                  width="80px"
                  height="50px"
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                borderWidth={1}
                borderRadius={8}
                borderColor="#DEDEDE"
                width="100px"
                justifyContent="center"
                alignItems="center"
                my="2">
                <Image
                  source={require('../images/google-pay.png')}
                  alt="gopay"
                  width="80px"
                  height="50px"
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                borderWidth={1}
                borderRadius={8}
                borderColor="#DEDEDE"
                width="100px"
                justifyContent="center"
                alignItems="center"
                my="2"
                mx="2">
                <Image
                  source={require('../images/visa.png')}
                  alt="gopay"
                  width="80px"
                  height="50px"
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                borderWidth={1}
                borderRadius={8}
                borderColor="#DEDEDE"
                width="100px"
                justifyContent="center"
                alignItems="center"
                my="2">
                <Image
                  source={require('../images/gopay.png')}
                  alt="gopay"
                  width="80px"
                  height="50px"
                  resizeMode="contain"
                />
              </Pressable>
            </Box>
            <Box
              py="5"
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Box width="120px" height="1px" bg="#DEDEDE" />
              <Text flex={1} textAlign="center">
                or
              </Text>
              <Box width="120px" height="1px" bg="#DEDEDE" />
            </Box>
            <Box flexDirection="row" justifyContent="center" mb="3">
              <Text>Pay via cash. </Text>
              <Text color="#00005C">See how it work.</Text>
            </Box>
          </Box>
        </Stack>
        <Stack px="5" py="8" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Personal Info
          </Text>
          <Stack space={5} bg="white" px="5" py="8" borderRadius={16}>
            <Box>
              <Text mb="1">Full Name</Text>
              <Input
                defaultValue="Jonas El Rodriguez"
                fontSize={14}
                borderRadius={12}
                borderColor="#DEDEDE"
              />
            </Box>
            <Box>
              <Text mb="1">Email</Text>
              <Input
                defaultValue="jonasrodri123@gmail.com"
                fontSize={14}
                borderRadius={12}
                borderColor="#DEDEDE"
              />
            </Box>
            <Box>
              <Text mb="1">Phone Number</Text>
              <Input
                defaultValue="081445687121"
                fontSize={14}
                borderRadius={12}
                borderColor="#DEDEDE"
              />
            </Box>
            <Box
              mt="3"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              height={45}
              borderWidth={1}
              fontSize={14}
              borderRadius={12}
              bg="rgba(244, 183, 64, 0.3)"
              borderColor="#DEDEDE">
              <Icon name="alert-triangle" size={20} />
              <Text ml="5">Fill Your Data Correctly</Text>
            </Box>
          </Stack>
        </Stack>
        <Box px="5" pb="8" bg="#E5E5E5">
          <Button
            width="full"
            height={45}
            bg="#00005C"
            borderRadius={12}
            alignItems="center"
            justifyContent="center">
            <Text color="white" fontWeight="bold">
              Pay Your Order
            </Text>
          </Button>
        </Box>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default PaymentPage;
