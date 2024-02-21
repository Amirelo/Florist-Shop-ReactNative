import React from 'react';
import AppNavigation from './src/screens/AppNavigation';
import {Provider} from 'react-redux';
import {persistore, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {CustomText} from './src/components/atoms';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<CustomText>Loading</CustomText>}
        persistor={persistore}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
