import * as React from 'react';
import * as PropTypes from 'prop-types';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'LineChart',
  propTypes: {
      isAnimation:PropTypes.bool,
      customStyle:PropTypes.shape({
          startColor:PropTypes.string,
          endColor:PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          lineWeight: PropTypes.number,
      }),
      yData: PropTypes.array,
      ...View.propTypes // 包含默认的View的属性
  },
};

const LineChartView = requireNativeComponent('LineChart', iface, {
  nativeOnly: { onSelect: true }
});

export default LineChartView;