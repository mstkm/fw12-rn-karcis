import {
  Box,
  NativeBaseProvider,
  ScrollView,
  Text,
  Stack,
  Image,
  Button,
  Select,
} from 'native-base';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [location, setLocation] = React.useState('');
  const [movie, setMovie] = React.useState('');
  const [premiere, setPremiere] = React.useState('');

  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarAdmin />
        <Stack px="5" py="10" bg="#E5E5E5">
          <Text fontSize={18} fontWeight="bold" mb="3">
            Dashboard
          </Text>
          <Box bg="white" px="5" py="8" borderRadius={4}>
            <Box>
              <Box alignItems="center" mb="5">
                <Box
                  borderWidth={1}
                  borderColor="#A0A3BD"
                  borderRadius={4}
                  width="full"
                  p="8">
                  <Image
                    source={require('../images/mDashboard.png')}
                    alt="spiderman"
                    width="full"
                    height="150"
                    resizeMode="contain"
                  />
                </Box>
              </Box>
              <Stack space="5">
                <Box>
                  <Select
                    bg="#FCFDFE"
                    selectedValue={movie}
                    onValueChange={value => setMovie(value)}
                    minWidth="120"
                    height={10}
                    accessibilityLabel="Choose Service"
                    placeholder="Select Movie"
                    fontSize="14"
                    borderRadius="4">
                    <Select.Item label="Spiderman" value="Spiderman">
                      Spiderman
                    </Select.Item>
                  </Select>
                </Box>
                <Box>
                  <Select
                    bg="#FCFDFE"
                    selectedValue={premiere}
                    onValueChange={value => setPremiere(value)}
                    minWidth="120"
                    height={10}
                    accessibilityLabel="Choose Service"
                    placeholder="Select Premiere"
                    fontSize="14"
                    borderRadius="4">
                    <Select.Item label="ebv.id" value="ebv.id">
                      ebv.id
                    </Select.Item>
                    <Select.Item label="Hiflix" value="Hiflix">
                      Hiflix
                    </Select.Item>
                    <Select.Item label="CineOne21" value="CineOne21">
                      CineOne21
                    </Select.Item>
                  </Select>
                </Box>
                <Box>
                  <Select
                    bg="#FCFDFE"
                    selectedValue={location}
                    onValueChange={value => setLocation(value)}
                    minWidth="120"
                    height={10}
                    accessibilityLabel="Choose Service"
                    placeholder="Location"
                    fontSize="14"
                    borderRadius="4">
                    <Select.Item label="Jakarta" value="Jakarta">
                      Jakarta
                    </Select.Item>
                    <Select.Item label="Purwokerto" value="Purwokerto">
                      Purwokerto
                    </Select.Item>
                  </Select>
                </Box>
                <Stack space="2" mt="3">
                  <Button borderWidth={1} borderColor="#00005C" bg="#00005C">
                    <Text color="white">Filter</Text>
                  </Button>
                  <Button borderWidth={1} borderColor="#00005C" bg="white">
                    <Text color="#00005C">Reset</Text>
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Dashboard;
