import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AppContext)
  const [selectedImage, setSelectedImage] = useState(null)
  const [name, setName] = useState(authUser?.fullName);
  const [bio, setBio] = useState(authUser?.bio);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio })
      navigate("/")
      toast.success("Profile Updated Successfully");
      return;
    }
    const render = new FileReader();
    render.readAsDataURL(selectedImage);
    render.onload = async () => {
      const base64Image = render.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio })
      navigate("/")
      toast.success("Profile Updated Successfully");
      return;

    }
  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-3xl backdrop-blur-2xl text-gray-300 grid grid-cols-2 border-2 border-gray-600  items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 flex-1 p-6'>
          <h3 className='text-xl text-white'>Profile</h3>
          <label htmlFor='avatar' className='flex items-center gap-5 cursor-pointer'>
            <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avatar' hidden accept='image/jpg, image/jpeg' />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            Update Profile Photo    </label>
          <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Your Name' className='p-2 border border-gray-500 focus:ring-2 focus:outline-none focus:border-violet-500 rounded-md' />
          <textarea value={bio} rows={4} onChange={(e) => setBio(e.target.value)} placeholder='Your Name' className='p-2 border  resize-none border-gray-500 focus:ring-2 focus:outline-none focus:border-violet-500 rounded-md' />
          <button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-purple-400 to-violet-600 border-none text-white text-sm py-2 px-2 rounded-xl hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
        <div className='flex justify-center items-center'>


          <img src={authUser.profilePic || assets.logo_icon} className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10  ${selectedImage && 'rounded-full'}`} />

        </div>
      </div>

    </div>
  )
}

export default ProfilePage