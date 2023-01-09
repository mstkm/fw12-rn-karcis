/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, ScrollView, Text} from 'react-native';

const Month = () => {
  const months = [
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
  ];
  const [selectedBtnMonth, setSelectedBtnMonth] = React.useState(null);
  const handlePressBtnMonth = index => {
    setSelectedBtnMonth(index);
  };

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {months?.map((month, index) => {
          return (
            <Pressable
              key={String(index)}
              onPress={() => handlePressBtnMonth(index)}
              style={{
                backgroundColor:
                  selectedBtnMonth === index ? '#00005C' : 'transparent',
                borderColor: '#00005C',
                borderWidth: 1,
                width: 125,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                marginRight: 12,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: selectedBtnMonth === index ? 'white' : '#00005C',
                }}>
                {month}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Month;
