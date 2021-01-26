import { ANGLE_RATIO } from "../constants";

export const getPositionByAngle = (angle: number, radius: number): { x: number, y: number } => {
	return {
		x: Math.sin(angle * ANGLE_RATIO) * radius,
		y: Math.cos(angle * ANGLE_RATIO) * radius,
	};
}


export const roundedToNDecimals = (number: number, n: number) => {
    const temp = Math.pow(10, n);
    return Math.floor(number * temp) / temp;
}