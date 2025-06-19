import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { div } from 'motion/react-client'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-purple-800/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
            <div>
                <img src= {assets.logo} alt="logo"  className ="w-32 sm:w-44" srcset="" />
                <p className='max-w-[410px] mt-6'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis maiores illum rerum, dolore magni eaque? Vero dolores, esse, at sapiente nisi molestias consequatur eveniet hic veritatis tempore recusandae porro nostrum.
                </p>
            </div>
       <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
  {footer_data.map((section, index) => (
    <div key={index}>
      <h3 className="text-base font-semibold mb-2">{section.title}</h3>
      <ul className="space-y-1">
        {section.links.map((link, i) => (
          <li key={i}>
            <a href="#" className="text-sm text-gray-600 hover:text-purple-700">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>


        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
        Copyright 2025 © test - prj </p>
    </div>
  )
}

export default Footer