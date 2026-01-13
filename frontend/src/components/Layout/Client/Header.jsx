import React from 'react';
import HeaderTop
 from './common/HeaderTop';
import HeaderMain from './common/HeaderMain';
const Header = () => {
    return (
        <section className='header'>
            <HeaderTop />
            <HeaderMain />
        </section>
    );
};

export default Header;