import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type DefaultScreenParams = {
    ip: string;
};

export type NavigationParamsList = {
    Initialize: undefined;
    Home: DefaultScreenParams;
    Settings: DefaultScreenParams;
};

export type InitializeScreenNavigationProp = StackNavigationProp<NavigationParamsList, 'Initialize'>;
export type HomeScreenNavigationProp = StackNavigationProp<NavigationParamsList, 'Home'>;
export type SettingsScreenNavigationProp = StackNavigationProp<NavigationParamsList, 'Settings'>;

export type HomeScreenRouteProp = RouteProp<NavigationParamsList, 'Home'>;
export type SettingsScreenRouteProp = RouteProp<NavigationParamsList, 'Settings'>;
