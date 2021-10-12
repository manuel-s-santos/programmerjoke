import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import JokeAPI from '../controller/JokeAPI';
import {Joke} from '../model/Joke';

const jokeAPI = new JokeAPI();

type CustomButtonProps = {
  text: string;
  onPress: () => void;
};

const CustomButton = ({text, onPress}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [joke, setJoke] = React.useState<Joke>();

  const getJoke = async () => {
    const value = await jokeAPI.getJoke();
    setJoke(value);
  };

  React.useEffect(() => {
    getJoke();
  }, [index]);

  const increment = () => {
    setIndex(index >= 10 ? 0 : index + 1);
  };

  const DisplayJoke = () => {
    if (joke === undefined) {
      return <></>;
    } else if (joke.type === 'single') {
      return (
        <View>
          <Text style={styles.textJoke}>{joke.joke}</Text>
        </View>
      );
    } else if (joke.type === 'twopart') {
      return (
        <View>
          <Text style={styles.textJoke}>{joke.setup}</Text>
          <Text style={[styles.textJoke, styles.textJoke2]}>
            {joke.delivery}
          </Text>
        </View>
      );
    }
    return <></>;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <ImageBackground
        style={styles.container}
        source={require('../../images/background.jpeg')}
        resizeMode="cover">
        <View style={styles.viewTop}>
          <DisplayJoke />
        </View>

        <View style={styles.viewMiddle} />

        <View style={styles.viewBottom}>
          <Text style={styles.textIncrement}>{index}</Text>
          <CustomButton text="Increment" onPress={increment} />
        </View>

        {/* <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 100,
            width: '100%',
            left: 0,
          }}>
          <Text style={{color: 'white', fontSize: 9, margin: 20}}>
            {JSON.stringify(joke)}
          </Text>
        </View> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTop: {
    flex: 1.3,
    marginHorizontal: 20,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMiddle: {
    flex: 0.7,
  },
  textJoke: {
    color: 'white',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textJoke2: {
    marginTop: 20,
    fontStyle: 'italic',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#FF5E0E',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textIncrement: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  viewBottom: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
