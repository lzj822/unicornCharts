import React from 'react';
import { FULL_ANGLE } from '../utils/constants';
import { getPositionByAngle } from '../utils/helpers';

export interface PieProps {
    labels?: string[];
    series?: Array<string | number>;
    chart: chartProps;
    radius: number;
    clockWise?: boolean;
    startAngle?: number;
}

interface chartProps {
    width?: number;
    height?: number;
    title?: string;
    type?: string;
    colors?: string[];
}

export const Pie: React.FC<PieProps> = (props) => {

    const { series, chart, radius, clockWise = true, startAngle = 0 } = props;
    const { colors = ['#00BBAD', '#FDC25B', '#FF5551', '#0F7EC1', '#9F3C74', '#324649']} = chart;
    
    const calcHandler = () => {
        const sum = series?.reduce((pre, cur) => cur > 0 ? Number(pre) + Number(cur) : pre, 0);
        const resultPath: any[] = [];
        
        if (sum === 0) {
            return resultPath;
        }

        const curAngle = startAngle;

        series?.reduce((pre, cur, index) => {

            const originDiffAngle = Number(cur) / Number(sum) * FULL_ANGLE;

            const startAngle = pre.curAngle;
            const endAngle = clockWise ? startAngle + originDiffAngle : startAngle - originDiffAngle;

            const stratPosition = getPositionByAngle(startAngle, radius);
            const endPosistion = getPositionByAngle(endAngle, radius);

            const [arcStartX, arcStartY] = [100 + stratPosition.x, 100 - stratPosition.y];
            const [arcEndX, arcEndY] = [100 + endPosistion.x, 100 - endPosistion.y];
            const largeArc = originDiffAngle > 180 ? 1: 0;

            resultPath.push(
                <path key={index} d={`M100 100 L${arcStartX} ${arcStartY} A${radius} ${radius} 0 ${largeArc} ${clockWise ? 1 : 0} ${arcEndX} ${arcEndY} z`} fill={colors[index]}/>
            )

            return { curAngle: endAngle, stratPosition }

        }, { curAngle })

        return resultPath;
    }

    // calcHandler();

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                {calcHandler()}
            </svg>
        </div>
    )
}

export default Pie;