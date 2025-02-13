'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { User, ProfileFormProps } from '@/types/user'
import { toast } from 'react-hot-toast'
import { updateProfile } from '@/lib/user'

export default function ProfileForm({ user }: ProfileFormProps) {
  const [avatar, setAvatar] = useState<string | null>(user?.image || null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Error processing image');
      console.error('Image processing error:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simplified form data handling - only send name
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      
      // Only append image if it's changed from the current user image
      if (avatar && avatar !== user?.image) {
        formDataToSend.append('imageBase64', avatar);
      }

      const result = await updateProfile(formDataToSend);
      if (result.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    })
    setAvatar(user?.image || null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleProfileUpdate} className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-100">
        {/* ... previous JSX for header and roles remains the same ... */}

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">
            Profile Picture
          </label>
          <div className="flex items-center space-x-6">
            <div className="relative group">
              {avatar ? (
                <div className="relative">
                  <Image
                    className="h-24 w-24 object-cover rounded-full ring-4 ring-violet-50 shadow-md"
                    src={avatar}
                    alt={`${formData.name}'s profile picture`}
                    width={96}
                    height={96}
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label htmlFor="avatar-upload" className="cursor-pointer w-full h-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-violet-50 flex items-center justify-center ring-4 ring-violet-50 shadow-md">
                  <svg
                    className="h-12 w-12 text-violet-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  id="avatar-upload"
                  type="file"
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2.5 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    transition duration-150 ease-in-out
                    focus:outline-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                          focus:ring-2 focus:ring-violet-200 focus:border-violet-500
                          transition duration-150 ease-in-out shadow-sm"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                          bg-gray-50 text-gray-500 cursor-not-allowed shadow-sm"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                aria-disabled="true"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-6 mt-8 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg text-gray-700 font-medium
                         hover:bg-gray-100 focus:outline-none focus:ring-2 
                         focus:ring-gray-200 transition duration-150 ease-in-out
                         disabled:opacity-50"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 text-white font-medium rounded-lg
                         hover:bg-violet-700 focus:outline-none focus:ring-2 
                         focus:ring-violet-500 focus:ring-offset-2 
                         transition duration-150 ease-in-out shadow-sm
                         disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Saving...</span>
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}