import * as React from 'react';
import { FlatList, StyleSheet, Image, Text, View } from 'react-native';
var Dimensions = require('Dimensions');
const window = Dimensions.get("window");
const cheerio = require('cheerio-without-node-native');
import PageScrollView from './PageScrollView'
import ui from '../../../stores/ui'
import { observer } from 'mobx-react';
import Video from 'react-native-video'

@observer
class TableView extends React.Component<any, any> {
    _flatList;
    urls = [];
    imageUrls = [];
    pageArr = [1];
    state = {
        videoArr: [],
        imageArr: [],
        currentPage: 0
    }

    videoDatas = [];
    imageDatas = [];

    async getVideoData(pageIndex) {
        const response = await fetch('http://www.aipai.com/ext/syPcZone_action-card_appid-11616_id-301740_total-472_page-' + pageIndex + '.html')
        console.log('http 请求：', 'http://www.aipai.com/ext/syPcZone_action-card_appid-11616_id-301740_total-472_page-' + pageIndex + '.html');
        var res = await response.text();
        const $ = cheerio.load(res);

        let video_list = $(".video_list h5 a")
        let image_list = $(".video_list img")

        for (var link of video_list) {

            res = await fetch('https://api.berryapi.net/get/video?AppKey=ZnOvtKaf4s&url=' + $(link).attr('href'))
                .then((response) => response.json())
                .then((responseJson) => {
                    return responseJson.url;
                })
                .catch((error) => {
                    console.error(error);
                });

            var url = await res;
            if (this.urls.indexOf(url) == -1) {
                this.urls.push(url)
            }


        }

        for (var link of image_list) {
            this.imageUrls.push($(link).attr('src'))
        }

        this.setState({
            videoArr: this.urls,
            imageArr: this.imageUrls
        });
    }

    componentWillMount() {
        this.getVideoData(1);
    }
    _onscroll(event) {
        let nativeEvent = event.nativeEvent;
        let offsetY = nativeEvent.contentOffset.y;
        this.setState({
            currentPage: Math.round(offsetY / window.height)
        })
        console.log('当前页数： ', this.state.currentPage)
        if (this.state.videoArr.length - this.state.currentPage == 6) {
            var pageIndex = Math.ceil(this.state.videoArr.length / 20);
            if (this.pageArr.indexOf(pageIndex) == -1) {
                this.getVideoData(pageIndex);
                this.pageArr.push(pageIndex);
            }
        }
        this._flatList && this._flatList.scrollToIndex({ viewPosition: 0, index: Math.round(offsetY / window.height) });
    }

    _renderItem = (entry, index) => {
        var videoView = null;
        if (this.state.currentPage == entry.index || entry.index == this.state.currentPage+1 || entry.index == this.state.currentPage-1) {
            videoView = <Video
                source={{ uri: entry.item }}
                resizeMode='cover'
                volume={1}
                repeat={true}
                paused={this.state.currentPage == entry.index ? false : true}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }} />
        }
        return <View style={{ width: window.width, height: window.height }}>
            {videoView}
        </View>
    }

    render() {

        let currentPage = this.state.currentPage;
        if (this.state.videoArr.length >= 3) {
            return (
                <View>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        style={{ width: window.width, height: window.height }}
                        onScrollEndDrag={this._onscroll.bind(this)}
                        renderItem={this._renderItem}
                        data={[...this.state.videoArr]}>
                    </FlatList>
                </View>

            )
        } else {
            return <Text style={{ alignSelf: 'center', margin: 200, width: window.width, textAlign: 'center' }}>没得数据！！！</Text>;
        }

    }
}

export default TableView;

const styles = StyleSheet.create({

})