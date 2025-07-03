import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface BookInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const BookInput: React.FC<BookInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <div className="w-full max-w-lg text-center p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">أدخل عنوان الكتاب</h2>
        <p className="text-gray-400 mb-6">لنرى السحر الذي يمكننا صنعه.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row-reverse gap-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="مثال: دليل المسافر إلى المجرة"
                disabled={disabled}
                className="flex-grow bg-gray-900/80 border-2 border-gray-700 text-white placeholder-gray-500 rounded-lg py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ease-in-out outline-none text-right"
            />
            <button
                type="submit"
                disabled={disabled}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg hover:shadow-purple-500/50"
            >
                <SparklesIcon className="w-5 h-5 ml-2"/>
                إنشاء بطاقة
            </button>
        </form>
    </div>
  );
};

export default BookInput;