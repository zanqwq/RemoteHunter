import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

type FormProps = {
  form: Record<string, any>;
  onFieldChange: (name: string, value: any) => void;
  config?: Record<string, {
    required?: boolean;
    type?: 'text' | 'textarea' | 'select' | 'file';
    options?: { label: string; value: any; }[]
    fileTypes?: string[];
    title?: string;
  }>
};

const Form = (props: FormProps) => {
  console.log('@@@', props.config['employmentType']);
  return (
    <ScrollView>
      {Object.entries(props.form).map(([name, value]) =>
        <View className='gap-2 mb-5' key={name}>
          {(() => {
            const {
              required = false, type = 'text', fileTypes = [],
              title = name, options = []
            } = props.config?.[name] || {};
            let input: any;
            if (type === 'file') {
            } else if (type === 'select') {
              input = (
                <Picker selectedValue={value} onValueChange={value => props.onFieldChange(name, value)}>
                  {options.map(({ label, value }, i) =>
                    <Picker.Item key={i} label={label} value={value} />)
                  }
                </Picker>
              )
            } else {
              input = (
                <View className={`w-full ${type === 'textarea' ? 'h-[100]' : 'h-[50]'} p-2 bg-gray-200 rounded-md shadow-md`}>
                  <TextInput
                    value={value}
                    multiline={type === 'textarea'}
                    numberOfLines={type === 'textarea' ? 10 : undefined}
                    textAlignVertical={type === 'textarea' ? 'top' : undefined}
                    onChangeText={value => props.onFieldChange(name, value)}
                  />
                </View>
              );
            }
            return <>
              <Text>
                {`${title[0].toUpperCase()}${title.slice(1)}`}
                {required && <Text className='text-red-400'>*</Text>}
              </Text>
              {input}
            </>
          })()}
        </View>
      )}
    </ScrollView>
  )
}

export default Form