'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Rating } from 'react-simple-star-rating'
import { XOutlined, InstagramOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewTot, setReviewTot] = useState(0);
  const [userTot, setUserTot] = useState(1);
  const [rating, setRating] = useState(2)
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-');
  }
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

    <div className="sm:w-5/6 w-full pt-6 mx-auto">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="sm:w-3/4 w-full flex flex-col sm:flex-row items-center gap-4 mb-4 mx-auto sm:mb-0">
          <div className='sm:w-1/6 w-full flex '>
            <img className="h-36 w-36 mx-auto rounded-full"
              src="/assets/img/chiplogo.jpg" />
          </div>
          <div className="w-5/6 flex flex-col text-gray-700 text-base sm:text-lg leading-relaxed">
            <h1 className="text-2xl sm:mb-0 mb-2 sm:text-3xl md:text-4xl font-bold text-gray-800">
              Welcome to Chip Advisor
            </h1>
            <p className='sm:mb-0 mb-2'>
              ChipAdvisor is a place where aficionados of potatoes can get together to find - or create - the perfect chip.
            </p>
            <div className="max-sm:flex max-sm:flex-row max-sm:justify-between">
              <Button type="text" className="text-gray-600 h-8 w-8 sm:mr-4 mr-2 hover:text-black transition-colors duration-200">
                <XOutlined style={{ fontSize: '32px' }} />
              </Button>
              <Button type="text" className="text-gray-600 h-8 w-8 sm:mr-4 mr-2 hover:text-black transition-colors duration-200">
                <InstagramOutlined style={{ fontSize: '32px' }} />
              </Button>
              <Button type="text" className="text-gray-600 h-8 w-8  sm:mr-4 mr-2 hover:text-black transition-colors duration-200">
                <FacebookOutlined style={{ fontSize: '32px' }} />
              </Button>
              <Button type="text" className="text-gray-600 h-8 w-8 sm:mr-4 mr-2 hover:text-black transition-colors duration-200">
                <MailOutlined style={{ fontSize: '32px' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className='mx-auto w-3/4'>
        <div className="flex flex flex-col sm:flex-row gap-4 justify-between text-gray-800 font-medium text-center">
          <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
            <p className="text-sm sm:text-base text-gray-600">Restaurants</p>
          </div>

          <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
            <p className="text-sm sm:text-base text-gray-600">Recipes</p>
          </div>

          <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-700">{userTot}</p>
            <p className="text-sm sm:text-base text-gray-600">Users</p>
          </div>

          <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
            <p className="text-sm sm:text-base text-gray-600">Ratings</p>
          </div>

          <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-700">{reviewTot}</p>
            <p className="text-sm sm:text-base text-gray-600">Reviews</p>
          </div>

          <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
            <p className="text-sm sm:text-base text-gray-600">Lists</p>
          </div>

        </div>
      </div>

      {/* 👇 User list section */}
      <div className="mt-10 mx-auto w-3/4">
        <h2 className="text-xl text-center sm:text-left font-semibold text-gray-800">Latest Reviews</h2>
        <ul className="list-none text-gray-700">
          {reviews.length === 0 ? (
            <li>Loading...</li>
          ) : (
            reviews.map((review) => {
              const isExpanded = expandedReviewId === review.id;

              return (
                <li
                  key={review.id}
                  className="w-full bg-gray-100 my-4 rounded-lg p-4 flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 shadow-sm"
                >
                  <div className="flex-shrink-0 w-32 h-32 bg-gray-300 rounded-md flex items-center justify-center text-gray-500 mx-auto sm:mx-0 mb-4 sm:mb-0">
                    <span>Image</span>
                  </div>

                  <div className="flex-1 sm:ml-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                      <div className="text-gray-900 flex flex-row sm:flex-col sm:text-2xl text-lg font-bold">
                        <div className="mt-1 sm:mt-0">{review.title}</div>

                        <div className="flex flex-row ml-2 sm:ml-0 self-start sm:self-auto  sm:-mt-3">
                          <Rating
                            className="p-0"
                            key={review.score}
                            readonly={true}
                            size={20}
                            initialValue={Number(review.score)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:text-right text-left text-gray-600 text-sm ml-0 sm:ml-4 mt-0">
                        {(() => {
                          try {
                            const location = review.location;
                            const slug = slugify(location.country);

                            return (
                              <>
                                <div className="text-base">
                                  <a href="" className="hover:underline">{location.name}</a>,{" "}
                                  <a href="#" className="hover:underline">{location.city}</a>,{" "}
                                  <a href={`/country/${slug}`} className="hover:underline">{location.country}</a>
                                </div>
                                <div className="text-sm text-gray-500">{location.address}</div>
                              </>
                            );
                          } catch (e) {
                            return <div>Invalid location</div>;
                          }
                        })()}
                      </div>
                    </div>

                    <div
                      className={`text-gray-700 relative transition-all duration-300 ease-in-out ${isExpanded ? "" : "max-h-12 overflow-hidden"}`}
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    ></div>

                    {review.content.length > 160 && (
                      <button
                        className="text-black w-full cursor-pointer text-sm hover:underline"
                        onClick={() => setExpandedReviewId(isExpanded ? null : review.id)}
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </li>

              );
            })
          )}
        </ul>
      </div>

    </div>
  );
};

export default Home;
