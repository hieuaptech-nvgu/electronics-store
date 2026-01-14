import React from 'react';
import HeaderTop from './HeaderTop';
import HeaderMain from './HeaderMain';
import HeaderBottom from './HeaderBottom';
const Header = () => {
    return (
        <section className='header'>
            <HeaderTop />
            <HeaderMain />
            <HeaderBottom />
        </section>
    );
};

export default Header;