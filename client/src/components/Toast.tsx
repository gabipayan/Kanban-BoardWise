import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'info' | 'debug';
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, type, duration = 5000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      case 'debug':
        return 'bg-gray-700';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg text-white shadow-lg transition-opacity duration-300 ${
        getToastStyle()
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center">
        <span className="mr-2 font-semibold">{type.toUpperCase()}:</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast; 