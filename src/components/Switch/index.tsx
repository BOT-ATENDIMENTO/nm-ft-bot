import React, { useState, useEffect } from 'react';
import { SwitchContainer, Checkbox, Slider } from './styles';

type OnChangeType = (checked: boolean) => void;

// Componente de switch funcional
const Switch: React.FC<{ onChange: OnChangeType, checking?: boolean }> = ({ onChange, checking = false }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };
  useEffect(() => {
    if (checking !== undefined) {
      setChecked(checking);
    }
  }, [checking]);

  return (
    <SwitchContainer>
      <Checkbox checked={checked} onChange={handleChange} />
      <Slider />
    </SwitchContainer>
  );
};

export default Switch;
