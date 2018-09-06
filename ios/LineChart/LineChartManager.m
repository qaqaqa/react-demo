//
//  LineChartManager.m
//  Hicoin
//
//  Created by sparxo-dev-ios-1 on 2017/10/30.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LineChartManager.h"
#import "BGLineChartView.h"


@implementation LineChart
//RCT_EXPORT_MODULE()
//RCT_EXPORT_METHOD(方法名称:(类型)参数名) {实现方法}
//RCT_EXPORT_METHOD(方法名:(RCTResponseSenderBlock)callback) {callback(@[返回值]);}
//RCT_EXPORT_VIEW_PROPERTY(属性名, 类型)

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(isAnimation, BOOL)
RCT_EXPORT_VIEW_PROPERTY(customStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(yData,NSArray)

- (UIView *)view
{
  BGLineChartView *bgView = [[BGLineChartView alloc] init];
  bgView.frame = CGRectZero;
  return bgView;
}

@end
