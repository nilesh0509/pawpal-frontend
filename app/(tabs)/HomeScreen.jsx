import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Header from '@/src/components/Home/Header'
import Slider from '@/src/components/Home/Slider'
import Category from '@/src/components/Home/Category'
import PetListByCategory from '../../src/components/Home/PetListByCategory'


export default function HomeScreen() {
  return (
    <View style = {{
        padding:20,
        marginTop:0,
        backgroundColor:Colors.BACKGROUND,
        height:'100%',
        width:'100%'
    }}>

      <Header />
      <Slider />
      <PetListByCategory />
      
    </View>
  )
}