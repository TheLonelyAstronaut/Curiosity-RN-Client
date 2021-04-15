import React from 'react';
import { NavigationComponent } from './app/routing/navigation.component';
import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 100);

const App: React.FC = () => <NavigationComponent />;

export default App;
