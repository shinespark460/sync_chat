import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../context/ChatContext'
import { AppContext } from '../context/AppContext'

const SenderProfleTab = () => {
     const { selectedUser, messages } = useContext(ChatContext)
      const { logout, onlineUsers } = useContext(AppContext)
      const [msgImages, setMsgImages] = useState([])
    
      useEffect(() => {
        setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image))
      }, [messages])
  return (
    selectedUser && (
      <div
        className={`bg-[#818582]/10 backdrop-blur-lg overflow-y-auto h-full relative 
        p-4 sm:p-5 rounded-lg border-l border-gray-700 
        transition-all duration-300 ${selectedUser ? 'max-md:hidden' : ''}`}
      >
        {/* Profile Section */}
        <div className='flex flex-col items-center gap-2 sm:gap-3 text-center'>
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className='w-16 sm:w-20 aspect-square rounded-full object-cover border border-gray-600'
            alt='profile'
          />
          <h1 className='px-2 text-lg sm:text-xl text-white font-semibold flex items-center gap-2'>
            {onlineUsers.includes(selectedUser._id) && (
              <span className='w-2 h-2 bg-green-500 rounded-full'></span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className='px-4 sm:px-10 text-sm sm:text-base text-gray-300'>
            {selectedUser.bio || 'No bio available'}
          </p>
        </div>

        {/* Divider */}
        <hr className='bg-[#ffffff40] my-4 w-full' />

        {/* Media Section */}
        <div>
          <p className='text-white font-semibold text-sm sm:text-base'>Media</p>
          {msgImages.length > 0 ? (
            <div className='mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto max-h-[200px] sm:max-h-[250px]'>
              {msgImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url, '_blank')}
                  className='cursor-pointer rounded overflow-hidden hover:opacity-90 transition'
                >
                  <img
                    src={url}
                    alt={`media-${index}`}
                    className='w-full h-full object-cover rounded-md'
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-400 text-sm mt-2'>No media shared yet</p>
          )}
        </div>

        {/* Logout Button */}
        <div className='flex justify-center mt-6'>
          <button
            onClick={() => logout()}
            className='text-white font-medium text-sm sm:text-base py-2 sm:py-2.5 px-10 sm:px-20 rounded-full cursor-pointer 
              bg-gradient-to-r from-purple-400 to-violet-600 hover:from-purple-500 hover:to-violet-700 transition-all'
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}

export default SenderProfleTab
