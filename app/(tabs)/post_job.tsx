import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const [form, setForm] = useState<Job>({
    companyName: '',
    position: '',
    employmenType: 'full-time',
    primaryTags: [],
    logoUrl: '',
    jobDescription: '',
    about: '',
    qualification: '',
    responsibilities: '',
    benifits: '',
    contact: '',
  });

  return (
    <SafeAreaView className='p-5'>
      <Text className='text-xl'>Company name</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
