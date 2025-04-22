import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from './../../../constants/Colors'
import { Link } from 'expo-router'
export default function UserItem({user}) {
  return (
    <Link href={'/chat?id='+user._id}>
    <View style={{
        marginVertical:7,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    }}>
        <Image source={{uri:user?.imageUrl}} 
        style={{
            width:40,
            height:40,
            borderRadius:99
        }} />
        <Text style={{
            fontFamily:'outfit',
            fontSize:20
        }}>{user?.name}</Text>
        
    </View>
    <View style={{borderWidth:0.2,marginVertical:7,borderColor:Colors.GRAY}}>

        </View>
    </Link>
  )
}