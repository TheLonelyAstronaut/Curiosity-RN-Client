import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationParamsList } from './navigation.params';
import { InitializeScreen } from '../initialize/initialize-screen.component';
import { HomeScreen } from '../home/home-screen.component';
import { SettingsScreen } from '../settings/settings-screen.component';

const Stack = createStackNavigator<NavigationParamsList>();

export const NavigationComponent: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                mode={'modal'}
                screenOptions={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
                headerMode={'none'}
            >
                <Stack.Screen name={'Initialize'} component={InitializeScreen} />
                <Stack.Screen name={'Home'} component={HomeScreen} />
                {
                    //<Stack.Screen name={'Home'} component={HomeScreen} initialParams={{ ip: '192.168.0.19' }} />
                }
                <Stack.Screen name={'Settings'} component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
