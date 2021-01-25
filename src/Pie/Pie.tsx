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

        // let proportion = 0;

        const resultPath: any[] = [];

        series?.reduce((pre, cur, index) => {

            const proportion = Number(cur) / (Number(sum) || 1) + pre.proportion;

            const x = 100 + Math.sin(proportion * 2 * Math.PI) * r;
            const y = 100 - Math.cos(proportion * 2 * Math.PI) * r;

            console.log(proportion, x, y);
            console.log('------------------------');
            console.log(pre.startPoint.x, pre.startPoint.y);

            resultPath.push(
                <path key={index} d={`M100 100 L${pre.startPoint.x} ${pre.startPoint.y} A50 50 0 ${360*(proportion - pre.proportion) > 180 ?  1:0} 1 ${x} ${y}`} fill={colors[index]} />
            )

            return { proportion, startPoint: { x, y } }

        }, { proportion: 0, startPoint: {x: 100, y: 50 }})

        // series?.map((value, index) => {
        //     proportion += Number(value) / (Number(sum) || 1);
        //     console.log("---------------")           
        //     const x = Math.sin(proportion * 2 * Math.PI) * r;
        //     const y = Math.cos(proportion * 2 * Math.PI) * r;
        //     console.log(proportion)
        //     console.log(x, y);
        //     // r = x;
        //     return (
        //         // <g transform={`translate(0,0)rotate(0)`}>
        //             <path key={index} d={`M100 100 L100 50 A50 50 0 0 1 ${x} ${y}`} fill={colors[index]} />
        //         // </g>
        //     )
        // })
        console.log(resultPath)
        return resultPath;
    }

    // calcHandler();

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                {calcHandler()}
                 {/* <path d="M100 100 L100 50 A50 50 0 0 1 118.06 53.38" fill="blue" />
                <path d="M100 100 L118.06 53.38 A50 50 0 0 1 139.90086136401197 130.1317318189628" fill="red" />
                <path d="M100 100 L139.90086136401197 130.1317318189628 A50 50 0 0 1 55.24183543224687 77.71308221117312" fill="yellow" />
               <path d="M100 100 L55.24183543224687 77.71308221117312 A50 50 0 0 1 100 50" fill="green" /> */}
            </svg>
        </div>
    )
}

export default Pie;