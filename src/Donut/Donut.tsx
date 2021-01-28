import React, { FC } from 'react';
import { FULL_ANGLE } from '../utils/constants';
import { getPositionByAngle, roundedToNDecimals } from '../utils/helpers';

export interface DountProps {
    labels?: string[];
    series?: Array<string | number>
    chart: chartProps;
    outerRadius: number;
    innerRadius: number;
    clockWise?: boolean;
    startAngle?: number;
}

interface chartProps {
    width: number;
    height: number;
    title?: string;
    type?: string;
    colors?: string[];
}

export const Dount: FC<DountProps> = (props) => {

    const { chart, series, startAngle = 0, outerRadius, innerRadius, clockWise=true } = props;
    const  { colors = ['#00BBAD', '#FDC25B', '#FF5551', '#0F7EC1', '#9F3C74', '#324649'], width, height } = chart;

    const center = { x: width / 2, y: height / 2 };

    const calcHandler = () => {
        const sum = series?.reduce((pre, cur) => cur > 0 ? Number(pre) + Number(cur) : Number(pre), 0);

        const resultPath: React.SVGProps<SVGPathElement>[] = [];

        if (sum === 0) return [];

        const curAngle = startAngle;

        const radius = innerRadius + ((outerRadius - innerRadius) / 2);

        series?.reduce((pre, cur, index) => {

            const startAngle = pre.curAngle;

            const originDiffAngle = Number(cur) / Number(sum) * FULL_ANGLE;
            const endAngle = clockWise ? startAngle + originDiffAngle : startAngle - originDiffAngle;

            const stratPosition = getPositionByAngle(startAngle, radius);
            const endPosition = getPositionByAngle(endAngle, radius);

            const [arcStartX, arcStartY] = [roundedToNDecimals(center.x + stratPosition.x, 4), roundedToNDecimals(center.y - stratPosition.y, 4)];
            const [arcEndX, arcEndY] = [roundedToNDecimals(center.x + endPosition.x, 4), roundedToNDecimals(center.y - endPosition.y, 4)];

            const largeArc = originDiffAngle > 180 ? 1 : 0;

            resultPath.push(
                <path key={index} d={`
                    M${arcStartX} ${arcStartY}
                    A${radius} ${radius} 0 ${largeArc} ${clockWise ? 1 : 0} ${arcEndX} ${arcEndY}
                `}
                fill="none"
                stroke={colors[index]}
                strokeWidth={outerRadius-innerRadius}
                />
            )

            return { curAngle: endAngle }
        }, { curAngle });

        return resultPath;
    }

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"width={width} height={height}>
                {calcHandler()}
            </svg>
        </div>
    )
}