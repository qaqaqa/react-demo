import * as React from 'react';
import { StyleSheet } from 'react-native';
import LineChartView from './LineChartView';
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

export default class CombineLineChartView extends React.Component<any, any> {
    render() {

        var { product, type } = this.props;

        var upCurveColor = {
            start: "#6555fa",
            end: "#d36ff0"
        }
        var downCurveColor = {
            start: "#fdbd96",
            end: "#ee4db7"
        }
        var data = [20,50,12,20,50,12,20,50,12,20,50,12,20,50,12,20,50,12,20,50,12,50,12,20,50,12];
        return (
                <LineChartView style={styles.chartView}
                    isAnimation={false}
                    customStyle={{
                        startColor: upCurveColor.start,
                        endColor:downCurveColor.end,
                        width: width-50,
                        height: 180,
                        lineWeight:2,
                    }}
                    yData={data} />
            );
        }
}

const styles = StyleSheet.create({
    chartView: {
        height: 180,
    },
});