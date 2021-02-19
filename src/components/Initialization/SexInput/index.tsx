import React from 'react';
import { useTranslation } from 'react-i18next';
import InputRadio from '../../Input/InputRadio';

interface SexInputProps {
  value: string;
  onChangeSex: (value: string) => void;
  error?: string | undefined;
}

const SexInput: React.FC<SexInputProps> = ({ value, onChangeSex, error }) => {
  const { t } = useTranslation();
  return (
    <InputRadio
      name="sex"
      options={[
        { label: t('sex.male'), value: 'male' },
        { label: t('sex.female'), value: 'female' },
        { label: t('sex.other'), value: 'other' },
        { label: t('sex.no'), value: 'no' }
      ]}
      id=""
      value={value}
      label={t('new.sex')}
      onChange={onChangeSex}
      error={error}
    />
  );
};

export default SexInput;
