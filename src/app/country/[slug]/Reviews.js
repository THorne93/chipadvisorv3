
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating'
import slugify from 'slugify'; // or define it here

export default function Reviews({ reviews }) {
    const [expandedReviewId, setExpandedReviewId] = useState(null);

    return reviews.length === 0 ? (
        <p>No reviews found.</p>
    ) : (
        <ul>
            {reviews.map((review) => {
                const isExpanded = expandedReviewId === review.id;
                const location = review.location;
                const slug = slugify(location.country);

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
            })}
        </ul>
    );
}
