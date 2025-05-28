import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast from '../components/Toast';

interface ToastMessage {
  id: number;
  message: string;
  type: 'error' | 'info' | 'debug';
}

interface DebugContextType {
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showDebug: (message: string) => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
};

interface DebugProviderProps {
  children: ReactNode;
}

export const DebugProvider = ({ children }: DebugProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'error' | 'info' | 'debug') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showError = useCallback((message: string) => {
    console.error(message);
    addToast(message, 'error');
  }, [addToast]);

  const showInfo = useCallback((message: string) => {
    console.info(message);
    addToast(message, 'info');
  }, [addToast]);

  const showDebug = useCallback((message: string) => {
    console.debug(message);
    addToast(message, 'debug');
  }, [addToast]);

  return (
    <DebugContext.Provider value={{ showError, showInfo, showDebug }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </DebugContext.Provider>
  );
}; 