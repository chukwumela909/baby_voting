"use client";
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AddBabyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddBabyModal({ isOpen, onClose, onSuccess }: AddBabyModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to upload a baby profile');
      return;
    }

    if (!selectedFile) {
      setError('Please select a photo');
      return;
    }

    if (!name.trim()) {
      setError('Please enter baby\'s name');
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 24) {
      setError('Please enter a valid age (0-24 months)');
      return;
    }

    if (!gender) {
      setError('Please select gender');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Upload image to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('baby-photos')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        setError('Failed to upload photo: ' + uploadError.message);
        setLoading(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('baby-photos')
        .getPublicUrl(fileName);

      // Insert baby record
      const { data: babyData, error: insertError } = await supabase
        .from('babies')
        .insert({
          user_id: user.id,
          name: name.trim(),
          age: ageNum,
          gender,
          description: description.trim() || null,
          photo_url: publicUrl
        })
        .select()
        .single();

      if (insertError) {
        // If baby insert fails, delete the uploaded image
        await supabase.storage.from('baby-photos').remove([fileName]);
        setError('Failed to create baby profile: ' + insertError.message);
        setLoading(false);
        return;
      }

      // Success! Reset form
      setName('');
      setAge('');
      setGender('');
      setDescription('');
      setPreviewImage(null);
      setSelectedFile(null);
      setLoading(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setName('');
      setAge('');
      setGender('');
      setDescription('');
      setPreviewImage(null);
      setSelectedFile(null);
      setError('');
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title
                    as="h3"
                    className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D]"
                  >
                    Add Baby Profile
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    disabled={loading}
                    className="text-[#999999] hover:text-[#2D2D2D] transition-colors disabled:opacity-50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                      Baby Photo *
                    </label>
                    <label htmlFor="photo-upload" className="block border-2 border-dashed border-[#FFE5D9] rounded-2xl p-6 text-center hover:border-[#FF9B50] transition-colors cursor-pointer">
                      {previewImage ? (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-16 h-16 rounded-full bg-[#FFF8F0] flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#FF9B50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#2D2D2D]">Click to upload photo</p>
                            <p className="text-xs text-[#999999]">PNG, JPG, WebP up to 5MB</p>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        className="hidden"
                        id="photo-upload"
                        onChange={handleImageChange}
                        required
                        disabled={loading}
                      />
                    </label>
                  </div>

                  {/* Baby Name */}
                  <div>
                    <label htmlFor="baby-name" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                      Baby Name *
                    </label>
                    <input
                      id="baby-name"
                      name="baby-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Enter baby's name"
                    />
                  </div>

                  {/* Age */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age-months" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                        Age (months) *
                      </label>
                      <input
                        id="age-months"
                        name="age-months"
                        type="number"
                        min="0"
                        max="24"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        disabled={loading}
                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all disabled:opacity-50"
                        placeholder="0-24"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                        Gender *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        disabled={loading}
                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all disabled:opacity-50"
                      >
                        <option value="">Select...</option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={loading}
                      className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all resize-none disabled:opacity-50"
                      placeholder="Tell us about your baby..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={loading}
                      className="flex-1 bg-[#FFF8F0] text-[#666666] px-6 py-3 rounded-full font-semibold hover:bg-[#FFE5D9] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Uploading..." : "Add Baby"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
