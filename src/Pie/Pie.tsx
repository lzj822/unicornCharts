import React from 'react';

export interface PieProps {
    labels?: string[];
    series?: Array<string | number>;
    chart: chartProps;
}

interface chartProps {
    width?: number;
    height?: number;
    title?: string;
    type?: string;
    colors?: string[];
}

export const Pie: React.FC<PieProps> = (props) => {

    const { series, chart } = props;
    const { colors = ['blue', 'red', 'yellow', 'green']} = chart;
    const calcHandler = () => {
        let r = 50;
        const sum = series?.reduce((pre, cur) => Number(pre) + Number(cur), 0);
        let a = 100;
        const resultPath = series?.map((value, index) => {
            const proportion = Number(value) / (Number(sum) || 1);
            console.log("---------------")           
            const x = a + Math.sin(proportion * 2 * Math.PI) * r;
            const y = a - Math.cos(proportion * 2 * Math.PI) * r;
            console.log(y, x);
            // r = x;
            return (
                // <g transform={`translate(0,0)rotate(0)`}>
                    <path key={index} d={`M100 100 L100 50 A50 50 0 0 1 ${100 + x} ${100 + y}`} fill={colors[index]} />
                // </g>
            )
        })
      
        return resultPath;
    }

    // calcHandler();

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                {/* {calcHandler()} */}
                <path d="M100 100 L100 50 A50 50 0 0 1 118.06 53.38" fill="blue" />
                <path d="M100 100 L118.06 53.38 A50 50 0 0 1 113.12 136" fill="red" />
               {/*     <path d="M100 100 L100 150 A50 50 0 0 1 50 100" fill="yellow" />
                <path d="M100 100 L50 100 A50 50 0 0 1 100 50" fill="green" /> */}
            </svg>
        </div>
    )
}

export default Pie;