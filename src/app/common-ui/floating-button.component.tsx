import React from 'react';
import { FloatingButtonWrapper, Icon } from './styled/floating-button.styled';
import { ImageSourcePropType } from 'react-native';

export type FloatingButtonProps = {
    onPress(): void;
    source: ImageSourcePropType;
};

export const FloatingButton: React.FC<FloatingButtonProps> = (props: FloatingButtonProps) => (
    <FloatingButtonWrapper onPress={props.onPress}>
        <Icon source={props.source} resizeMode={'contain'} />
    </FloatingButtonWrapper>
);
