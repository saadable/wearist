import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import Image from 'next/image'

// Professional review card component with image support
const ReviewCard = ({ review }) => {
    const [expandedComment, setExpandedComment] = useState(false)
    const reviewerName = review.username || review.userName || 'Anonymous Reviewer'
    const userImage = review.userImage || review.avatar || null
    const comment = review.comment || review.review || ''
    const initial = reviewerName[0] ? reviewerName[0].toUpperCase() : '?'
    const reviewImages = review.images || []
    const maxCommentLength = 180
    const needsTruncate = comment.length > maxCommentLength
    const visibleComment = expandedComment || !needsTruncate
        ? comment
        : `${comment.slice(0, maxCommentLength).trimEnd()}...`

    // render stars based on rating (0-5)
    const stars = Array.from({ length: 5 }).map((_, i) => (
        <FaStar
            key={i}
            className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
    ))

    return (
        <article className="flex flex-col justify-between bg-white p-6 rounded-[28px] border border-slate-200  hover:shadow-[0_22px_90px_rgba(15,23,42,0.12)] transition-all duration-300 h-[450px] ">
            <div className="article">
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="relative h-14 w-14 rounded-full overflow-hidden border border-slate-200 shadow-sm">
                            {userImage ? (
                                <img
                                    src={userImage}
                                    alt={reviewerName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-[#2785ca] to-[#1f6fa8] flex items-center justify-center text-white font-semibold text-lg">
                                    {initial}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-base font-semibold text-slate-900 truncate">{reviewerName}</p>
                            <p className="text-xs text-slate-500 truncate">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#2785ca]/10 px-3 py-1 text-[#2785ca] font-semibold text-sm">
                            <span>{review.rating?.toFixed(1) || '0.0'}</span>
                            <FaStar className="w-4 h-4" />
                        </div>
                        <div className="text-xs uppercase tracking-[0.22em] text-slate-400 font-medium">Approved</div>
                    </div>
                </div>

                <div className=" overflow-hidden rounded-3xl bg-slate-50 p-4">
                    <div className="comment-scrollbar text-slate-700 text-sm leading-6 h-[50px] overflow-y-auto scroll-smooth">
                        <p className="whitespace-pre-line">
                            {visibleComment}
                        </p>
                        {needsTruncate && (
                            <button
                                type="button"
                                onClick={() => setExpandedComment(!expandedComment)}
                                className="mt-3 inline-flex items-center text-sm font-semibold text-[#2785ca] hover:text-[#1f6fa8] transition-colors"
                            >
                                {expandedComment ? 'Show less' : 'See more'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="other-article">
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 h-[220px] overflow-hidden">
                    {reviewImages.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Review Photos</p>
                                <span className="text-xs text-slate-400">{reviewImages.length} image{reviewImages.length > 1 ? 's' : ''}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 h-full">
                                {reviewImages.slice(0, 4).map((img, idx) => (
                                    <div key={idx} className="relative aspect-square overflow-hidden rounded-3xl shadow-sm">
                                        <Image
                                            src={img.url}
                                            alt={`Review image ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 45vw, 20vw"
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        {idx === 3 && reviewImages.length > 4 && (
                                            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white text-sm font-semibold">
                                                +{reviewImages.length - 4}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-slate-50 text-center text-xs text-slate-400">
                            No review images uploaded
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .comment-scrollbar {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .comment-scrollbar::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
            `}</style>
        </article>
    )
}

export default ReviewCard;
