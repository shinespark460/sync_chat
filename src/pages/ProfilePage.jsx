import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const ProfilePage = () => {
  const [selectedImage , setSelectedImage] = useState(null)
  const [name , setName] = useState("John Cena");
  const [ bio,setBio] = useState("I am using chat shot");
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form className='flex flex-col gap-5 flex-1 p-6'>
          <h3 className='text-xl text-white'>Profile</h3>
          <label htmlFor='avatar' className='flex items-center gap-5 cursor-pointer'>
          <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avatar' hidden accept='image/jpg, image/jpeg' />
          <img  src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} className={`w-12 h-12 ${selectedImage && 'rounded-full'}`}/>
 Update Profile Photo    </label>   </form>
        <img />
      </div>

    </div>
  )
}

export default ProfilePage