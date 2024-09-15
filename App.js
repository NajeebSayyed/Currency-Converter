import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import countriesData from './src/CountriesData';
const CurrencyConverter = () => {
  const [input1, setInput1] = useState(''); // INR input
  const [input2, setInput2] = useState(''); // USD input
  const [input3, setInput3] = useState(''); //EUR input
  // Selected Currency Name
  const [currencyOne, setCurrencyOne] = useState('INR');
  const [currencyTwo, setCurrencyTwo] = useState('USD');
  const [currencyThree, setCurrencyThree] = useState('EUR');

  const [isClicked1, setIsClicked1] = useState(false); //To open and close the Dropdown 1
  const [isClicked2, setIsClicked2] = useState(false); //To open and close the Dropdown 2
  const [isClicked3, setIsClicked3] = useState(false); //To open and close the Dropdown 3

  const [activeInput, setActiveInput] = useState('input1'); // Track active input
  const [darkMode, setDarkMode] = useState(false); // Track Dark Mode
  const [conversionRate, setConversionRate] = useState(1); // Conversion rate INR to USD
  const [conversionRate2, setConversionRate2] = useState(1); //Conversion rate INR to EUR
  const [conversionRate3, setConversionRate3] = useState(1); //Conversion rate USD to EUR

  // Fetch conversion rate from API when component mounts
  useEffect(() => {
    // Conversion Rate INR to USD
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/8cafd6e71da1400001926918/pair/${currencyOne}/${currencyTwo}`,
        );
        const data = await response.json();
        setConversionRate(data.conversion_rate); // Set the conversion rate
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };
    // Conversion Rate INR to EUR
    const fetchConversionRate2 = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/8cafd6e71da1400001926918/pair/${currencyOne}/${currencyThree}`,
        );
        const data = await response.json();
        setConversionRate2(data.conversion_rate); // Set the conversion rate
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };
    // Conversion rate USD to EUR
    const fetchConversionRate3 = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/8cafd6e71da1400001926918/pair/${currencyTwo}/${currencyThree}`,
        );
        const data = await response.json();
        setConversionRate3(data.conversion_rate); // Set the conversion rate
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };

    fetchConversionRate();
    fetchConversionRate2();
    fetchConversionRate3();
  }, [currencyOne, currencyTwo, currencyThree]);
  // Function to handle input
  const handleKeyPress = num => {
    if (activeInput === 'input1') {
      const newInput1 = input1 + num;
      setInput1(newInput1);
      setInput2((parseFloat(newInput1) * conversionRate).toFixed(2).toString()); // Convert INR to USD
      setInput3(
        (parseFloat(newInput1) * conversionRate2).toFixed(2).toString(),
      ); // Convert INR to EUR
    } else if (activeInput === 'input2') {
      const newInput2 = input2 + num;
      setInput2(newInput2);
      setInput1((parseFloat(newInput2) / conversionRate).toFixed(2).toString()); // Convert USD to INR
      setInput3(
        (parseFloat(newInput2) * conversionRate3).toFixed(2).toString(),
      ); // Convert USD to EUR
    } else {
      const newInput3 = input3 + num;
      setInput3(newInput3);
      setInput1(
        (parseFloat(newInput3) / conversionRate2).toFixed(2).toString(),
      ); // Convert EUR to INR
      setInput2(
        (parseFloat(newInput3) / conversionRate3).toFixed(2).toString(),
      ); // Convert EUR to USD
    }
  };

  // Function to handle clearing the input
  const handleClear = () => {
    if (activeInput === 'input1') {
      setInput1('');
      setInput2('');
      setInput3('');
    } else if (activeInput === 'input2') {
      setInput2('');
      setInput1('');
      setInput3('');
    } else {
      setInput2('');
      setInput1('');
      setInput3('');
    }
  };

  // Function to handle backspace (remove last character)
  const handleBackspace = () => {
    if (activeInput === 'input1') {
      const updatedInput1 = input1.slice(0, -1);
      setInput1(updatedInput1);
      setInput2(
        (parseFloat(updatedInput1) * conversionRate).toFixed(2).toString(),
      ); // Update input2 to be double of input1
    } else {
      const updatedInput2 = input2.slice(0, -1);
      setInput2(updatedInput2);
      setInput1(
        (parseFloat(updatedInput2) / conversionRate).toFixed(2).toString(),
      ); // Update input1 to be half of input2
    }
  };

  return (
    <View style={styles.container}>
      {/* Section one 55% */}
      <StatusBar
        barStyle="light-content" // Text color in status bar
        backgroundColor="black" // Status bar background color
        hidden={false} // Keep status bar visible
      />

      <View
        style={{height: '53%', justifyContent: 'center', alignItems: 'center'}}>
        {/* TextInput 1 */}

        <View style={styles.currencySection}>
          <TouchableOpacity
            style={styles.currencyName}
            onPress={() => setIsClicked1(!isClicked1)}>
            <Text style={styles.currencyCode}>{currencyOne}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveInput('input1')}
            style={styles.inputContainer}
            activeOpacity={1} // Set the opacity when pressed
          >
            <TextInput
              style={[
                styles.input,
                activeInput === 'input1' && styles.activeInput,
              ]}
              value={input1}
              editable={activeInput === 'input1'}
              showSoftInputOnFocus={false}
            />
          </TouchableOpacity>
        </View>
        {/* Dropdown for Countries List 1 */}

        {/* TextInput 2 */}
        <View style={styles.currencySection}>
          <TouchableOpacity
            style={styles.currencyName}
            onPress={() => setIsClicked2(!isClicked2)}>
            <Text style={styles.currencyCode}>{currencyTwo}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveInput('input2')}
            style={styles.inputContainer}
            activeOpacity={1} // Set the opacity when pressed
          >
            <TextInput
              style={[
                styles.input,
                activeInput === 'input2' && styles.activeInput,
              ]}
              value={input2}
              editable={activeInput === 'input2'}
              showSoftInputOnFocus={false} // Prevent default keyboard from appearing
              // placeholder="Enter number in Input 2"
            />
          </TouchableOpacity>
        </View>

        {/* TextInput 3 */}
        <View style={styles.currencySection}>
          <TouchableOpacity
            style={styles.currencyName}
            onPress={() => setIsClicked3(!isClicked3)}>
            <Text style={styles.currencyCode}>{currencyThree}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveInput('input3')}
            style={styles.inputContainer}
            activeOpacity={1} // Set the opacity when pressed
          >
            <TextInput
              style={[
                styles.input,
                activeInput === 'input3' && styles.activeInput,
              ]}
              value={input3}
              editable={activeInput === 'input3'}
              showSoftInputOnFocus={false} // Prevent default keyboard from appearing
              // placeholder="Enter number in Input 2"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Section two 45% */}
      {/* Custom Numeric Pad */}
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleKeyPress(num.toString())}
            activeOpacity={0.5} // Set the opacity when pressed
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}

        {/* Special keys: Clear, 0, Backspace */}
        <TouchableOpacity
          style={styles.key}
          onPress={handleClear}
          activeOpacity={0.5} // Set the opacity when pressed
        >
          <Text style={styles.specialKey}>C</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.key}
          onPress={() => handleKeyPress('0')}
          activeOpacity={0.5} // Set the opacity when pressed
        >
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.key}
          onPress={handleBackspace}
          activeOpacity={0.5} // Set the opacity when pressed
        >
          <Text style={styles.specialKey}>⌫</Text>
        </TouchableOpacity>
      </View>
      {/* Dropdown for Countries List 1 */}
      {isClicked1 ? (
        <View style={styles.listContainer1}>
          <FlatList
            data={countriesData}
            keyExtractor={item => item.country}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.countryItemContainer}
                activeOpacity={0.7}
                onPress={() => {
                  setIsClicked1(false);
                  setCurrencyOne(item.currency);
                  // handleKeyPress(input2);
                }}>
                <Text style={styles.countryItem}>{item.currencyName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
      {/* Dropdown for Countries List 2 */}
      {isClicked2 ? (
        <View style={styles.listContainer2}>
          <FlatList
            data={countriesData}
            keyExtractor={item => item.country}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.countryItemContainer}
                activeOpacity={0.7}
                onPress={() => {
                  setIsClicked2(false);
                  setCurrencyTwo(item.currency);
                }}>
                <Text style={styles.countryItem}>{item.currencyName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
      {/* Dropdown for Countries List 3 */}
      {isClicked3 ? (
        <View style={styles.listContainer3}>
          <FlatList
            data={countriesData}
            keyExtractor={item => item.country}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.countryItemContainer}
                activeOpacity={0.7}
                onPress={() => {
                  setIsClicked3(false);
                  setCurrencyThree(item.currency);
                }}>
                <Text style={styles.countryItem}>{item.currencyName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

// Styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  currencySection: {
    width: '100%',
    flexDirection: 'row',
  },
  currencyName: {
    width: '35%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'serif',
    fontWeight: '900',
  },
  inputContainer: {
    width: '65%',
    marginBottom: 20,

    // backgroundColor: 'black',
  },
  input: {
    height: 70,
    paddingHorizontal: 10,
    textAlign: 'right',
    fontSize: 40,
    color: 'white',
    fontWeight: '700',
    fontFamily: 'monospace',
    fontWeight: '900',
  },
  activeInput: {
    color: '#ff8c00',
    fontWeight: 'bold',
  },
  listContainer1: {
    position: 'absolute',
    top: 70, // Adjust as needed

    width: '80%',
    backgroundColor: 'black',
    borderRadius: 25,
    height: '47.5%',
    borderWidth: 2,
    borderColor: '#ff8c00',
    left: 20,
  },
  listContainer2: {
    position: 'absolute',
    top: 160, // Adjust as needed
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 25,
    height: '47.5%',
    borderWidth: 2,
    borderColor: '#ff8c00',
    left: 20,
  },
  listContainer3: {
    position: 'absolute',
    top: 248, // Adjust as needed
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 25,
    height: '47.5%',
    borderWidth: 2,
    borderColor: '#ff8c00',
    left: 20,
  },
  countryItemContainer: {},
  countryItem: {
    padding: 10,
    fontSize: 22,
    color: 'white',
  },
  currencyCode: {
    color: 'white',
    fontSize: 40,
    fontWeight: '800',
  },
  keypad: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '43%',
    justifyContent: 'center',
    backgroundColor: '#ff8c00',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  key: {
    width: '33.33%',
    height: 70,
    marginTop: 6,
    // marginRight: ,
    // backgroundColor: '#4a4949',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
  },
  keyText: {
    fontSize: 45,
    color: 'white',
    fontWeight: '500',
  },
  specialKey: {
    fontSize: 45,
    color: 'black',
    fontWeight: '700',
  },
});

export default CurrencyConverter;
