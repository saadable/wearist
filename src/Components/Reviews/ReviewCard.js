import React from 'react'
import { FaStar } from "react-icons/fa6";

// Prototype review card component used on product detail page
// props.review: { userName, userImage?, rating, comment }
const ReviewCard = ({ review }) => {
    const reviewerName = review.username || review.userName || 'Reviewer'
    const userImage = review.userImage || review.avatar || null
    const comment = review.comment || review.review || ''
    const initial = reviewerName[0] ? reviewerName[0].toUpperCase() : '?'

    // render stars based on rating (0-5)
    const stars = Array.from({ length: 5 }).map((_, i) => (
        <FaStar
            key={i}
            className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
    ))

    return (
        <div className="flex items-start gap-4 py-5 px-4">
            <div className="shrink-0">
                {userImage ? (
                    <img
                        src={userImage}
                        alt={reviewerName}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-[#2785ca] text-white flex items-center justify-center font-bold text-xl">
                        {initial}
                    </div>
                )}
            </div>
            <div className="flex-1">
                <p className="font-semibold text-gray-900 text-base">{reviewerName}</p>
                <div className="flex items-center gap-2 mt-1 text-sm">
                    {stars}
                    <span className="ml-2 text-gray-600 font-medium">{review.rating?.toFixed(1) || '0.0'}</span>
                </div>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed">{comment}</p>
            </div>
        </div>
    )
}

export default ReviewCard;
