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
import {useDispatch, useSelector} from 'react-redux';
import {UpdatedCount} from '../redux/slice';

const Savedata = navigation => {
  const [adddata, setaddData] = useState('');
  const native = useNavigation();
  const {selectedData} = useSelector(state => state.update);
  const dispatch = useDispatch;

  dispatch(UpdatedCount(adddata));

  useEffect(() => {
    if (selectedData) {
      setaddData(selectedData);
    }
  }, [selectedData]);
  function increasedata(id) {
    const incresecount = adddata.map((item, index) => {
      if (item.name === id) {
        return {...item, count: item.count + 1};
      }
      return item;
    });
    setaddData(incresecount);
    //setButton(true);
  }
  function decreasedata(id) {
    const decresecount = adddata.map((item, index) => {
      if (item.name === id && item.count > 0) {
        return {...item, count: item.count - 1};
      }
      return item;
    });
    setaddData(decresecount);
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={adddata}
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
      <View>
        <Button
          title="Go to back"
          onPress={() => native.navigate('store')}></Button>
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
export default Savedata;
