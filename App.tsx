import React, { useState, useCallback } from 'react';
import { BookCardData } from './types';
import { generateBookCard } from './services/geminiService';
import BookInput from './components/BookInput';
import GeneratedCard from './components/GeneratedCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { BookOpenIcon } from './components/icons/BookOpenIcon';

const App: React.FC = () => {
  const [bookTitle, setBookTitle] = useState<string>('');
  const [cardData, setCardData] = useState<BookCardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!bookTitle.trim()) {
      setError('الرجاء إدخال عنوان الكتاب.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCardData(null);

    try {
      const data = await generateBookCard(bookTitle);
      setCardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  }, [bookTitle]);
  
  const handleReset = () => {
    setBookTitle('');
    setCardData(null);
    setError(null);
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            نبذة علي السريع
            </h1>
        </div>
        <p className="text-lg text-gray-400">
          حوّل أي عنوان كتاب إلى  ملخص جميلة ومفيدة.
        </p>
      </header>

      <main className="w-full max-w-xl flex-grow flex flex-col items-center">
        {!cardData && !isLoading && (
            <BookInput
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                onSubmit={handleGenerate}
                disabled={isLoading}
            />
        )}

        {isLoading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} onRetry={handleGenerate} />}

        {cardData && (
          <div className="w-full animate-fade-in">
            <GeneratedCard data={cardData} />
            <div className="mt-6 text-center">
              <button
                onClick={handleReset}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center mx-auto shadow-lg hover:shadow-purple-500/50"
              >
                <BookOpenIcon className="w-5 h-5 ml-2" />
                إنشاء ملخص أخرى
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="w-full max-w-4xl text-center mt-12 pb-4">
        <p className="text-gray-500 text-sm">صنع بواسطة احمد السيد</p>
      </footer>
    </div>
  );
};

export default App;