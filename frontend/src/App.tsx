import Header from './components/Header';
import Footer from './components/Footer';
import LocationList from './components/LocationList';

function App() {
  return (
    <div>
      <Header />
      <main>
        <LocationList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
