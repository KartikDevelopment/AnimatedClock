import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';
import { AngleToTime, describeArc, getAngleFromCordinate, getArcX, getArcY, getChangeInAngle, getEllipsePath } from './utils';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, { G, Circle,Text, Rect, Path } from 'react-native-svg';
import Animated, { Easing } from "react-native-reanimated";

const { interpolate, multiply } = Animated;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('window');

export default function Donut({
  endAngle=200,
  startAngle = 0,
  radius = 100,
  strokeWidth = 30,
  duration = 500,
  color = "tomato",
  colorDull = '#808080',
  delay = 0,
  textColor,
  max = 100
}) {
  const [angle,setAngle] = React.useState(endAngle)
  const [start,setstartAngle] = React.useState(startAngle)
  const [startCord,setCord] = React.useState({x:0,y:0});
  const [BedTime,setBedTime] =  React.useState(AngleToTime(startAngle))
  const [WakeTime,setWakeTime] =  React.useState(AngleToTime(endAngle))
 
  let tempStart = startAngle;
  let tempEnd = endAngle
  const [colorCode,setColor] = React.useState(color);
  const WhiteText = ({text="",cx = width/2,cy=height/2})=>{
    return(
        <Text stroke={"white"}  fill="white" x={cx}  fontSize="15"
          fontWeight="bold" y={cy}  textAnchor="middle">
            {text}
          </Text>
    )
  }
  const gesture = Gesture.Pan().runOnJS(true)
    .onChange(({translationX, translationY, absoluteX,absoluteY}) => {
     // console.log(translationX+'/'+translationY+'/'+absoluteX+'/'+absoluteY)
     // console.log(getAngleFromCordinate(width/2,absoluteX,height/2,absoluteY))
      setAngle(getAngleFromCordinate(width/2,absoluteX,height/2,absoluteY))
    })
    .onEnd(() => {
      
    });
    const gestureStart = Gesture.Pan().runOnJS(true)
    .onChange(({translationX, translationY, absoluteX,absoluteY}) => {
     // console.log(translationX+'/'+translationY+'/'+absoluteX+'/'+absoluteY)
     // console.log(getAngleFromCordinate(width/2,absoluteX,height/2,absoluteY))
      setstartAngle(getAngleFromCordinate(width/2,absoluteX,height/2,absoluteY))
    })
    .onEnd(() => {
      
    });
    
    const gestureMove = Gesture.Pan().runOnJS(true).onStart(
      ({x,y,absoluteX,absoluteY})=>{
        tempStart = start;
        setCord({x:absoluteX,y:absoluteY})
        tempEnd = angle
    })//IS DISABLED BECAUSE OF OPTIMIZATION ISSUE
    .onChange(({translationX, translationY, absoluteX,absoluteY,x,y})=>{
     // console.log(translationX,absoluteX)
    // console.log(getChangeInAngle(width/2,startCord.x,height/2,startCord.y,absoluteX,absoluteY))
      const val = getChangeInAngle(width/2,startCord.x,height/2,startCord.y,absoluteX,absoluteY)
      // setstartAngle(tempStart- val)
      // setAngle(tempEnd -val)
    }).onEnd(()=>{
     
    })
  
  React.useEffect(()=>{
    console.log(start-angle)
    if(start-angle< -120 ){
      setColor(colorDull)
    }else if(angle<start && angle+360-start>120){
      setColor(colorDull)
    }
    else{
      setColor(color)
    }
   // console.log(AngleToTime(start));
    setBedTime(AngleToTime(start))
    setWakeTime(AngleToTime(angle))
  },[start,angle])
  //const rawPath =describeArc(width/2,height/2,r,0,209)
  return (
    <View style={{flex:1,overflow:'hidden'}}>
      
    <GestureHandlerRootView  style={{flex:1,alignSelf:'center',justifyContent:'center'}}>
      <Svg  width={width}
            height={height}
            style={{backgroundColor:'rgba(10,10,10,0.8)'}}
            >
        <WhiteText text="BedTime" cx={width/2-radius} cy={height/2-radius-70}/>
        <WhiteText text={BedTime} cx={width/2-radius} cy={height/2-radius-50}/>
        
        <WhiteText text="Wake Up Time" cx={width/2+radius} cy={height/2-radius-70}/>
        <WhiteText text={WakeTime} cx={width/2+radius} cy={height/2-radius-50}/>
        
        <Path
          d = {describeArc(width/2,height/2,radius,0,359)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={'rgba(0,0,0,1)'}
        />
        <Path
          d = {describeArc(width/2,height/2,radius,start,angle)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={colorCode}
        />
        <GestureDetector gesture={gestureMove}>
        <Path
          d = {describeArc(width/2,height/2,radius,start,angle)}
          strokeWidth = {12}
          strokeLinecap = "butt"
          stroke = {'black'}
          strokeLinejoin = 'none'
          strokeDasharray = "1.5"
        />
        </GestureDetector>
         <GestureDetector gesture={gestureStart}>
        <Circle
          cx={getArcX(width/2,radius,start)}
          cy={getArcY(height/2,radius,start)}
          r={5}
          stroke={'rgba(0,0,0,1)'}
          strokeWidth={10}
        />
        
        </GestureDetector>
        <GestureDetector gesture={gesture}>
        <Circle
          cx={getArcX(width/2,radius,angle)}
          cy={getArcY(height/2,radius,angle)}
          r={5}
          stroke={'rgba(255,0,0,1)'}
          strokeWidth={10}
        />
        </GestureDetector>
      </Svg>
    </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});
