import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative">
        <BookOpenIcon className="w-16 h-16 text-purple-400 animate-pulse"/>
        <div className="absolute top-0 left-0 w-16 h-16 border-2 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-lg text-gray-300">جاري إنشاء الملخص...</p>
      <p className="text-sm text-gray-500">صلي علي النبي و استغفر لحد ما يتعمل</p>
    </div>
  );
};

export default LoadingSpinner;