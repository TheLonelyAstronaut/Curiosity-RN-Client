import React from 'react';
import { InputField, InputWrapper } from './styled/input.styled';

export type InputProps = {
    onChangeText(text: string): void;
    editable?: boolean;
    value: string;
};

export const Input: React.FC<InputProps> = (props: InputProps) => {
    return (
        <InputWrapper>
            <InputField
                value={props.value}
                placeholder={'IP Address'}
                placeholderTextColor={'#2d3436'}
                onChangeText={props.onChangeText}
                editable={props.editable}
            />
        </InputWrapper>
    );
};
