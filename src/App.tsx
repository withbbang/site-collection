import React from 'react';
import Index from 'screens/index';
import NotFound from 'screens/notFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from 'screens/signUp';
import SignIn from 'screens/signIn';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign/up" element={<SignUp />} />
        <Route path="/sign/in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
