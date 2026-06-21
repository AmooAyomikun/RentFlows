import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import AppRouter from './routes/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'font-body',
          style: {
            background: '#2D2D2A',
            color: '#FFFFFF',
            border: 'none',
          }
        }} 
      />
    </QueryClientProvider>
  );
}

export default App;
