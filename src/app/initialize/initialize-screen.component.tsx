import React, { useCallback } from 'react';
import { Container } from '../common-ui/styled/containers.styled';
import { InitializeScreenNavigationProp } from '../routing/navigation.params';
import { NextButton } from './components/next-button.component';
import { Input } from './components/input.component';
import { socket } from '../../networking/socket';
import { ON_CONNECT, ON_ERROR } from '../../networking/events';

export type InitializeScreenProps = {
    navigation: InitializeScreenNavigationProp;
};

export const InitializeScreen: React.FC<InitializeScreenProps> = (props: InitializeScreenProps) => {
    const [IP, setIP] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleConnectPress = useCallback(
        (ip?: string) => {
            const _ip = ip ? ip : IP;

            socket.connect(`ws://${_ip}:82/ws`);

            setIsLoading(true);

            socket.addHandler(ON_CONNECT, () => {
                setIsLoading(false);

                props.navigation.navigate('Home', {
                    ip: _ip,
                });
            });

            socket.addHandler(ON_ERROR, () => {
                setIsLoading(false);
                alert('Unable to connect to the server!');

                socket.close();
            });
        },
        [props, IP]
    );

    return (
        <Container>
            <Input onChangeText={setIP} editable={!isLoading} value={IP} />
            <NextButton onPress={handleConnectPress} isLoading={isLoading} title={'Connect'} />
            <NextButton
                onPress={() => {
                    const ip = '192.168.4.1';
                    setIP(ip);
                    handleConnectPress(ip);
                }}
                isLoading={false}
                title={'Use Default IP'}
            />
        </Container>
    );
};
