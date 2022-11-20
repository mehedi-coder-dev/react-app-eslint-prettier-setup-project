import {
  BrowserRouter,
  Routes,
  Route,

} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import PrivetRoute from './ProtectedRoute/PrivetRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={(
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
)}
          />
          <Route path="login" element={<PrivetRoute><Login /></PrivetRoute>} />
          <Route path="register" element={<PrivetRoute><Register /></PrivetRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
