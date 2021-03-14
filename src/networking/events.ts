export const ON_CONNECT = 'connect';
export const ON_ERROR = 'error';
const ROTATE = 'servo_rotate';
const ENGINE = 'engine_move';

export const generateRotationEvent = (angle: number) => `${ROTATE} ${angle.toString()}`;
export const generateEngineEvent = (speed: number) => `${ENGINE} ${speed.toString()}`;
