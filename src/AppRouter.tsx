import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;