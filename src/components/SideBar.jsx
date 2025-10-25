import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ChatContext } from '../context/ChatContext'

const SideBar = () => {

    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages
    } = useContext(ChatContext)
    const navigate = useNavigate()
    const { logout, onlineUsers } = useContext(AppContext)

    const [input, setInput] = useState("")

    const filteredUsers = users ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
    ) : [];

    useEffect(() => {
        getUsers()
    }, [onlineUsers])
    return (
        <div className={`bg-[#1885b2]/10 h-full p-5 rounded-r-xl text-white overflow-y-hidden ${selectedUser ? 'mx-md-hidden' : ''}`}>

            <div className='pb-5'>
                <div className='flex justify-between items-center'>
                    <img src={assets.logo} alt='logo' className='max-w-40' />
                    <div className='relative py-2 group'>
                        <img src={assets.menu_icon} alt='logo' className='max-h-5 cursor-pointer' />
                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-500 text-gray-100 hidden group-hover:block'>
                            <p className='cursor-pointer text-sm' onClick={() => navigate("/profile")}>Edit Profile</p>
                            <hr className='my-2 border-t border-gray-500'></hr>
                            <p onClick={() => logout()} className='cursor-pointer text-sm'>Log Out</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center px-5 py-2 mt-5 rounded-full  gap-3 bg-[#282142] '>
                    <img src={assets.search_icon} alt='' className='w-3' />
                    <input type='text' onChange={(e) => setInput(e.target.value)} placeholder='Search or start new chat' className='bg-transparent border-none text-white text-sm flex-1 placeholder:text-[#8c8c8c] outline-none' />
                </div>
            </div>
            <div className='flex flex-col gap-3 '>
                {
                    filteredUsers.map((user, index) => (

                        <div key={index} onClick={() => {
                            setSelectedUser(user); setUnseenMessages(
                                prev => ({ ...prev, [user._id]: 0 })
                            )
                        }} className={`relative flex items-center gap-2 p-2 pl-4 rounded-2xl cursor-pointer max-sm:text-xs  ${selectedUser?._id === user._id ? 'bg-[#1885b2]/30' : 'hover:bg-[#1885b2]/20'}`}>

                            <img src={user?.profilePic || assets.avatar_icon} className='w-[35px] aspect-[1/1] rounded-full' />
                            <div className='flex flex-col leading-5 '>
                                <p>
                                    {user.fullName}
                                </p>
                                {
                                    onlineUsers.includes(user._id) ? <span className='text-green-500 text-xs'>Online</span> : <span className='text-gray-500 text-xs'>Offline</span>
                                }
                            </div>
                            {unseenMessages[user._id] > 0 && (
                                <p className='top-4 right-4 rounded-full text-xs absolute flex justify-center items-center w-4 h-4 bg-violet-500/50'>
                                    {unseenMessages[user._id]}
                                </p>
                            )}

                        </div>))
                }
            </div>
        </div>
    )
}

export default SideBar