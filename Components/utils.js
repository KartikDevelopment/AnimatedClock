export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    //let angleInRadians = (Math.PI *2 * angleInDegrees / 360)
    return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
    };
    }
    
export function describeArc(x, y, radius, startAngle, endAngle){
    const tmpStart = startAngle
    const tmpEnd =  endAngle
    if(startAngle>endAngle){
        [startAngle, endAngle] = [endAngle, startAngle];
    }
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
    if(tmpStart>tmpEnd && tmpStart-tmpEnd>180 ) {
        [start,end] = [end,start]
        largeArcFlag = "0"
    }else if(tmpStart>tmpEnd && tmpStart-tmpEnd<180 ){
        [start,end] = [end,start]
        largeArcFlag = "1"
    }
    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
   
    return d;       
    }
export const getArcX=(cx,radius,angle)=>{
    const x = cx+ radius* Math.sin(Math.PI * 2 * angle / 360);
    return x
}
export function getArcY(cy,radius,angle){
    const y = cy-radius*Math.cos(Math.PI * 2 * angle / 360)
    return y
}
export function getAngleFromCordinate(cx,x,cy,y){
    const deltaX = cx - x;
    const deltaY = cy - y;
    const rad = Math.atan2( -deltaX,deltaY);
    const deg = (rad) * (180 / Math.PI)
    return deg>=0?deg:360+deg;
}
export function getChangeInAngle(cx,x,cy,y,x2,y2){
    const deltaX = cx - x;
    const deltaY = cy - y;
    const deltaX2 = cx - x2;
    const deltaY2 = cy - y2;
    const rad = Math.atan2( -deltaX,deltaY);
    const rad2 = Math.atan2( -deltaX2,deltaY2);
    const deg = (rad) * (180 / Math.PI)
    const deg2 = (rad2) * (180 / Math.PI)
    return deg - deg2
}
export function AngleToTime(angle){

    const hour = parseInt(angle/15);
    const minute = parseInt((angle%15)*4)
    return hour+":"+minute
}