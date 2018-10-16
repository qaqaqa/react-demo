import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
var Dimensions = require('Dimensions');
const window = Dimensions.get("window");
const cheerio = require('cheerio-without-node-native');
import PageScrollView from './PageScrollView'
import ui from '../../../stores/ui'
import { observer } from 'mobx-react';

@observer
class TableView extends React.Component<any, any> {

    urls = [];
    imageUrls = [];
    pageArr = [1];
    state = {
        videoArr: [],
        imageArr: []
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

    componentDidUpdate() {
        //     let videoArr = this.state.videoArr;
        //     if (videoArr.length - ui.currentPage == 6) {
        //         var pageIndex = Math.ceil(videoArr.length / 20);
        //         if (this.pageArr.indexOf(pageIndex) == -1) {
        //             this.getVideoData(pageIndex);
        //             this.pageArr.push(pageIndex);
        //         }
        //     }
        //     this.data = [];
        //     if (videoArr.length >= 3) {
        //         for (let index = 0; index < 3; index++) {
        //             if (ui.currentPage == 0) {
        //                 // this.data.splice(index, 1,videoArr[ui.currentPage+index]);
        //                 this.data.push(videoArr[ui.currentPage + index]);
        //             }
        //             else {
        //                 // this.data.splice(index, 1, videoArr[ui.currentPage + index - 1]);
        //                 this.data.push(videoArr[ui.currentPage + index - 1]);
        //             }
        //         }
        //     }



        if (this.videoDatas.length - ui.currentPage == 6) {
            var pageIndex = Math.ceil(this.videoDatas.length / 20);
            if (this.pageArr.indexOf(pageIndex) == -1) {
                this.getVideoData(pageIndex);
                this.pageArr.push(pageIndex);
            }
        }

        if (this.state.videoArr.length >= 3) {
            if (ui.currentPage >= 3) {
                this.videoDatas = this.state.videoArr.slice(ui.currentPage-3, ui.currentPage + 2)
                this.imageDatas = this.state.imageArr.slice(ui.currentPage-3, ui.currentPage + 2)
            }
        }

        console.log('update:',this.videoDatas);
    }

    render() {

        if (this.state.videoArr.length >= 3) {
            if (ui.currentPage < 3) {
                this.videoDatas = this.state.videoArr.slice(ui.currentPage, ui.currentPage + 5)
                this.imageDatas = this.state.imageArr.slice(ui.currentPage, ui.currentPage + 5)
            }
            console.log('render:',this.videoDatas);
            return (
                <PageScrollView
                    style={{ width: window.width, height: window.height }}
                    imageArr={this.videoDatas}
                    videoArr={this.videoDatas}
                    HorV="v"
                    ifAutoScroll={false}
                    ifShowPointerView={false}
                />
            )
        } else {
            return <Text style={{ alignSelf: 'center', margin: 200, width: window.width, textAlign: 'center' }}>没得数据！！！</Text>;
        }

    }
}

export default TableView;

const styles = StyleSheet.create({

})