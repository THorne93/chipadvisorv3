'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { XOutlined, InstagramOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewTot, setReviewTot] = useState(0);
  const [userTot, setUserTot] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    const fetchReviewCount = async () => {
      try {
        const res = await fetch('/api/reviews/count');
        const data = await res.json();
        setReviewTot(data.totalReviews);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    const fetchUserCount = async () => {
      try {
        const res = await fetch('/api/users/count');
        const data = await res.json();
        setUserTot(data.totalUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUserCount();
    fetchReviews();
    fetchReviewCount();
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
            <div className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
              <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
              <p className="text-sm sm:text-base text-gray-600">Restaurants</p>
            </div>

            <div className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
              <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
              <p className="text-sm sm:text-base text-gray-600">Recipes</p>
            </div>

            <div className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
              <p className="text-xl sm:text-2xl font-bold text-blue-700">{userTot}</p>
              <p className="text-sm sm:text-base text-gray-600">Users</p>
            </div>

            <div className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
              <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
              <p className="text-sm sm:text-base text-gray-600">Ratings</p>
            </div>

            <div className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
              <p className="text-xl sm:text-2xl font-bold text-blue-700">{reviewTot}</p>
              <p className="text-sm sm:text-base text-gray-600">Reviews</p>
            </div>

            <div className="p-3 bg-gray-100 w-full rounded-md shadow-sm">
              <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
              <p className="text-sm sm:text-base text-gray-600">Lists</p>
            </div>

          </div>
        </div>

        {/* 👇 User list section */}
        <div className="mt-10 mx-auto w-3/4">
          <h2 className="text-xl font-semibold  text-gray-800">Latest Reviews</h2>
          <ul className="list-disc  text-gray-700">
            {reviews.length === 0 ? (
              <li>loading</li>
            ) : (
              reviews.map((review) => (
                <li key={review.id} className="w-full bg-gray-100 my-4  rounded-lg p-4 flex items-start space-x-4 shadow-sm">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-300 rounded-md flex items-center justify-center text-gray-500">
                    <span>Image</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-gray-900 text-2xl font-bold self-center">
                        {review.title}
                      </span>
                      <div className="flex flex-col text-right text-gray-600 text-sm ml-4">
                        {(() => {
                          try {
                            const location = JSON.parse(review.location);
                            return (
                              <>
                                <div className="text-base">
                                  <a href="#" className="hover:underline">{location.name}</a>{', '}
                                  <a href="#" className="hover:underline">{location.city}</a>{', '}
                                  <a href="#" className="hover:underline">{location.country}</a>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {location.address}
                                </div>
                              </>
                            );
                          } catch (e) {
                            return <div>Invalid location</div>;
                          }
                        })()}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
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
