import React from 'react'

interface ButtonProps {
  btnName: string;
}

const Button: React.FC<ButtonProps> = ({ btnName }) => {
  return (
    <div>
      {btnName}
    </div>
  )
}

export default Button
