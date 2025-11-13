import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from './redux/store';
import AppContent from './AppContent';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <PaperProvider>
          <SafeAreaProvider>
            <AppContent /> {/* Main app content with navigation */}
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}