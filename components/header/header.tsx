import React from 'react';
import Image from 'next/image';
import style from './header.module.scss';

const Header = () => {
    return (
        <div className={style.headerContainer}>
            <Image
                priority
                src="/images/logo.png"
                className={style.logo}
                height={35}
                width={159}
                alt={'logo'}
            />
            <Image
                priority
                src="/images/shoppingCart.png"
                className={style.shoppingCart}
                height={54}
                width={54}
                alt={'logo'}
            />
        </div>
    );
};

export default Header;
