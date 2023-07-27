import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UpdateData} from '../redux/slice';
import {useDispatch, useSelector} from 'react-redux';

const Store = navigation => {
  const native = useNavigation();
  //const [added, Setadded] = useState(true);
  const [isbutton, setButton] = useState(false);
  const [isselected, Setselected] = useState();
  const [Data, setData] = useState([
    {id: 1, name: 'Football', count: 0},
    {id: 2, name: 'Bat', count: 0},
    {id: 3, name: 'cat', count: 0},
    {id: 4, name: 'Ball', count: 0},
    {id: 5, name: 'Paint', count: 0},
    {id: 6, name: 'Clothes', count: 0},
  ]);
  const dispatch = useDispatch();

  dispatch(UpdateData(isselected));
  const {updatecount} = useSelector(state => state.update);
  useEffect(() => {
    if (updatecount) {
      setData(updatecount);
    }
  }, [updatecount]);

  function increasedata(id) {
    const incresecount = Data.map((item, index) => {
      if (item.name === id) {
        return {...item, count: item.count + 1};
      }
      return item;
    });
    setData(incresecount);
    //setButton(true);
  }
  function decreasedata(id) {
    const decresecount = Data.map((item, index) => {
      if (item.name === id && item.count > 0) {
        return {...item, count: item.count - 1};
      }
      return item;
    });
    setData(decresecount);
  }
  function handleadd(id) {
    const addbutton = Data.map((item, index) => {
      if (item.name === id && item.count > 0) {
        return {...item, isbutton: true};
      }
      return item;
    });
    setData(addbutton);
    const SelectedData = Data.filter(item => item.count > 0);
    Setselected(SelectedData);
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
          onPress={() => native.navigate('savedata')}></Button>
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
export default Store;
// ssh~add ~/.ssh/id_testProject