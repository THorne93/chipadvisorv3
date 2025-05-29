'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu, Breadcrumb, Link } from 'antd';
import './globals.css';

const { Header, Content, Footer } = Layout;
const items = [
  {
    key: 'home',
    label: <a href="/">Home</a>,
  },
  {
    key: 'newreview',
    label: <a href="/about">New Review</a>,
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


export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ margin: 0, height: '100%' }}>
        <AntdRegistry>
          <Layout style={{ minHeight: '100vh', width: '100vw' }}>
            <Header className='!bg-yellow-500' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='text-white font-extrabold' >LOGO</div>
              <Menu
                theme='none'
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
              />
            </Header>
            <Content className='bg-blue-200'>
              <div
                className='p-4 m-4 bg-white'
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
