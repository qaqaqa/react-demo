import * as React from 'react'

type CoinLineChartComponent = React.Component<any, any>;

export const CoinLineChart: () => CoinLineChartComponent = require("./Chart").default;

export default CoinLineChart;