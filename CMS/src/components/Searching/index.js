import React from 'react'
import {View, Image, Text, Dimensions} from 'react-native'

export default Searching = () =>{
  const {width, height} = Dimensions.get('window')
  return(
    <View style = {{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Image source = {require('../../assets/images/searching.gif')} style = {{height: width*0.7, width: width*0.9}}/>
    </View>
  )
}