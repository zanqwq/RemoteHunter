import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobDocument, JobForm } from '@/lib/type';
import Form from '@/components/Form';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { DocumentPickerAsset } from 'expo-document-picker';
import { postJob, uploadFile } from '@/lib/api';
import { useGlobalContext } from '@/hooks/useGlobalContext';

const defaultForm: JobForm = {
  companyName: '',
  position: '',
  employmentType: 'full-time',
  logo: null,
  about: '',
  qualifications: '',
  responsibilities: '',
  benifits: '',
  salary: '',
  contact: '',
};

export default function TabTwoScreen() {
  const [form, setForm] = useState<JobForm>(defaultForm);
  const { user } = useGlobalContext();

  const employmentTypeOptions = [
    'full-time', 'part-time', 'contractor'
  ].map((value) => ({ label: value, value }));

  return (
    <SafeAreaView className='p-5'>
      {/* <Text>{JSON.stringify(form)}</Text> */}
      <Form
        form={form}
        onFieldChange={(name, value) => {
          setForm({ ...form, [name]: value });
        }}
        onSubmit={async () => {
          if (!form.logo) return;
          try {
            const { url: logoUrl } = await uploadFile(form.logo);
            const jobDoc: JobDocument = {
              companyName: form.companyName,
              employmentType: form.employmentType,
              position: form.position,
              about: form.about,
              qualifications: form.qualifications,
              responsibilities: form.responsibilities,
              benifits: form.benifits,
              contact: form.contact,
              salary: form.salary,
              creator: user?.name,
              logoUrl,
            };
            await postJob(jobDoc);
            setForm(defaultForm);
            Alert.alert('Post successfully');
          } catch(e) {
            console.error(e.message);
          }
        }}
        config={{
          employmentType: { type: 'select', options: employmentTypeOptions },
          logo: { type: 'file', fileTypes: ['image/*'] },
          about: { type: 'textarea' },
          qualifications: { type: 'textarea' },
          responsibilities: { type: 'textarea' },
          benifits: { type: 'textarea' }
        }}
      />
    </SafeAreaView>
  );
};
