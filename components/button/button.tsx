import React from 'react';

interface ButtonProps {
    readonly buttonText: string;
    readonly className: string;
}

//check className - try to add css in the button file

const Button = (props: ButtonProps) => {
    const {
        buttonText,
        className,
    } = props;

    return (
        <button className={className}>{buttonText}</button>
    );
};

export default Button;
