import Signup from './Signup';
import Dashboard from './Dashboard'
import Login from './Login'
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import AddStory from './AddStory';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'

function App() {
  return (
        <div>
          <Router>
            <AuthProvider>
              <Routes>
              <Route exact path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
                ></Route>
                <Route path="/update-profile" element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
                ></Route>
                <Route path="/add-story" element={
                  <PrivateRoute>
                    <AddStory />
                  </PrivateRoute>
                }
                ></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
  )
}

export default App;
