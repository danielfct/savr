import React from "react";
import {spendings2018Chart} from "../../../variables/charts";

import CanvasJSReact from "../../../utils/canvasjs.react";

function ChartSection(props) {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    return (
        <CanvasJSChart options={props.chart.chart}
            /* onRef={ref => this.chart = ref} */
        />
    );
}

export default ChartSection;

