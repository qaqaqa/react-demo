//
//  LineChartView.m
//  Sparxo-Chart
//
//  Created by sparxo-dev-ios-1 on 2017/10/27.
//  Copyright © 2017年 sparxo-dev-ios-1. All rights reserved.
//

#import "LineChartView.h"
#import "UIColor+ColorChange.h"

static CGRect myFrame;

@interface LineChartView ()

@property (nonatomic, strong) UIView *gradientBackgroundView;


@end


@implementation LineChartView


//初始化画布
+(instancetype)initWithFrame:(CGRect)frame{
  
  LineChartView *lineChartView = [[LineChartView alloc] init];
  lineChartView.frame = frame;
  
  //背景视图
  UIView *backView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
  [lineChartView addSubview:backView];
  
  myFrame = frame;
  return lineChartView;
}

/**
 *  画折线图
 */

-(void) yData:(NSArray *)yData LineType:(LineType) lineType customStyle:(NSDictionary *)customStyle isAnimation:(Boolean)isAnimation
{
  NSString *jsheight = [customStyle objectForKey:@"height"];
  NSString *jswidth = [customStyle objectForKey:@"width"];
  NSArray *targetValues = yData;
  jsheight = [NSString stringWithFormat:@"%f",[jsheight floatValue]-5];
  float xx = 0;
  if ([targetValues count]>0) {
    xx = [jswidth floatValue]/([targetValues count]-1);
  }
   [self drawGradientBackgroundView_startColor:[customStyle objectForKey:@"startColor"] endColor:[customStyle objectForKey:@"endColor"]];
  
  NSMutableArray *allPoints = [NSMutableArray array];
  
  float max = [[targetValues valueForKeyPath:@"@max.floatValue"] floatValue];
  float dou = ([jsheight floatValue])/max;
  float min = [[targetValues valueForKeyPath:@"@min.floatValue"] floatValue];
  float minDou = min*dou;
  float maxx = 1;
  if (((max*dou)-minDou) > 0) {
    maxx = ([jsheight floatValue])/((max*dou)-minDou);
  }
  //数组去重，如果是数据呈一条直线，则Y居中
  NSSet *set = [NSSet setWithArray:targetValues];
  for (int i=0; i<targetValues.count; i++) {
    CGFloat doubleValue;
    doubleValue = (([targetValues[i] floatValue]*dou)-minDou)*maxx;
    CGFloat X = xx*i;
    CGFloat Y = [set allObjects].count == 1 ? CGRectGetHeight(myFrame)/2 : CGRectGetHeight(myFrame)-doubleValue-2;
    CGPoint point = CGPointMake(X,Y);
    if (isnan(point.y)) {
      point.y = 1;
    }
    if (isnan(point.x)) {
      point.x = 1;
    }
    UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(point.x-1, point.y-1, 0, 0) cornerRadius:3];
    path.lineCapStyle = kCGLineCapRound; //线条拐角
    path.lineJoinStyle = kCGLineJoinRound;
    CAShapeLayer *layer = [CAShapeLayer layer];
    layer.strokeColor = [UIColor purpleColor].CGColor;
    layer.fillColor = [UIColor purpleColor].CGColor;
    layer.path = path.CGPath;
    [self.subviews[0].layer addSublayer:layer];
    
    [allPoints addObject:[NSValue valueWithCGPoint:point]];
  }
  
  //3.坐标连线
  if (allPoints.count>0) {
    UIBezierPath *path = [UIBezierPath bezierPath];
    path.lineCapStyle = kCGLineCapRound; //线条拐角
    path.lineJoinStyle = kCGLineJoinRound;
    [path moveToPoint:[allPoints[0] CGPointValue]];
    CGPoint PrePonit;
    switch (lineType) {
      case LineType_Straight: //直线
        for (int i =1; i<allPoints.count; i++) {
          CGPoint point = [allPoints[i] CGPointValue];
          [path addLineToPoint:point];
        }
        break;
      case LineType_Curve:   //曲线
        for (int i =0; i<allPoints.count; i++) {
          if (i==0) {
            PrePonit = [allPoints[0] CGPointValue];
          }
          else{
            CGPoint NowPoint = [allPoints[i] CGPointValue];
            if (isnan(NowPoint.y)) {
              NowPoint.y = 1;
            }
            if (isnan(NowPoint.x)) {
              NowPoint.x = 1;
            }
            [path addCurveToPoint:NowPoint controlPoint1:CGPointMake((PrePonit.x+NowPoint.x)/2, PrePonit.y) controlPoint2:CGPointMake((PrePonit.x+NowPoint.x)/2, NowPoint.y)]; //三次曲线
            PrePonit = NowPoint;
          }
        }
        break;
    }
    CAShapeLayer *shapeLayer = [CAShapeLayer layer];
    shapeLayer.path = path.CGPath;
    shapeLayer.strokeColor = [UIColor whiteColor].CGColor;
    shapeLayer.fillColor = [UIColor clearColor].CGColor;
    shapeLayer.lineWidth = [[customStyle objectForKey:@"lineWeight"] integerValue];
    if (isAnimation == 1) {
      CABasicAnimation *pathAnimation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
      pathAnimation.removedOnCompletion = NO;
      pathAnimation.duration = 0.5;
      pathAnimation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionLinear];
      pathAnimation.fromValue = [NSNumber numberWithFloat:0.0f];
      pathAnimation.toValue = [NSNumber numberWithFloat:1.0f];
      pathAnimation.autoreverses = NO;
      shapeLayer.strokeStart = 0.0;
      shapeLayer.strokeEnd = 1.0;
      [shapeLayer addAnimation:pathAnimation forKey:@"strokeEndAnimation"];
    }
    self.gradientBackgroundView.layer.mask = shapeLayer;
  }
}

- (void)drawGradientBackgroundView_startColor:(NSString *) startColor endColor:(NSString *)endColor {
  // 渐变背景视图（不包含坐标轴）
  self.gradientBackgroundView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
  [self addSubview:self.gradientBackgroundView];
  /** 创建并设置渐变背景图层 */
  //初始化CAGradientlayer对象，使它的大小为渐变背景视图的大小
  CAGradientLayer *gradientLayer = [CAGradientLayer layer];
  gradientLayer.frame = self.gradientBackgroundView.bounds;
  //设置渐变区域的起始和终止位置（范围为0-1），即渐变路径
  gradientLayer.startPoint = CGPointMake(0, 0.0);
  gradientLayer.endPoint = CGPointMake(1.0, 0.0);
  //设置颜色的渐变过程
  gradientLayer.colors = [NSMutableArray arrayWithArray:@[(__bridge id)[UIColor colorWithHexString:startColor].CGColor, (__bridge id)[UIColor colorWithHexString:endColor].CGColor]];
  [self.gradientBackgroundView.layer addSublayer:gradientLayer];
}

@end
