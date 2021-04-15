import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const InputWrapper = styled.View`
    padding-horizontal: 25px;
    padding-vertical: ${Platform.OS === 'ios' ? '12px' : '0px'};
    width: 80%;
    height: 45px;
    background-color: #dfe6e9;
    border-radius: 50px;
    margin-bottom: 30px;
`;

export const InputField = styled.TextInput`
    font-size: 14px;
    font-weight: 600;
    color: #2d3436;
`;
