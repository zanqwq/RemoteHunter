import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Detail = () => {
  const { id = 0 } = useLocalSearchParams();
  const [activeSection, setActiveSection] = useState('About');
  return (
    <View className='w-full h-full bg-gray-100'>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerRight: () => (
            <View>
              {/* <Ionicons name='link-sharp' size={20} /> */}
              <AntDesign name='sharealt' size={25} />
            </View>
          ),
          headerStyle: { backgroundColor: '#f3f4f6' }
        }}
      />

      <View className='h-[200] items-center py-10'>
        <View className='w-[50] h-[50] bg-gray-200 rounded-md shadow-xl'></View>
        <Text className='text-lg font-bold mt-5'>React Native Developer</Text>
      </View>

      <View className='flex-row h-[100] w-full justify-center'>
        {['About', 'Qualifications', 'Responsibilities'].map((section) => (
          <Pressable key={section} onPress={() => setActiveSection(section)}>
            {({ pressed }) => (
              <View className={`p-5 ${section === activeSection ? 'bg-indigo-500' : 'bg-gray-50'} mr-2 rounded-xl shadow-lg`}>
                <Text className={`${section === activeSection ? 'text-white' : 'text-gray-500'}`}>{section}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View className='flex-row px-5 pb-3 absolute bottom-0 bg-gray-100 items-center gap-3 border-t-2 border-red-300 border-solid'>
        <View>
          <Pressable>
            {({ pressed }) =>
              <View className={`w-[50] h-[50] border-2 border-${pressed ? 'red' : 'gray'}-300 border-solid items-center justify-center rounded-xl`}>
                <Ionicons name='heart-outline' size={30} color={`${pressed ? '#faa' : '#ccc'}`} />
              </View>
            }
          </Pressable>
        </View>

        <View className='flex-1'>
          <Pressable>
            {({ pressed }) => (
              <View className={`w-full ${pressed ? 'bg-red-500' : 'bg-red-400'} rounded-xl p-4`}>
                <Text className='text-center text-gray-50'>Apply For Job</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
};

export default Detail;
