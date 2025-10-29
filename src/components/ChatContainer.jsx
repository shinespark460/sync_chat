import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageDate } from '../lib/utils';
import { ChatContext } from '../context/ChatContext';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import ProfileModal from './Profilemodel';
const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, getMessages,
        sendMessage, } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AppContext)
    const [input, setInput] = useState("")
    const scrollEnd = React.useRef();
    const [showProfile, setShowProfile] = useState(false)
    const handleSubmit = async () => {
        if (input.trim() === "") return;
        await sendMessage({ text: input.trim() });
        setInput("")
    }
    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // ✅ check MIME type properly
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result });
            e.target.value = "";
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser])
    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])
    return selectedUser ? (
        <div className=' backdrop-blur-lg overflow-scroll h-full relative m-2'>
            {/* Header Part */}
            <div className='flex items-center gap-3 border-b border-stone-500 px-6 py-3'>
                <img src={selectedUser.profilePic || assets.avatar_icon} alt='' className='w-8 rounded-full hidden md:block' />
                <img src={selectedUser.profilePic || assets.avatar_icon} alt='' className='w-8 rounded-full block md:hidden' onClick={() => setShowProfile(true)} />
                <p className='flex items-center flex-1 gap-2 text-lg text-white font-semibold'>
                    {selectedUser.fullName}
                    {
                        onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>
                    }

                </p>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} className='md:hidden max-w-7' />
                <img src={assets.help_icon} alt='' className='max-w-5 max-md:hidden cursor-pointer' />
            </div>

            {/* Messages */}
            <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent'>
                {
                    messages.map((msg, index) => (
                        <div
                            className={`flex items-end justify-end gap-2 ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}
                            key={index}
                        >
                            {
                                msg.image ? (
                                    <img
                                        src={msg.image}
                                        alt=''
                                        className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'
                                    />
                                ) : (
                                    <p
                                        className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-white ${msg.senderId === authUser._id
                                            ? 'rounded-br-none'
                                            : 'rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </p>
                                )
                            }
                            <div className='text-center text-xs'>
                                <img
                                    src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser.profilePic || assets.avatar_icon}
                                    alt=''
                                    className='w-7 rounded-full'
                                />
                                <p className='text-gray-100'>
                                    {formatMessageDate(msg.createdAt)}
                                </p>
                            </div>
                        </div>
                    ))
                }
                <div ref={scrollEnd}></div>
                {showProfile && (
                    <ProfileModal
                        user={selectedUser}
                        images={messages ? messages.filter((m) => m.image) : []}
                        onClose={() => setShowProfile(false)}
                    />
                )}
            </div>
            {/* Bottom Area */}
            <div className='absolute bottom-0 left-0 flex items-center gap-3 p-3 w-full z-30 bg-black/20 backdrop-blur-lg'>
                <div className='flex items-center flex-1 bg-gray-100/10 rounded-full px-4 py-2'>
                    <input
                        type='text' onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" ? handleSubmit(e) : null}
                        placeholder='Send a message...'
                        className='flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500'
                    />
                    <input type='file' id='image' onChange={handleSendImage} hidden accept='image/jpg, image/jpeg, image/png' />
                    <label htmlFor='image' className='cursor-pointer'>
                        <img src={assets.gallery_icon} alt='' className='w-5 opacity-80 hover:opacity-100 transition mr-2' />
                    </label>
                </div>
                <img onClick={handleSubmit} src={assets.send_button} alt='' className='w-7 cursor-pointer hover:scale-110 transition' />
            </div>
        </div>
    ) : (
        <div className='flex items-center justify-center flex-col gap-4'>
            <img src={assets.logo_icon} className='max-w-16' alt='' />
            <p className='text-xl text-white'>Chat Anywhere, Anytime</p>
        </div>
    )
}

export default ChatContainer
