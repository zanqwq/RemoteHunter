import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import logo from '../../assets/images/logo.png';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCurrentUser, signIn } from '@/lib/api';
import { SignInForm } from '@/lib/type';
import { useGlobalContext } from '@/hooks/useGlobalContext';

const sign_in = () => {
  const [form, setForm] = useState<SignInForm>({ email: '', pwd: '' });
  const { user, setUser } = useGlobalContext();

  return (
    <SafeAreaView>
      <View className='items-center'>
        <Image className='w-[200] h-[200]' source={logo} resizeMode={'contain'} />
      </View>

      <View className='p-5 items-start'>
        <Text>Email</Text>
        <View className='w-full h-[50] bg-gray-200 rounded-lg mb-2 px-2 justify-center shadow-lg'>
          <TextInput value={form.email} onChangeText={(email) => setForm({ ...form, email })} />
        </View>

        <Text>Password</Text>
        <View className='w-full h-[50] bg-gray-200 rounded-lg mb-2 px-2 justify-center shadow-lg'>
          <TextInput value={form.pwd} onChangeText={(pwd) => setForm({ ...form, pwd })} secureTextEntry />
        </View>

        <Pressable className='w-full' onPress={async () => {
          if (!form.email || !form.pwd) {
            Alert.alert('Please enter email and password');
            return;
          }
          try {
            await signIn(form);
            const currentUser = await fetchCurrentUser();
            setUser(currentUser);
          } catch (e) {
            Alert.alert(e.message);
            return;
          }
          router.push('/seek_job');
        }}>
          {({ pressed }) => (
            <View className={`w-full h-[50] p-2 rounded-xl shadow-lg items-center justify-center ${pressed ? 'bg-purple-600' : 'bg-purple-400'}`}>
              <Text>Sign In</Text>
            </View>
          )}
        </Pressable>

        <View className='flex-row gap-1 mt-4'>
          <Text>Don't have account ?</Text>
          <Link className='text-blue-400' href={'/sign_up'}>Sign Up</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default sign_in