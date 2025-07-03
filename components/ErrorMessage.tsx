import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 p-6 rounded-lg w-full max-w-lg text-center animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">عفوًا! حدث خطأ ما.</h3>
      <p className="mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        حاول مرة أخرى
      </button>
    </div>
  );
};

export default ErrorMessage;