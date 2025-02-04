import React from 'react';
import { Stack } from 'expo-router';
import {AuthContextProvider} from '../context/AuthContext';
import {AdminAuthContextProvider} from '../context/AdminAuthContext';
export default function RootLayout() {
 
  return (
    <AuthContextProvider>
      <AdminAuthContextProvider>
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="admindesktop" options={{ headerShown: false }} />
        <Stack.Screen name="peondesktop" options={{ headerShown: false }} />
      </Stack>
      </AdminAuthContextProvider>
      </AuthContextProvider>
   
  );
}