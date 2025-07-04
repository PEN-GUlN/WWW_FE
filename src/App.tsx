// import { Toaster } from '@/components/ui/toaster';
import Toaster from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Jobs from './pages/Job/Jobs';
import JobDetail from './pages/Job/JobDetail';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Signup from './pages/Signup';

import { AuthProvider } from '@/lib/AuthContext';
import MyPage from './pages/MyPage';
import Community from './pages/Community/Community';
import CommunityPostDetail from './pages/Community/CommunityPostDetail';
import CommunityWrite from './pages/Community/CommunityWrite';

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityPostDetail />} />
            <Route path="/community/write" element={<CommunityWrite />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
