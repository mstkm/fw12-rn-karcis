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
  Button,
  Select,
} from 'native-base';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [sort, setSort] = React.useState('');
  const [premiere, setPremiere] = React.useState('');
  const [location, setLocation] = React.useState('');
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
                  width="full"
                  p="8">
                  <Image
                    source={require('../images/mDashboard.png')}
                    alt="spiderman"
                    width="full"
                    height="150"
                    resizeMode="contain"
                    // borderRadius={4}
                  />
                </Box>
              </Box>
              <Stack space="5">
                <Box>
                  <Select
                    bg="#FCFDFE"
                    selectedValue={location}
                    onValueChange={value => setLocation(value)}
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
