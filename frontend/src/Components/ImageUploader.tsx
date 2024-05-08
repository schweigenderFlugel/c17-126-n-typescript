import { useState } from "react";
import { HiUser } from 'react-icons/hi2';

export const UploadImage = ({ avatar, file, onChange, ...props }) => {
  const [preview, setPreview] = useState<ArrayBuffer | string | null>(null);
  
  const image = (image: string) => {
    return (
      <img 
        src={image}
        alt="User avatar"
        className="text-[34px] rounded-full" 
      />
    )
  }
  
  const avatarFound = avatar ?? <HiUser className="text-[60px] rounded-full mt-6 mb-6 text-black dark:text-white hover:bg-indigo-600 dark:hover:bg-indigo-300 hover:text-white dark:hover:text-black hover:border hover:border-1 hover:border-black dark:hover:border-indigo-600"/> 
  const imageLoaded = preview === null ? avatarFound : image(preview.toString());
  
  return (
    <div className="inline-flex justify-center text-black dark:text-white">
      <label htmlFor="avatar" className="cursor-pointer">
        {imageLoaded}
      </label>
      <input
        {...props}
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </div>
  );
};