import React from 'react'

const GoogleMap = () => {
  return (
    <section className=' py-10 sm:py-14'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='rounded-[10px] border border-slate-200 bg-white shadow-sm overflow-hidden'>
          <div className='flex flex-col  '>
            <div className='p-5 md:p-10'>
              <p className='text-[14px] md:text-[20px] uppercase tracking-[0.3em] text-[#2785ca]'>Our location</p>
              <h2 className='mt-0 text-[16px] md:text-[30px] font-bold text-slate-900'>Find Wearist Headquarters on the Maps</h2>
              {/* <p className='mt-5 text-sm sm:text-base leading-7 text-slate-600'>Visit our local office in Pakistan for customer support, product inquiries, and order assistance. The map below makes it easy to locate us and plan your visit.</p> */}
            </div>

            <div className='h-72 sm:h-96 w-full px-5 pb-5 md:px-10 md:pb-10'>
              <iframe
                title='Wearist location map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.356654276928!2d74.2421854!3d31.459373799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901a467fcbd57%3A0xde4350e495737246!2sWearist!5e0!3m2!1sen!2s!4v1775136930469!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                width='100%'
                height='100%'
                className='border-0'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleMap
