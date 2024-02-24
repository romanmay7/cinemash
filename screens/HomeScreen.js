import React, {useEffect, useState, useRef} from "react";
import { StyleSheet, Text, View , Alert} from 'react-native';
import Swiper from 'react-native-deck-swiper'
import Constants from 'expo-constants'
import colors from "../constants/colors";
import TopBar from '../components/TopBar'
import Card from "../components/Card";
import OverlayLabel from "../components/OverlayLabel";
import IconButton from "../components/IconButton";
import axios from 'axios';



export  function HomeScreen() {

  const useSwiper = useRef(null);
  const handleOnSwipedLeft = () => useSwiper.current.swipeLeft()
  const handleOnSwipedRight = () => useSwiper.current.swipeRight()
  const [resultsPageIndex, setResultsPageIndex] = useState(0);
  const [movies, setMovies] = useState([]);
 // const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_URL ='https://api.themoviedb.org/3/';

    async function fetchMovies({genre}) {
    try {

    console.log('tried fetching movies')
    const {data} = await axios.get(`${API_URL}trending/movie/week?api_key=${process.env.MOVIE_API_KEY}`);

   // const filesystem = require('fs');

    // Use array buffer! 

  /*  axios.get(`${API_URL}trending/movie/week?api_key=${MOVIE_API_KEY}`,{ responseType:"arraybuffer"})
    .then(response =>
     {
        // console.log(response.data);
        RNFS.writeFile('moviesData.json', response.data, function (err)
         {
            console.log(err);
         });
     }).catch(err => 
     {
        console.log(err)
     });

      //const data = require('./fakeData.json')
      data = response.data;
      */

      setMovies(movies.concat(data.results))
      console.log('success')
    } catch (error){
      console.log(error, "failed to fetch movies")
      Alert.alert('Error fetching Movies', '', [{text: 'Retry', onPress: ()=>{fetchMovies()}}])
    }
  }

  useEffect(()=>{
    fetchMovies('')
  }, [resultsPageIndex])

  function nextMovie() {
    if (currentIndex === movies.length - 3) {
      // if nearing end fetch more movies, 
      setResultsPageIndex(resultsPageIndex + 1)
    } 
  }

return (
    <View style={styles.container}>
      <TopBar />
      {movies.length > 0 &&
        <Swiper
          ref={useSwiper}
          animateCardOpacity={true}
          containerStyle={styles.swiperContainer}
          cards={movies}
          renderCard={(card, index) => <Card movie={movies[index]} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          infinite={true}
          verticalSwipe={false}
          showSecondCard={true}
          animateOverlayLabelsOpacity={true}
          onSwiped={(index)=>{nextMovie()}}
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <OverlayLabel label="NAH" color={colors.pass} />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'LIKE',
              element: <OverlayLabel label="YEAH" color={colors.like} />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
      />}
      <View style={styles.buttonsContainer}>
        <IconButton
          name="eye-off"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor={colors.pass}
          />
        <IconButton
          name="eye"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor={colors.like}
          />
      </View>
  </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
  },
  swiperContainer: {
    marginTop:'8%',
    height: "90%",
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '15%',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black',
    paddingBottom: 20,
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
});
