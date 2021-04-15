import React from 'react';
import { NextButtonWrapper, TextWrapper } from './styled/next-button.styled';
import { ActivityIndicator } from 'react-native';

export type NextButtonProps = {
    onPress(): void;
    isLoading?: boolean;
    title: string;
};

export const NextButton: React.FC<NextButtonProps> = (props: NextButtonProps) => (
    <NextButtonWrapper onPress={props.onPress} disabled={props.isLoading}>
        {props.isLoading ? <ActivityIndicator size={'small'} /> : <TextWrapper>{props.title}</TextWrapper>}
    </NextButtonWrapper>
);
