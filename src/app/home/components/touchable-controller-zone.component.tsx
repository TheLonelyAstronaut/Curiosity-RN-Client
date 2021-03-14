import React from 'react';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import { TouchableWrapper } from './styled/touchable-controller-zone.styled';
import { Animated, Dimensions } from 'react-native';

export type TouchableControllerZoneProps = {
    vertical: boolean;
    onValueChanged(value: number): void;
};

export type TouchableControllerZoneState = {
    timeout: boolean;
    width: number;
    height: number;
};

export class TouchableControllerZone extends React.Component<
    TouchableControllerZoneProps,
    TouchableControllerZoneState
> {
    private panXValue = new Animated.Value(0);
    private panYValue = new Animated.Value(0);
    private onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.panXValue, y: this.panYValue } }], {
        useNativeDriver: true,
    });

    constructor(props) {
        super(props);

        this.state = {
            timeout: false,
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').height,
        };
    }

    componentDidMount() {
        const setTimeoutClass = () =>
            this.setState({ timeout: true }, () => {
                setTimeout(() => this.setState({ timeout: false }), 200);
            });

        if (this.props.vertical) {
            this.panYValue.addListener(({ value }) => {
                if (!this.state.timeout) {
                    let calculatedPercentage = value / this.state.height;
                    calculatedPercentage =
                        calculatedPercentage > 1 ? 1 : calculatedPercentage < 0 ? 0 : calculatedPercentage;

                    this.props.onValueChanged(1 - calculatedPercentage);
                    setTimeoutClass();
                }
            });
        } else {
            this.panXValue.addListener(({ value }) => {
                if (!this.state.timeout) {
                    let calculatedPercentage = value / this.state.width;
                    calculatedPercentage =
                        calculatedPercentage > 1 ? 1 : calculatedPercentage < 0 ? 0 : calculatedPercentage;

                    this.props.onValueChanged(calculatedPercentage);
                    setTimeoutClass();
                }
            });
        }
    }

    handleStateChange = (event: PanGestureHandlerStateChangeEvent): void => {
        if (event.nativeEvent.state === State.END) {
            this.props.onValueChanged(0.5);
        }
    };

    render(): React.ReactNode {
        return (
            <PanGestureHandler
                onGestureEvent={this.onPanGestureEvent}
                onHandlerStateChange={this.handleStateChange}
                minDeltaX={0}
                minDeltaY={0}
            >
                <TouchableWrapper />
            </PanGestureHandler>
        );
    }
}
