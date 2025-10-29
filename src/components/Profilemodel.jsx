import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../context/ChatContext'
import { AppContext } from '../context/AppContext'

const ProfileModal = ({ onClose }) => {
    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AppContext)
    const [msgImages, setMsgImages] = useState([])

    useEffect(() => {
        if (messages && messages.length > 0) {
            const imgs = messages.filter(msg => msg.image).map(msg => msg.image)
            setMsgImages(imgs)
        }
    }, [messages])

    if (!selectedUser) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-[#0b0b0f] w-full max-w-2xl rounded-xl p-4 sm:p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
                    aria-label="Close profile"
                >
                    ✕
                </button>

                {/* Profile Section */}
                <div className='flex flex-col items-center gap-3 sm:gap-4 text-center'>
                    <img
                        src={selectedUser?.profilePic || assets.avatar_icon}
                        className='w-20 sm:w-24 aspect-square rounded-full object-cover border border-gray-600'
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

                {/* Bottom Close Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-full bg-gray-700 text-white hover:brightness-110"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal
