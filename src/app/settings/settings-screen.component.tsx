import React from 'react';
import { SafeContainer } from '../common-ui/styled/containers.styled';

import { SettingsScreenNavigationProp, SettingsScreenRouteProp } from '../routing/navigation.params';
import { SettingsView } from './components/styled/settings-screen.styled';
import { FloatingButton } from '../common-ui/floating-button.component';

export type SettingsScreenProps = {
    navigation: SettingsScreenNavigationProp;
    route: SettingsScreenRouteProp;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = (props: SettingsScreenProps) => {
    const settingsAddress = React.useMemo(() => `http://${props.route.params.ip}:80`, [props.route]);

    const handleBackPress = React.useCallback(() => {
        props.navigation.goBack();
    }, [props.navigation]);

    return (
        <SafeContainer style={{ backgroundColor: 'black' }}>
            <SettingsView source={{ uri: settingsAddress }} />
            <FloatingButton onPress={handleBackPress} source={require('../../assets/down.png')} />
        </SafeContainer>
    );
};
