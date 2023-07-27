import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = props => {
  const {navigation, route} = props || {};
  const {params} = route || {};
  const data = params.data;
  const getdata = params.abc;
  console.log('data', data);
  const filterdata = data.filter(item => item.count > 0);
  const [isStore, setStore] = useState(
    filterdata?.length > 0 ? filterdata : data,
  );

  getdata(isStore);

  function increasedata(id) {
    const findIndex = isStore.findIndex(item => item.name === id);

    if (findIndex > -1) {
      let newItem = {
        ...isStore[findIndex],
        count: isStore[findIndex].count + 1,
      };

      // getdata(id, newItem.count);
      setStore(prev => {
        const newData = [...prev];
        newData.splice(findIndex, 1, newItem);
        return newData;
      });
    }
  }

  // getdata(id, data.find(item => item.id).count);
  function decreasedata(id) {
    const findIndex = isStore.findIndex(
      item => item.name === id && item.count > 0,
    );

    if (findIndex > -1) {
      let newItem = {
        ...isStore[findIndex],
        count: isStore[findIndex].count - 1,
      };

      //getdata(id, newItem.count);
      setStore(prev => {
        const newData = [...prev];
        newData.splice(findIndex, 1, newItem);
        return newData;
      });
    }
  }

  // function setdata(id) {
  //   getdata(id, isStore);
  // }
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={isStore}
          keyExtractor={(item, index) => item.id}
          // style={{backgroundColor:"blue"}}
          renderItem={({item}) => {
            console.log('flatlist====>data==>', item);
            return (
              <View style={style.box}>
                <Text style={style.text1}>{item.name}</Text>
                <Text style={style.text1}>Count={item.count}</Text>
                <TouchableOpacity onPress={() => increasedata(item.name)}>
                  <Text>Increase</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => decreasedata(item.name)}>
                  <Text>Decrease</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
  },
  box: {
    marginBottom: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
  },
  text1: {
    fontSize: 20,
    textAlign: 'left',
  },
  text2: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '700',
  },
  button: {
    textAlign: 'left',
  },
});
export default Home;
