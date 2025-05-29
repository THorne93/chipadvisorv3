'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { XOutlined, InstagramOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <div className="w-5/6 mt-6 mx-auto">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="w-3/4 flex items-center gap-4 mb-4 mx-auto sm:mb-0">
            <div className='w-1/6 flex '>
              <img className="h-36 w-36 mx-auto rounded-full"
                src="/assets/img/chiplogo.jpg" />
            </div>
            <div className="w-5/6 flex flex-col text-gray-700 text-base sm:text-lg leading-relaxed">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Welcome to Chip Advisor
              </h1>
              <p>
                ChipAdvisor is a place where aficionados of potatoes can get together to find - or create - the perfect chip.
              </p>
              <div>
                <Button type="text" className="text-gray-600 h-8 w-8 mr-4 hover:text-black transition-colors duration-200">
                  <XOutlined style={{ fontSize: '32px' }} />
                </Button>
                <Button type="text" className="text-gray-600 h-8 w-8 mr-4 hover:text-black transition-colors duration-200">
                  <InstagramOutlined style={{ fontSize: '32px' }} />
                </Button>
                <Button type="text" className="text-gray-600 h-8 w-8 mr-4 hover:text-black transition-colors duration-200">
                  <FacebookOutlined style={{ fontSize: '32px' }} />
                </Button>
                <Button type="text" className="text-gray-600 h-8 w-8 mr-4 hover:text-black transition-colors duration-200">
                  <MailOutlined style={{ fontSize: '32px' }} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className='mx-auto w-3/4'>
          <div className="flex flex-row justify-between gap-4 text-gray-800 font-medium text-center">
            {['Restaurants', 'Recipes', 'Ratings', 'Reviews', 'Lists'].map((label) => (
              <div key={label} className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
                <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
                <p className="text-sm sm:text-base text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 👇 User list section */}
        <div className="mt-10 mx-auto w-3/4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Users</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {users.length === 0 ? (
              <li>No users found.</li>
            ) : (
              users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email})
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
