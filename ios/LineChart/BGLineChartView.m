//
//  BGLineChartView.m
//  Hicoin
//
//  Created by sparxo-dev-ios-1 on 2017/10/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BGLineChartView.h"
#define kStringIsEmpty(str)     ([str isKindOfClass:[NSNull class]] || str == nil || [str length] < 1 ? YES : NO )

@implementation BGLineChartView

- (instancetype) initWithFrame:(CGRect)frame{
  if ((self = [super initWithFrame:frame])) {
    self.lineChartView = [LineChartView initWithFrame:CGRectZero];
      }
  return self;
}

- (void)setIsAnimation:(BOOL)isAnimation
{
  _isAnimation = isAnimation;
  [self reloadLineChart];
}

- (void)setCustomStyle:(NSDictionary *)customStyle
{
  _customStyle = customStyle;
  [self reloadLineChart];
}

- (void)setYData:(NSArray *)yData
{
  _yData = yData;
  [self reloadLineChart];
}

- (void)reloadLineChart{
  [self.lineChartView removeFromSuperview];
  self.lineChartView = [LineChartView initWithFrame:CGRectMake(0, 0, [[self.customStyle objectForKey:@"width"] floatValue],[[self.customStyle objectForKey:@"height"] floatValue])];
  [self addSubview:self.lineChartView];
  [self drawLineChart];
}

-(void)drawLineChart{
  if (self.yData.count>0) {
    [self.lineChartView yData:self.yData LineType:LineType_Curve customStyle:self.customStyle isAnimation:self.isAnimation];
  }
}


@end
