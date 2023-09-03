import AutoAuthorization from 'components/features/AutoAuthorization/AutoAuthorization';
import Header from 'components/layouts/Header/Header';
import MainRoutes from 'components/layouts/MainRoutes/MainRoutes';
import ScrollTop from 'components/features/ScrollTop/ScrollTop';

function App() {
  return (
    <AutoAuthorization>
      <Header />
      <MainRoutes />
      <ScrollTop />
    </AutoAuthorization>
  );
}

export default App;
