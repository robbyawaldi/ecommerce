import React from 'react'
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';

interface layoutProps { }

export const Layouts: React.FC<layoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="md:px-24 px-4 overflow-x-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
}