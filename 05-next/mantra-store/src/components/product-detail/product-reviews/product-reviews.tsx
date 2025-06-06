"use client";

import { useProduct } from "@/context/product-context";
import { IReview } from "@/types/Product";
// import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductReviews = () => {
    const { product } = useProduct();
    const router = useRouter();

    const reviews = product?.reviews as IReview[];

    const navigateToAddReview = () => {
        router.push(`/products/${product?._id}/addreview`);
    };

    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet. Be the first one to <span onClick={navigateToAddReview} style={{ textDecoration: 'underline' }}>add a review!</span></p>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

            <button
                onClick={navigateToAddReview}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded my-6"
            >
                Add Review
            </button>

            {/* <Link href={`./${product?._id}/addreview`}>Add a review</Link> */}
            <ul className="space-y-6">
                {reviews.map((review) => (
                    <li key={review._id} className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            {review.username.substring(0, 1).toUpperCase()}
                        </div>

                        {/* Review content */}
                        <div className="flex-1 space-y-2">
                            <div className="text-sm text-gray-500">
                                {new Date(review.date)
                                    .toDateString()
                                    .substring(0, 10)}
                            </div>

                            {/* Simple rating stars using emoji (or swap with custom SVG if desired) */}
                            <div className="flex items-center text-yellow-500 text-sm">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>

                            <p className="text-gray-800">{review.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductReviews;