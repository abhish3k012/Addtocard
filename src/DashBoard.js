import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import Home from '.';
//import {Data} from '.';
// import {data} from '.';

const DashBoard = navigation => {
  const [count, Setcount] = useState(0);
  const [index, setIndex] = useState();
  const native = useNavigation();
  //const [added, Setadded] = useState(true);
  const [isbutton, setButton] = useState(false);
  const [Data, setData] = useState([
    {id: 1, name: 'Football', count: 0},
    {id: 2, name: 'Bat', count: 0},
    {id: 3, name: 'cat', count: 0},
    {id: 4, name: 'Ball', count: 0},
    {id: 5, name: 'Paint', count: 0},
    {id: 6, name: 'Clothes', count: 0},
  ]);
  function increasedata(id) {
    const findIndex = Data.findIndex(item => item.name === id);
    if (findIndex > -1) {
      let newItem = {...Data[findIndex], count: Data[findIndex].count + 1};
      console.log(newItem);
      setData(prev => {
        const newData = [...prev];
        newData.splice(findIndex, 1, newItem);
        return newData;
      });
    }
  }
  function decreasedata(id) {
    console.log('findIndex', findIndex);
    const findIndex = Data.findIndex(
      item => item.name === id && item.count > 0,
    );
    if (findIndex > -1) {
      console.log('if findIndex');
      let newItem = {...Data[findIndex], count: Data[findIndex].count - 1};
      console.log(newItem);
      setData(prev => {
        const newData = [...prev];
        newData.splice(findIndex, 1, newItem);
        console.log('setStore', newData.splice(findIndex, 1, newItem));
        return newData;
      });
    }
  }
  function handleadd(id) {
    const data = Data.map((item, index) => {
      if (item.name === id && item.count > 0) {
        return {...item, isbutton: true};
      }
      return item;
    });
    setData(data);
    //setButton(true);
  }
  function getdata(updateddata) {
    // const index = id;
    // const a = [...updateddata];
    // console.log('==========', a);
    // const data = [...Data];
    // console.log('----------------', data);
    // data.splice(index, 1, ...a);
    // setData(data);
    const a = Data.map(item => {
      const b = updateddata.find(updated => updated.id === item.id);
      if (b) {
        return {...item, count: b.count};
      }
      return item;
    });
    setData(a);
  }
  return (
    <SafeAreaView>
      <View style={style.scrollView}>
        <FlatList
          data={Data}
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
                <View style={style.button}>
                  <Button
                    title={item.isbutton ? 'Added' : 'Add'}
                    onPress={() => handleadd(item.name)}></Button>
                </View>
              </View>
            );
          }}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
        />
      </View>
      <View>
        <Button
          title="Submit"
          onPress={() =>
            native.navigate('Home', {data: Data, abc: getdata})
          }></Button>
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
export default DashBoard;
