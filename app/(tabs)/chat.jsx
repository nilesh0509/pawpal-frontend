import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserItem from '../../src/components/chat/UserItem';
import { getUser } from "../../src/services/authService";
import Colors from '../../constants/Colors';

export default function Inbox() {
  const [user, setUser] = useState(null); 
  const [userList, setUserList] = useState([]); 
  const [loader, setLoader] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(); 
        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    try {
      const response = await getUser()
      setUserList(response.data); 
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
    setLoader(false);
  };

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.user?.filter((u) => u?.email !== user?.email);
      if (otherUser.length) {
        const result = { docId: record._id, ...otherUser[0] };
        list.push(result);
      }
    });
    return list;
  };

  return (
    <View style={{ padding: 20, backgroundColor : Colors.BACKGROUND, flex : 1 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30, color : Colors.BOLDS, fontWeight : "bold" }}>Inbox</Text>

      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={GetUserList}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <UserItem user={item} key={index} />
        )}
      />
    </View>
  );
}
