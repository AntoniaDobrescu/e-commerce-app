import React from 'react';
import Image from 'next/image';
import style from './header.module.scss';

const Header = () => {
    return (
        <div className={style.headerContainer}>
            <div className={style.logoContainer}>
                <Image
                    priority
                    src="/images/logo.png"
                    className={style.logo}
                    alt={'logo'}
                    layout={'fill'}
                />
            </div>
            <div className={style.shoppingCartContainer}>
                <Image
                    priority
                    src="/images/shoppingCart.png"
                    className={style.shoppingCart}
                    alt={'logo'}
                    layout={'fill'}
                />
            </div>
        </div>
    );
};

export default Header;
