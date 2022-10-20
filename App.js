/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  RefreshControl,
  ImageBackground,
  Pressable
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ColorfulTabBar } from 'react-navigation-tabbar-collection';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [showPicker, setShowPicker] = useState(false);
  const [placholder, setPlaceHolder] = useState('Select your city');
  const [refreshing, setRefreshing] = useState(false);
  const [flatData, setFlatData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Towson');
  const [pickComplete, setPickComplete] = useState(false);

  // [
  //   { id: 0, name: 'Charles Village Pub', address: '19 W Pennsylvania Ave, Towson, MD 21204', image: require('./assets/cvp.png') },
  //   { id: 1, name: 'The Charles Baltimore', address: '1110 S Charles St, Baltimore, MD 21230', image: require('./assets/charles.png') },
  //   { id: 2, name: 'C&R Pub', address: '19 W Pennsylvania Ave Towson, MD 21204', image: require('./assets/c_r.png') },
  //   { id: 3, name: 'The Reservoir', address: '401 York Rd, Towson, MD 21204', image: '' },
  //   { id: 4, name: 'Nacho Mamas', address: '1 W Pennsylvania Ave, Towson, MD 21204', image: '' },
  //   { id: 5, name: 'Banditos', address: '31 Allegheny Ave, Towson, MD 21204', image: '' },
  //   { id: 6, name: 'The Reservoir', address: '401 York Rd, Towson, MD 21204', image: '' },
  // ]

  const _keyExtractor = item => item.id;

  const getItemLayout = (data, index) => ({
    length: 500,
    offset: 500 * index,
    index,
  });

  const renderEmpty = () => {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16, lineHeight: 19, marginTop: 50 }}>Select your city to see the bards in your area</Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderItemContainer}>
        <ImageBackground source={item.image} resizeMode='cover' style={styles.renderItemHeader}>
        </ImageBackground>
        <View style={styles.renderItemFooter}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemAddress}>{item.address}</Text>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    const newFlatData = selectedLocation && pickComplete ? [
      { id: 0, name: 'Charles Village Pub', address: '19 W Pennsylvania Ave, Towson, MD 21204', image: require('./assets/cvp.png') },
      { id: 1, name: 'Nobles Bar & Grille', address: '1024 S Charles St, Baltimore, MD 21230', image: require('./assets/nobles.png') },
      { id: 2, name: 'Mothers Grille', address: '1113 S Charles St, Baltimore, MD 21230', image: require('./assets/mothers.png') },
      { id: 3, name: 'Watershed', address: '1065 S Charles St Suite 101, Baltimore, MD 21230', image: '' },
      { id: 4, name: '101', address: '1118 S Charles St #101, Baltimore, MD 21230', image: '' },
      { id: 5, name: 'Wayward', address: '1117 S Chalres St, Baltimore, MD 21230', image: '' },
    ] : []
    setFlatData(newFlatData);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const onPressSelectOption = () => {
    setShowPicker(!showPicker);
  }

  const onPickComplete = () => {
    setPickComplete(true);
    setShowPicker(false);
    setPlaceHolder(selectedLocation);
    const newFlatData = [
      { id: 0, name: 'Charles Village Pub', address: '19 W Pennsylvania Ave, Towson, MD 21204', image: require('./assets/cvp.png') },
      { id: 1, name: 'The Charles Baltimore', address: '1110 S Charles St, Baltimore, MD 21230', image: require('./assets/charles.png') },
      { id: 2, name: 'C&R Pub', address: '19 W Pennsylvania Ave Towson, MD 21204', image: require('./assets/c_r.png') },
      { id: 3, name: 'The Reservoir', address: '401 York Rd, Towson, MD 21204', image: '' },
      { id: 4, name: 'Nacho Mamas', address: '1 W Pennsylvania Ave, Towson, MD 21204', image: '' },
      { id: 5, name: 'Banditos', address: '31 Allegheny Ave, Towson, MD 21204', image: '' },
      { id: 6, name: 'The Reservoir', address: '401 York Rd, Towson, MD 21204', image: '' },
    ];
    setFlatData(newFlatData);
  }

  const DemoScreen = ({ route }) => (
    <View style={styles.screen}>
      <View style={styles.statusBar} />
      <View style={styles.topbar}>
        <Text style={styles.routeText}>{route.name}</Text>
      </View>
      <View style={styles.selectBar}>
        <Text style={[styles.selectText, { color: placholder !== 'Select your city' ? '#EBEBF5' : 'rgba(235, 235, 245, 0.6)' }]}>{placholder}</Text>
        <Pressable onPress={onPressSelectOption}>
          <Icon name='down' size={24} color={'rgba(235, 235, 245, 0.6)'} />
        </Pressable>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        getItemLayout={getItemLayout}
        keyExtractor={_keyExtractor}
        data={flatData}
        // extraData={props}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </View>
  );

  const PickerComponent = () => (
    <View>
      <View style={styles.pickerHeader}>
        <Pressable onPress={onPickComplete}>
          <Text style={{ color: '#7BA0FF', padding: 8 }}>Done</Text>
        </Pressable>
      </View>
      <Picker
        style={{ backgroundColor: 'black' }}
        itemStyle={{ color: 'white' }}
        selectedValue={selectedLocation}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLocation(itemValue)
        }>
        <Picker.Item label="Fed Hill" value="Fed Hill" />
        <Picker.Item label="College Park" value="College Park" />
        <Picker.Item label="Newport News" value="Newport News" />
        <Picker.Item label="Towson" value="Towson" />
        <Picker.Item label="Winona" value="Winona" />
      </Picker>
    </View>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
        tabBar={(props) =>
          !showPicker ?
            <ColorfulTabBar {...props} darkMode={true} />
            :
            PickerComponent()
        }
      >
        <Tab.Screen
          name='News'
          component={DemoScreen}
          options={{
            title: '',
            icon: ({ focused, color, size }) => <Ionicon name='people-outline' size={size} color={color} />,
            color: '#133FAF',
          }}
        />
        <Tab.Screen
          name='Chat'
          component={DemoScreen}
          options={{
            title: '',
            icon: ({ focused, color, size }) => <MaterialCommunityIcon name='triangle-wave' size={size} color={color} />,
            color: '#133FAF',
          }}
        />
        <Tab.Screen
          name='Home'
          component={DemoScreen}
          options={{
            title: '',
            icon: ({ focused, color, size }) => <Icon name='home' size={size} color={color} />,
            color: '#133FAF',
          }}
        />
        <Tab.Screen
          name='Likes'
          component={DemoScreen}
          options={{
            title: '',
            icon: ({ focused, color, size }) => <Icon name='infocirlceo' size={size} color={color} />,
            color: '#133FAF',
          }}
        />
        <Tab.Screen
          name='Settings'
          component={DemoScreen}
          options={{
            title: '',
            icon: ({ focused, color, size }) => <Icon name='setting' size={size} color={color} />,
            color: '#133FAF',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#222222'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  screen: {
    width: '100%',
    flex: 1,
    backgroundColor: '#222222'
  },
  statusBar: {
    backgroundColor: '#222222',
    height: 50
  },
  topbar: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row',
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  routeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 28
  },
  selectBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 10,
    height: 36,
    backgroundColor: 'rgba(118, 118, 128, 0.24)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectText: {
    fontWeight: '400',
    fontSize: 17,
    color: 'rgba(235, 235, 245, 0.6)',
  },

  renderItemContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 16,
    height: 200,
    borderRadius: 20,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  renderItemHeader: {
    width: '100%',
    height: 132,
  },
  renderItemFooter: {
    height: 63,
    padding: 16,
  },
  itemName: {
    fontWeight: '700',
    fontSize: 20,
  },
  pickerHeader: {
    height: 40,
    backgroundColor: 'black',
    alignItems: 'flex-end'
  },
});

export default App;
