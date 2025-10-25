import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../context/ChatContext'
import { AppContext } from '../context/AppContext'

const RightSideBar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AppContext)
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image))
  }, [messages])
  return selectedUser && (
    <div className={` bg-[#818582]/10 overflow-y-auto h-full relative p-5 rounded-lg ${selectedUser ? 'max-md:hidden' : ""}`}>
      <div className='flex flex-col items-center gap-3'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-2 text-xl text-white text-center flex flex-row  items-center gap-2'>
          {
            onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 bg-green-500 rounded-full '> </p>
          }
          {selectedUser.fullName}</h1>
        <p className='px-10 text-center text-white'>{selectedUser.bio}</p>
      </div>
      <hr className='bg-[#ffffff50] my-4 w-full' />
      <div>
        <p className='text-white font-semibold'>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll  text-xl grid grid-cols-2 gap-2 opacity-80'>
          {
            msgImages.map((url, index) => (
              <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
                <img src={url} className='h-full rounded-sm' />
              </div>
            ))
          }
        </div>
      </div>
      <button onClick={() => logout()} className='bottom-2 text-white font-medium  absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 border-none text-sm  py-2 px-20 rounded-full cursor-pointer'>Logout

      </button>
    </div>
  )
}

export default RightSideBar