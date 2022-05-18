/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const radian = Math.PI/180;

const mainsquare = [-1.0,1.0,
                    1.0,1.0,
                    -1.0,-1.0,
                    1.0,-1.0];
                
const center1 = [-0.125, 0.125];
const center2 = [0.125, 0.125];
const center3 = [-0.125, -0.125];
const center4 = [0.125, -0.125];
const radius = 0.125;   
const center5 = [-0.125, 0.125];
const center6 = [0.125, 0.125];
const center7 = [-0.125, -0.125];
const center8 = [0.125, -0.125];
const center9 = [0.0, 0.1625];
const center10 = [0.0, -0.1625];
const center11 = [-0.1625, 0.0];
const center12 = [0.1625, 0.0];
const radius2 = 0.0375

const mainsquare2 =[-0.125, 0.125,
                   0.125, 0.125,
                   -0.125, -0.125,
                   0.125, -0.125

];



const green = [0.0, 0.8, 0.0];
const circ_color = [1.0, 0.0, 0.0];


var square_color = [];
for(var i = 0; i < 4; i++){
    square_color = square_color.concat(green);
}

var circle1 = [];
for(var i = 0; i < 360; i++) {
    circle1 = circle1.concat([radius*Math.cos(i*radian) + center1[0], radius*Math.sin(i*radian) + center1[1]]);
}
var circle2 = [];
for(var i = 0; i < 360; i++) {
    circle2 = circle2.concat([radius*Math.cos(i*radian) + center2[0], radius*Math.sin(i*radian) + center2[1]]);
}
var circle3 = [];
for(var i = 0; i < 360; i++) {
    circle3 = circle3.concat([radius*Math.cos(i*radian) + center3[0], radius*Math.sin(i*radian) + center3[1]]);
}
var circle4 = [];
for(var i = 0; i < 360; i++) {
    circle4 = circle4.concat([radius*Math.cos(i*radian) + center4[0], radius*Math.sin(i*radian) + center4[1]]);
}
var circle5 = [];
for(var i = 0; i < 360; i++) {
    circle5 = circle5.concat([radius2*Math.cos(i*radian) + center5[0], radius2*Math.sin(i*radian) + center5[1]]);
}
var circle6 = [];
for(var i = 0; i < 360; i++) {
    circle6 = circle6.concat([radius2*Math.cos(i*radian) + center6[0], radius2*Math.sin(i*radian) + center6[1]]);
}
var circle7 = [];
for(var i = 0; i < 360; i++) {
    circle7 = circle7.concat([radius2*Math.cos(i*radian) + center7[0], radius2*Math.sin(i*radian) + center7[1]]);
}
var circle8 = [];
for(var i = 0; i < 360; i++) {
    circle8 = circle8.concat([radius2*Math.cos(i*radian) + center8[0], radius2*Math.sin(i*radian) + center8[1]]);
}
var circle9 = [];
for(var i = 0; i < 360; i++) {
    circle9 = circle9.concat([radius2*Math.cos(i*radian) + center9[0], radius2*Math.sin(i*radian) + center9[1]]);
}
var circle10 = [];
for(var i = 0; i < 360; i++) {
    circle10 = circle10.concat([radius2*Math.cos(i*radian) + center10[0], radius2*Math.sin(i*radian) + center10[1]]);
}
var circle11 = [];
for(var i = 0; i < 360; i++) {
    circle11 = circle11.concat([radius2*Math.cos(i*radian) + center11[0], radius2*Math.sin(i*radian) + center11[1]]);
}
var circle12 = [];
for(var i = 0; i < 360; i++) {
    circle12 = circle12.concat([radius2*Math.cos(i*radian) + center12[0], radius2*Math.sin(i*radian) + center12[1]]);
}


var circle_color = [];
for(var i = 0; i < 360; i++){
    circle_color = circle_color.concat(circ_color);
}