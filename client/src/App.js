import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AgentConfigurator from './components/AgentConfigurator';
import ResultsView from './components/ResultsView';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'agents', element: <AgentConfigurator /> },
      { path: 'results', element: <ResultsView /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
