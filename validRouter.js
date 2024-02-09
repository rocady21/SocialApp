import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginRouter from './routes/LoginRouter';
import AppRouter from './routes/AppRouter';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStorage } from './utils/AsyncStorage';
import { useUserSlice } from './hooks/useUserSlice';

export default  function ValidRouter({}) {
  
  const {userStatus} = useUserSlice()  

  return (
    <>
    {userStatus === "no-user"? <LoginRouter/> : <AppRouter/>}
    </>
      );
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});