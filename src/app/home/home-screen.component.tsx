import React, { useCallback, useEffect } from 'react';
import { SafeContainer } from '../common-ui/styled/containers.styled';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from '../routing/navigation.params';
import { socket } from '../../networking/socket';
import { Streaming, TouchableHandler } from './components/styled/home-screen.styled';
import WebView from 'react-native-webview';
import { FloatingButton } from '../common-ui/floating-button.component';
import { TouchableControllerZone } from './components/touchable-controller-zone.component';
import { generateEngineEvent, generateRotationEvent, ON_ERROR } from '../../networking/events';
import { accelerometer } from 'react-native-sensors';
import { Platform } from 'react-native';

export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};

export const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const webView = React.useRef<WebView>();
    const streamingSource = React.useMemo(() => `http://${props.route.params.ip}:81/stream`, [props.route]);
    const [enginePercentage, setEnginePercentage] = React.useState<number>(0.5);

    const injectedJS = React.useMemo(
        () =>
            `(function() {
                document.body.innerHTML += '<img src="${streamingSource}" style="height: 100%; width: 100%; object-fit: contain"/>';
            })();`,
        [streamingSource]
    );

    const handleSettingsPress = useCallback(() => {
        props.navigation.navigate('Settings', {
            ip: props.route.params.ip,
        });
    }, [props.navigation, props.route.params.ip]);

    useEffect(() => {
        const subscription = accelerometer.subscribe(({ y }) => {
            const maxValue = Platform.OS === 'ios' ? 1 : 10;
            const mappedValue = y / maxValue;
            const result = (mappedValue < -0.5 ? -0.5 : mappedValue > 0.5 ? 0.5 : mappedValue) + 0.5;
            socket.emit(generateRotationEvent(result));
        });

        socket.addHandler(ON_ERROR, () => {
            props.navigation.goBack();
            alert('Connection lost!');
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [props.navigation]);

    useEffect(() => {
        socket.emit(generateEngineEvent(enginePercentage));
    }, [enginePercentage]);

    return (
        <SafeContainer>
            <Streaming
                source={
                    Platform.OS === 'ios'
                        ? require('./components/home-background.html')
                        : { uri: 'file:///android_asset/home-background.html' }
                }
                ref={(ref) => (webView.current = ref as WebView | undefined)}
                javaScriptEnabled={true}
                injectedJavaScript={injectedJS}
                onMessage={(data) => {
                    console.log(data);
                }}
            />
            <TouchableHandler>
                <TouchableControllerZone vertical={true} onValueChanged={setEnginePercentage} />
            </TouchableHandler>
            <FloatingButton onPress={handleSettingsPress} source={require('../../assets/settings.png')} />
        </SafeContainer>
    );
};
