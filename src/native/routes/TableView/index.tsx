import * as React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
var Dimensions = require('Dimensions');
const window = Dimensions.get("window");
// import PageScrollView from 'react-native-page-scrollview'
import PageScrollView from './PageScrollView'
import Video from 'react-native-video';
//http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_stereo_agmh.mp4
//http://techslides.com/demos/sample-videos/small.mp4
class TableView extends React.Component<any, any> {

    render() {
        let imgArr = [
            require('../../source/1.jpg'),
            require('../../source/2.jpg'),
            require('../../source/3.jpg')
        ];
        let videoArr = ['http://techslides.com/demos/sample-videos/small.mp4', 'http://www.w3school.com.cn/i/movie.mp4', 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4', 'http://flashmedia.eastday.com/newdate/news/2016-11/shznews1125-19.mp4','http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4']
        return (
            <PageScrollView
                style={{ width: window.width, height: window.height }}
                imageArr={videoArr}
                HorV="v"
                ifAutoScroll={false}
                ifShowPointerView={false}
            />
        )
    }
}

export default TableView;

const styles = StyleSheet.create({

})