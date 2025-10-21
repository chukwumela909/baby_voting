"use client";
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface AddBabyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBabyModal({ isOpen, onClose }: AddBabyModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement actual upload logic
    console.log('Form submitted');
    setPreviewImage(null);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                    onClick={onClose}
                    className="text-[#999999] hover:text-[#2D2D2D] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                      Baby Photo
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
                            <p className="text-xs text-[#999999]">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="photo-upload"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                  </div>

                  {/* Baby Name */}
                  <div>
                    <label htmlFor="baby-name" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                      Baby Name
                    </label>
                    <input
                      id="baby-name"
                      name="baby-name"
                      type="text"
                      required
                      className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all"
                      placeholder="Enter baby's name"
                    />
                  </div>

                  {/* Age */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age-months" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                        Age (months)
                      </label>
                      <input
                        id="age-months"
                        name="age-months"
                        type="number"
                        min="0"
                        max="24"
                        required
                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all"
                        placeholder="0-24"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all"
                      >
                        <option value="male">Boy</option>
                        <option value="female">Girl</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your baby..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-[#FFF8F0] text-[#666666] px-6 py-3 rounded-full font-semibold hover:bg-[#FFE5D9] transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all duration-300"
                    >
                      Add Baby
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
