import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
        opacity: props.disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
