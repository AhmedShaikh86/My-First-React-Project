import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const testimonialsData = [
  {
    name: 'Sarah Johnson',
    title: 'CEO at TechNova',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    review: 'Agency AI completely transformed our digital presence. Their team delivered beyond expectations — our leads increased by 3x within just 2 months!',
  },
  {
    name: 'Michael Chen',
    title: 'Founder at GrowthLab',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    review: 'The best investment we made for our startup. Their content marketing strategy was spot on. Professional, creative, and always on time.',
  },
  {
    name: 'Amina Patel',
    title: 'Marketing Head at Fintrek',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    review: 'I was skeptical at first, but Agency AI proved me wrong. Our social media engagement went through the roof. Highly recommended!',
  },
  {
    name: 'David Müller',
    title: 'COO at ScaleX',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
    review: 'Outstanding work on our advertising campaigns. The ROI we saw in Q1 was incredible. Their team truly understands digital marketing.',
  },
  {
    name: 'Lisa Park',
    title: 'Product Manager at Orbit',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 5,
    review: 'From strategy to execution, they handled everything seamlessly. Our brand visibility has never been better. Thank you Agency AI!',
  },
  {
    name: 'Omar Farooq',
    title: 'Director at BrightPath',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    rating: 5,
    review: 'Creative, reliable, and results-driven. Working with Agency AI was a game changer for our business. We saw real results fast.',
  },
]

const StarRating = ({ rating }) => (
  <div className='flex gap-0.5'>
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill='currentColor' viewBox='0 0 20 20'>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ))}
  </div>
)

const TestimonialCard = ({ testimonial }) => (
  <div className='w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-primary dark:hover:border-primary transition-all duration-300'>
    <svg className='w-8 h-8 text-primary opacity-30' fill='currentColor' viewBox='0 0 24 24'>
      <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
    </svg>
    <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1'>
      {testimonial.review}
    </p>
    <StarRating rating={testimonial.rating} />
    <div className='flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700'>
      <img src={testimonial.image} alt={testimonial.name} className='w-10 h-10 rounded-full object-cover ring-2 ring-primary/30' />
      <div>
        <p className='text-sm font-semibold text-gray-800 dark:text-white'>{testimonial.name}</p>
        <p className='text-xs text-gray-500 dark:text-gray-400'>{testimonial.title}</p>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoPlayRef = useRef(null)
  const total = testimonialsData.length

  const goTo = (index) => {
    const next = (index + total) % total
    setActiveIndex(next)
  }

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total)
    }, 3000)
    return () => clearInterval(autoPlayRef.current)
  }, [])

  const pauseAutoPlay = () => clearInterval(autoPlayRef.current)
  const resumeAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total)
    }, 3000)
  }

  // Mobile: 1 card, tablet: 2, desktop: 3
  const getVisibleCards = () => {
    return [0, 1, 2].map(i => (activeIndex + i) % total)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='flex flex-col items-center gap-10 px-4 sm:px-12 lg:px-24 xl:px-40 pt-20 text-gray-700 dark:text-white w-full overflow-hidden'
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='text-center w-full'
      >
        <h2 className='text-3xl sm:text-4xl font-semibold mb-3'>
          What Our <span className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent'>Clients Say</span>
        </h2>
        <p className='text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto'>
          Real results, real stories — hear from the businesses we've helped grow.
        </p>
      </motion.div>

      {/* Cards - responsive grid */}
      <div
        className='w-full max-w-5xl'
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {/* Mobile: single card centered */}
        <div className='block sm:hidden w-full max-w-sm mx-auto'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35 }}
            >
              <TestimonialCard testimonial={testimonialsData[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tablet: 2 cards */}
        <div className='hidden sm:flex lg:hidden gap-5 w-full'>
          <AnimatePresence mode='popLayout'>
            {[0, 1].map(offset => {
              const idx = (activeIndex + offset) % total
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4 }}
                  className='flex-1'
                >
                  <TestimonialCard testimonial={testimonialsData[idx]} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Desktop: 3 cards */}
        <div className='hidden lg:flex gap-5 w-full'>
          <AnimatePresence mode='popLayout'>
            {[0, 1, 2].map(offset => {
              const idx = (activeIndex + offset) % total
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: offset === 2 ? 0.6 : 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className='flex-1'
                >
                  <TestimonialCard testimonial={testimonialsData[idx]} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className='flex gap-2'>
        {testimonialsData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className='flex gap-4 -mt-4'>
        <button
          onClick={() => goTo(activeIndex - 1)}
          className='w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-primary hover:text-primary transition-all'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          className='w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-primary hover:text-primary transition-all'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

export default Testimonials
