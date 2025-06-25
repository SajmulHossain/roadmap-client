import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-main mb-auto'>
            <section className="section my-0 flex gap-8 md:gap-0 flex-col md:flex-row justify-between items-center text-white">
                <h3 className='font-bold text-2xl'>Roadmap App</h3>
                <p>{new Date().getFullYear()}. All Rights Reserved</p>
            </section>
        </footer>
    );
};

export default Footer;