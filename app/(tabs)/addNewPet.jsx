import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import NewPet from '../../src/components/newpet/newPet'

export default function addNewPet() {
  return (
    <View style = {{
            padding:20,
            marginTop:0,
            backgroundColor:Colors.BACKGROUND,
            height:'100%',
            width:'100%'
        }}>
      <NewPet />
    </View>
  )
}