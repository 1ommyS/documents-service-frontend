import React, {ReactElement} from 'react';

type IconWithLabelProps = {
  Icon: () => ReactElement;
  value: number | string; // Adjust this type based on your use case
  styles?: string;
};

const IconWithLabel: React.FC<IconWithLabelProps> = ({ Icon, value, styles }) => (
  <span className={styles}>
    <Icon />
    {value}
  </span>
);

export default IconWithLabel;
