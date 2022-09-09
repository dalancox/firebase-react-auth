import Signup from './authentication/Signup';
import Dashboard from './Dashboard'
import Login from './authentication/Login'
import ForgotPassword from './authentication/ForgotPassword';
import UpdateProfile from './authentication/UpdateProfile';
import Explore from './Explore';
import AddStory from './AddStory';
import UserStories from './UserStories';
import SingleStory from './SingleStory';
import PageNotFound from './PageNotFound';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './authentication/PrivateRoute'

function App() {
  return (
        <>
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
                <Route path="/explore" element={
                  <PrivateRoute>
                    <Explore />
                  </PrivateRoute>
                }
                ></Route>
                <Route path="/u/:userId" element={
                  <PrivateRoute>
                    <UserStories />
                  </PrivateRoute>
                }
                ></Route>
                <Route path="/story/:storyId" element={
                  <PrivateRoute>
                    <SingleStory />
                  </PrivateRoute>
                }
                ></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </AuthProvider>
          </Router>
        </>
  )
}

export default App;
