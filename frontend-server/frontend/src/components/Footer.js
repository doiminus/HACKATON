import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-zagreb-dark-blue to-zagreb-blue text-white text-sm py-6 px-4 mt-0 border-t flex flex-col justify-between min-h-[120px]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex justify-center space-x-60">
                    <a href="#" className="hover:text-zagreb-yellow transition">About</a>
                    <a href="#" className="hover:text-zagreb-yellow transition">Contact</a>
                    <a href="#" className="hover:text-zagreb-yellow transition">Privacy Policy</a>
                </div>
            </div>
            <div className="text-center mt-4 md:mt-0">
                <br />
                © {new Date().getFullYear()} Sporterica. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
