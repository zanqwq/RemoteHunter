import { View, Text, TextInput } from 'react-native'
import React from 'react'

type FormProps = {
  form: Record<string, any>;
  onFieldChange: (name: string, value: any) => void;
};

const Form = (props: FormProps) => {
  return (
    <View>
      {Object.entries(props.form).map(([name, value]) =>
        <View>
          <Text>{name}</Text>
          <TextInput
            value={value}
            onChangeText={value => props.onFieldChange(name, value)}
          />
        </View>
      )}
    </View>
  )
}

export default Form