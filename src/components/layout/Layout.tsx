import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">{children}</main>
      {/* <main className="flex-grow pt-16 px-[100px]">{children}</main> */}
      <Footer />
    </div>
  );
};

export default Layout;
