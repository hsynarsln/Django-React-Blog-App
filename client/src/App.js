import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/userAction';
import AppRouter from './router/AppRouter';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
