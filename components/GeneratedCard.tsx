import React, { useState } from 'react';
import { BookCardData } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';


interface GeneratedCardProps {
  data: BookCardData;
}

const GeneratedCard: React.FC<GeneratedCardProps> = ({ data }) => {
  const { title, author, summary, takeaways, quote, themeColor, detailedAnalysis } = data;
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Simple validation for hex color
  const isValidColor = /^#([0-9A-F]{3}){1,2}$/i.test(themeColor);
  const cardStyle = {
    borderColor: isValidColor ? themeColor : '#A855F7', // Default to purple if invalid
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % detailedAnalysis.length);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + detailedAnalysis.length) % detailedAnalysis.length);
  };


  return (
    <div 
        className="bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-xl border-t-8 transition-all duration-500 text-right"
        style={cardStyle}
    >
      <header className="mb-6 text-center">
        <h2 className="text-3xl font-bold font-serif text-white">{title}</h2>
        <p className="text-lg text-gray-400 mt-1">بواسطة {author}</p>
      </header>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-3">الملخص</h3>
        <p className="text-gray-300 leading-relaxed">{summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">الدروس الرئيسية</h3>
        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-400 ml-3 mt-1">&#10003;</span>
              <p className="text-gray-300 flex-1">{takeaway}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-900/50 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-purple-400 mb-3">اقتباس</h3>
        <blockquote className="border-r-4 border-l-0 border-purple-500 pr-4">
          <p className="text-gray-300 italic">"{quote}"</p>
        </blockquote>
      </section>

      {detailedAnalysis && detailedAnalysis.length > 0 && (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <button
            onClick={() => setDetailsVisible(!detailsVisible)}
            className="flex items-center justify-between w-full text-lg font-semibold text-purple-400 hover:text-purple-300 transition-colors py-2"
            aria-expanded={detailsVisible}
            aria-controls="detailed-analysis-content"
          >
            <span>{detailsVisible ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}</span>
            {detailsVisible ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
          </button>
          <div
            id="detailed-analysis-content"
            className={`grid transition-all duration-500 ease-in-out ${detailsVisible ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-gray-300 leading-relaxed min-h-[160px] sm:min-h-[120px]">
                  {detailedAnalysis[currentPage]}
                </p>
                <div className="flex items-center justify-between mt-4">
                   <button
                    onClick={handlePrevPage}
                    aria-label="Previous analysis page"
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                  <span className="text-gray-400 text-sm font-mono tracking-widest">
                    {currentPage + 1} / {detailedAnalysis.length}
                  </span>
                  <button
                    onClick={handleNextPage}
                    aria-label="Next analysis page"
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedCard;
