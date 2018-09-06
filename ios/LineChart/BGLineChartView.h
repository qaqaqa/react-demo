//
//  BGLineChartView.h
//  Hicoin
//
//  Created by sparxo-dev-ios-1 on 2017/10/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "LineChartView.h"


@interface BGLineChartView : UIView

@property (strong, nonatomic)LineChartView *lineChartView;

@property (assign, nonatomic)BOOL isAnimation;
@property (copy, nonatomic)NSDictionary *customStyle;
@property (copy, nonatomic)NSArray *yData;

@end
