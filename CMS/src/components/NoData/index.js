import React from 'react'
import {View, Image, Text} from 'react-native'

export default NoData = ({title}) =>{
  return(
    <View style = {{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Image source = {require('../../assets/images/notfound.png')} style = {{height: 200, width: 200}}/>
      <Text style = {{marginTop: 20, fontSize: 19, fontWeight: '400', textAlign: 'center', width: '90%'}}>{title}</Text>
    </View>
  )
}