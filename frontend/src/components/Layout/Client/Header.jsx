import React from 'react';
import HeaderTop
 from './common/HeaderTop';
import HeaderMain from './common/HeaderMain';
import HeaderBottom from './common/HeaderBottom';
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