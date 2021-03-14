import React, { useCallback, useEffect } from 'react';
import { SafeContainer } from '../common-ui/styled/containers.styled';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from '../routing/navigation.params';
import { socket } from '../../networking/socket';
import { Streaming, TouchableHandler, VerticalSeparator } from './components/styled/home-screen.styled';
import WebView from 'react-native-webview';
import { FloatingButton } from '../common-ui/floating-button.component';
import { TouchableControllerZone } from './components/touchable-controller-zone.component';
import {generateEngineEvent, generateRotationEvent} from "../../networking/events";

export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};

export const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const webView = React.useRef<WebView>();
    const streamingSource = React.useMemo(() => `http://${props.route.params.ip}:81/stream`, [props.route]);
    const [rotatePercentage, setRotatePercentage] = React.useState<number>(0.5);
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
        return () => {
            //socket.close();
        };
    }, []);

    useEffect(() => {
        socket.emit(generateEngineEvent(enginePercentage));
        socket.emit(generateRotationEvent(rotatePercentage));
    }, [enginePercentage, rotatePercentage]);

    return (
        <SafeContainer>
            <Streaming
                source={require('./components/home-background.html')}
                ref={(ref) => (webView.current = ref as WebView | undefined)}
                javaScriptEnabled={true}
                injectedJavaScript={injectedJS}
                onMessage={(data) => {
                    console.log(data);
                }}
            />
            <TouchableHandler>
                <TouchableControllerZone vertical={false} onValueChanged={setRotatePercentage} />
                <VerticalSeparator />
                <TouchableControllerZone vertical={true} onValueChanged={setEnginePercentage} />
            </TouchableHandler>
            <FloatingButton onPress={handleSettingsPress} source={require('../../assets/settings.png')} />
        </SafeContainer>
    );
};
