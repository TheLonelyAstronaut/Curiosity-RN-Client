import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const Streaming = styled(WebView)`
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #636e72;
`;

export const TouchableHandler = styled.View`
    height: 100%;
    width: 100%;
    position: absolute;
    flex-direction: row;
`;

export const VerticalSeparator = styled.View`
    width: 3px;
    background-color: black;
`;
