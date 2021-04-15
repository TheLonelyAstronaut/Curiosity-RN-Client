import React from 'react';
import { InputField, InputWrapper } from './styled/input.styled';

export type InputProps = {
    onChangeText(text: string): void;
    editable?: boolean;
};

export const Input: React.FC<InputProps> = (props: InputProps) => {
    return (
        <InputWrapper>
            <InputField
                placeholder={'IP Address'}
                placeholderTextColor={'#2d3436'}
                onChangeText={props.onChangeText}
                editable={props.editable}
            />
        </InputWrapper>
    );
};
