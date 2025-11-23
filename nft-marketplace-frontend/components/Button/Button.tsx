"use client";

import React from 'react'

// INTERNAL IMPORT
import Style from './Button.module.css';

interface ButtonProps {
    btnName: string;
    handleClick?: any;
    icon?: any;
    classStyle?: any;
}

const Button: React.FC<ButtonProps> = ({ btnName, handleClick, icon, classStyle }) => {
    return (
        <div className={Style.box}>
            <button
                className={`${Style.button} ${classStyle}`}
                onClick={() => handleClick()}
            >
                {icon} {btnName}
            </button>
        </div>
    )
}

export default Button
