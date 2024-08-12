import React, { useEffect, useState } from "react";
import { Checkbox, Slider, SwitchContainer } from "./styles";

type OnChangeType = (checked: boolean) => void;

// Componente de switch funcional
const Switch: React.FC<{ onChange: OnChangeType; checking?: boolean }> = ({
  onChange,
  checking = false,
}) => {
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
