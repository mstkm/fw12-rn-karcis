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
} from 'native-base';
import React from 'react';
import NavbarUser from '../components/NavbarUser';
import Month from '../components/Month';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';

const ViewAll = () => {
  const [sort, setSort] = React.useState('');
  const listMovie = [1, 2, 3, 4];
  const [page, setPage] = React.useState(1);
  const increamentPage = () => {
    if (page >= 1) {
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
                mx="3"
                placeholder="Search Movie Name"
                w="225"
                fontSize="14"
                borderRadius="16"
              />
            </Box>
          </HStack>
          <Box>
            <Month />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center">
            {listMovie.map((movie, index) => {
              return (
                <Box
                  key={String(index)}
                  width="160"
                  borderWidth="1"
                  borderColor="#DEDEDE"
                  backgroundColor="white"
                  px="2"
                  mx="1.5"
                  my="1.5"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="8">
                  <Image
                    source={require('../images/spiderman.png')}
                    alt="spiderman"
                    width="140"
                    resizeMode="contain"
                  />
                  <Box alignItems="center">
                    <Text
                      fontSize="16"
                      fontWeight="bold"
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Spiderman: Homecoming
                    </Text>
                    <Text textAlign="center">Action, Adventure, Sci-Fi</Text>
                    <Pressable
                      borderWidth="1"
                      borderColor="#00005C"
                      borderRadius="4"
                      justifyContent="center"
                      alignItems="center"
                      width="125"
                      height="30px"
                      mb="4">
                      <Text color="#00005C">Details</Text>
                    </Pressable>
                  </Box>
                </Box>
              );
            })}
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

export default ViewAll;
