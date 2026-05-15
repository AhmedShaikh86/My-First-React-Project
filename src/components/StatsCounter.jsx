import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

const stats = [
  { label: 'Happy Clients', value: 10000, suffix: '+', prefix: '' },
  { label: 'Projects Delivered', value: 500, suffix: '+', prefix: '' },
  { label: 'Satisfaction Rate', value: 95, suffix: '%', prefix: '' },
  { label: 'Years Experience', value: 5, suffix: '+', prefix: '' },
]

const useCountUp = (target, duration = 2000, started) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

const StatItem = ({ stat, index, started }) => {
  const count = useCountUp(stat.value, 2000 + index * 200, started)

  const display =
    stat.value >= 1000
      ? (count / 1000).toFixed(count >= stat.value ? 0 : 1) + 'K'
      : count

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className='flex flex-col items-center gap-2 px-6 py-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all duration-300 group'
    >
      {/* Number */}
      <span className='text-4xl sm:text-5xl font-bold text-primary group-hover:scale-110 transition-transform duration-300'>
        {stat.prefix}{display}{stat.suffix}
      </span>

      {/* Divider */}
      <div className='w-8 h-0.5 bg-primary/40 rounded-full' />

      {/* Label */}
      <span className='text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400 text-center'>
        {stat.label}
      </span>
    </motion.div>
  )
}

const StatsCounter = () => {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='flex flex-col items-center gap-10 px-4 sm:px-12 lg:px-24 xl:px-40 pt-20 text-gray-700 dark:text-white'
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='text-center'
      >
        <h2 className='text-3xl sm:text-4xl font-semibold mb-3'>
          Numbers That <span className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent'>Speak</span>
        </h2>
        <p className='text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto'>
          Our results reflect our commitment to excellence and client success.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl'>
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} index={index} started={started} />
        ))}
      </div>
    </motion.div>
  )
}

export default StatsCounter
