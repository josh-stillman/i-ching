import PWABadge from './PWABadge.tsx';
import './App.css';
import IChingPage from './components/IChingPage/IChingPage.tsx';

function App() {
  return (
    <div className="app-wrapper">
      <IChingPage />
      <PWABadge />
    </div>
  );
}

export default App;
