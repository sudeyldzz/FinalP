import { View, Text, Dimensions, Platform, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';
import { fallbackPersonİmage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

var {width,height}= Dimensions.get('window');
const ios = Platform.OS== 'ios';
const verticalMargin= ios? '': 'my-3';
export default function PersonScreen() {
    const {params:  item}= useRoute();
    const navigation= useNavigation();
    const [isFavourite, toggleFavourite]=useState(false);
    const [personMovies, setPersonMovies]= useState([])
    const [person, setPerson]= useState({})
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
         setLoading(true);
       // console.log('person:', item);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
        
    },[item])

   const getPersonDetails = async id=>{
   const data= await fetchPersonDetails(id);
   console.log('got person detail: ',data);
   if(data) setPerson(data);
   setLoading(false);
 }
 const getPersonMovies = async id=>{
   const data= await fetchPersonMovies(id);
   console.log('got person MOVİES: ',data);
   if(data && data.cast) setPersonMovies(data.cast);
   
 }
  

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom:20}}>
      {/*back button*/}
      <SafeAreaView className={" z-20 w-ful flex-row justify-between items-center px-4"+ verticalMargin}> 
        <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
        </TouchableOpacity>

        <TouchableOpacity className="pl-8  ml-60" onPress={()=> toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite? 'red':"white" } />
        </TouchableOpacity>
         </SafeAreaView>

          {/*person Details*/}
          {
            loading?(
             <Loading/> 

             ):(
               <View>
               <View className="flex-row justify-center"
                   style={{
                     shadowColor:'gray',
                     shadowRadius: 40,
                     shadowOffset: {width: 0 ,height: 5},
                     shadowOpacity: 1
                   }}
               
               
               >
            
    
                  <View className="items-center rounded-full overflow-hidden h-70 w-70 border-2 border-neutral-500">
                      <Image
                       source={require('../images/Cast2.png')}
                      //source={{uri: image342(person?.profile_path)|| fallbackPersonİmage}}
                      style={{height: height*0.40, width: width*0.70}}/>
                  
                  </View>
    
               </View>
               <View className="mt-6">
                 <Text className="text-3xl text-white font-bold text-center">
                    {
                    person?.name
                    }
                 </Text>
                 <Text className="text-base text-neutral-500  text-center">
                    {
                     //person?.place_of_birth
                    }
                 </Text>
               </View>
                 <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                     <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                        <Text className="text-white font-semibold ">Gender</Text>
                        <Text className="text-neutral-300 font-sm ">
                           {
                              person?.gender==1? 'Female':'Male'
                           }
                        </Text>
                     </View>
                     <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                        <Text className="text-white font-semibold ">Birthday</Text>
                        <Text className="text-neutral-300 font-sm ">{person?.birthday}</Text>
                     </View>
                     <View className="border-r-2 border-r-neutral-400 px-1 items-center">
                        <Text className="text-white font-semibold ">Known For</Text>
                        <Text className="text-neutral-300 font-sm ">{person?.known_for_depertment}</Text>
                     </View>
                     <View className=" px-1 items-center">
                        <Text className="text-white font-semibold ">Popularity</Text>
                        <Text className="text-neutral-300 font-sm ">{person?.popularity?.toFixed(2)} %</Text>
                     </View>
                 </View>
                 <View className="my-6 mx-4 space-y-2">
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide">
                    {
                     person?.biography || 'N/A'
                    }
                    </Text>
                 </View>
                 {/*movies*/}
                 <MovieList title={'Movies'} hideSeeAll={true}  data={personMovies} />
            </View>

             )
          } 
      
    </ScrollView>
  )
}