// Sample product data for demo and development
// Replace with API calls or your actual data source in production
import Airpods1 from '../../src/Components/Images/Airpods 2nd Gen 1.jpg'
import Caps1 from '../../src/Components/Images/Cap Black.jpg'
import HeadPhone from '../../src/Components/Images/HeadPhones 1.jpg'
import SmartWatch from '../../src/Components/Images/Smart Watach 1.png'

export const products = [
    {
        title: 'Apple AirPods Pro 2nd Generation – Active Noise Cancellation',
        altText: 'Side view of Apple AirPods Pro 2nd Generation wireless earbuds',
        desc: 'Experience immersive sound with Apple AirPods Pro 2nd Generation. Featuring active noise cancellation, adaptive transparency, and superior comfort for all-day wear. Perfect for music lovers and on-the-go professionals.',
        old_price: '3500',
        new_price: '2000',
        image: Airpods1,
        slug: 'apple-airpods-pro-2nd-generation-active-noise-cancellation',
        category: 'electronics',
        subCategory: 'airpods',
        rating: 4.8,
        review_count: 124
    },
    {
        title: 'Casual Cotton Cap – Everyday Streetwear Style',
        altText: 'Front view of premium cotton baseball cap with curved brim',
        desc: 'Stay stylish and protected with our Casual Cotton Cap. Made from breathable cotton, this cap is perfect for everyday wear. Features an adjustable strap for a comfortable fit and a classic design that complements any outfit.',
        old_price: '500',
        new_price: '300',
        image: Caps1,
        slug: 'casual-cotton-cap-everyday-streetwear-style',
        rating: 4.2,
        review_count: 31

    },
    {
        title: 'Premium Over-Ear Headphones with Deep Bass & Mic',
        altText: 'Black over-ear headphones with cushioned ear cups and adjustable headband',
        desc: 'Enjoy superior sound quality with our Premium Over-Ear Headphones. Featuring deep bass, a built-in microphone for hands-free calls, and cushioned ear cups for maximum comfort during extended listening sessions.',
        old_price: '4000',
        new_price: '2500',
        image: HeadPhone,
        slug: 'premium-over-ear-headphones-with-deep-bass-mic',
        category: 'electronics',
        subCategory: 'headphones',
        rating: 4.6,
        review_count: 89
    },
    {
        title: 'Smart Watch with Fitness Tracker & Heart Rate Monitor',
        altText: 'Sleek smart watch with customizable display and silicone band',
        desc: 'Stay connected and track your fitness goals with our Smart Watch. Features a heart rate monitor, fitness tracker, customizable display, and a comfortable silicone band. Perfect for an active lifestyle.',
        old_price: '6000',
        new_price: '3500',
        image: SmartWatch,
        slug: 'smart-watch-with-fitness-tracker-heart-rate-monitor',
        rating: 4.3,
        review_count: 47
    }
]
