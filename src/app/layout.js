'use client';

import React, { useEffect, useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './globals.css';

const { Header, Content, Footer } = Layout;
const items = [
  {
    key: 'home',
    label: <a href="/">Home</a>,
  },
  {
    key: 'newreview',
    label: <a href="/users">New Review</a>,
  },
  {
    key: 'charts',
    label: <a href="/help">Chart</a>,
  },
  {
    key: 'map',
    label: <a href="/help">Map</a>,
  },
];

const ResponsiveHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dropdownMenu = <Menu items={items} />;

  return (
    <Header className="!bg-yellow-500 px-4" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="text-white font-extrabold text-lg mr-4">LOGO</div>

      {isMobile ? (
        <div className="ml-auto">
          <Dropdown overlay={dropdownMenu} trigger={['click']}>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />}
            />
          </Dropdown>
        </div>
      ) : (
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={items}
          style={{ flex: 1, minWidth: 0, backgroundColor: 'transparent' }}
        />
      )}
    </Header>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden min-h-screen bg-yellow-50" style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AntdRegistry>
          <Layout style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ResponsiveHeader />
            <Content className='bg-yellow-50' style={{ flex: '1 0 auto', padding: '24px 0' }}>
              <div className="App">
                <div className="sm:w-5/6 w-full pt-6 mx-auto">
                  {children}
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#f0f0f0', flexShrink: 0 }}>
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
