"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gl;
var ANGLE = 0;
var incr = 0;
var thetaLoc;
var objtodraw;
var objtodraw2;
var flag = 0;
var spin = false;
var scale = false;
var ssx ;
var ssy ;
var ssz ;
var sx = 1.0;
var sy = 1.0;
var sz = 1.0;
var flag1 = false;
var flag2 = false;
var Tx = 0.0, Ty = 0.0, Tz = 0.0;
var u_Translation;
var spir = false;
let coords = [];
//let negcoords = [];
var len;
var loc = 0;
var flag3 = false;
var flag4 = false;
var flag5 = false;


window.onload = function() {
    init();
};

function init(){
    const canvas = document.querySelector("#glCanvas");
    gl = canvas.getContext("webgl2");
    
    if(!gl) {
        alert("not supported");
        return;
    }
    gl.clearColor(0.0, 0.8, 0.0, 1.0);
    
    //spir loc. arr.
    var a=.0,ai=.01,r=.0,ri=.0005,as=1.5*2*Math.PI,n=as/ai;
    var x=0, y=0;
    for (var i=1; i<n; i++) {
        x=r*Math.cos(a), y=r*Math.sin(a);
        coords.push(x);
        coords.push(y);
        
        r+=ri; a+=ai;
    }
    len = coords.length;
    for(var i=0; i < len/2 ; i++){
        coords.push(coords[len-2-i*2]);
        coords.push(-1*coords[len-1-i*2]);
    }
    len = coords.length;
    

    //creating shaders
    const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, vShader);
    gl.compileShader(vertex_shader);
    if ( !gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS) ) {
        var info = gl.getShaderInfoLog(vertex_shader);
        alert("error: \n" + info);
        return;
    }
    
    const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, fShader);
    gl.compileShader(fragment_shader);
    if ( !gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS) ) {
        var info = gl.getShaderInfoLog(fragment_shader);
        alert("error :  \n" + info);
        return;
    }
    //creating program
    const program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
        var info = gl.getProgramInfoLog(program);
        alert("error : \n" + info);
        return;
    }
    gl.useProgram(program);

    
    var numComponents = 2;  
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0; 
    const offset = 0; 
    
    const vertex_location = gl.getAttribLocation(program, "a_position");
    const color_location = gl.getAttribLocation(program, "a_color");
    
    //var matrixLocation = gl.getUniformLocation(program, "u_matrix");
    const btns = document.querySelectorAll('button[id^=but]')

    btns.forEach(btn => {

       btn.addEventListener('click', function(){
            buttonActions( event.target.id );
       });

    });

    
    //buffers
    //buffer for background
    const buffer_square = gl.createBuffer(); 
    squareBuff(buffer_square, mainsquare, square_color);
    
    //buffers for
    // 4 big circles
    const buffer_circle1 = gl.createBuffer();
    circleBuff(buffer_circle1, circle1,  circle_color);
    
    const buffer_circle2 = gl.createBuffer();
    circleBuff(buffer_circle2, circle2,  circle_color);
    
    const buffer_circle3 = gl.createBuffer();
    circleBuff(buffer_circle3, circle3, circle_color);
    
    const buffer_circle4 = gl.createBuffer();
    circleBuff(buffer_circle4, circle4, circle_color);
    
    //buffer for 
    //middle square
    const buffer_square2 = gl.createBuffer(); 
    squareBuff(buffer_square2, mainsquare2,  square_color);
    
    
    //buffers for circles 
    //8 small circles
    const buffer_circle5 = gl.createBuffer();
    circleBuff(buffer_circle5, circle5, circle_color);
    const buffer_circle6 = gl.createBuffer();
    circleBuff(buffer_circle6, circle6,  circle_color);
    const buffer_circle7 = gl.createBuffer();
    circleBuff(buffer_circle7, circle7,  circle_color);
    const buffer_circle8 = gl.createBuffer();
    circleBuff(buffer_circle8, circle8, circle_color);
    const buffer_circle9 = gl.createBuffer();
    circleBuff(buffer_circle9, circle9,  circle_color);
    const buffer_circle10 = gl.createBuffer();
    circleBuff(buffer_circle10, circle10,  circle_color);
    const buffer_circle11 = gl.createBuffer();
    circleBuff(buffer_circle11, circle11, circle_color);
    const buffer_circle12 = gl.createBuffer();
    circleBuff(buffer_circle12, circle12, circle_color);
    
    u_Translation = gl.getUniformLocation(program, 'u_Translation');
    thetaLoc = gl.getUniformLocation(program, "angle");
    const bruh = gl.getUniformLocation(program, "bruh");
    ssx = gl.getUniformLocation(program, "sx");
    ssy = gl.getUniformLocation(program, "sy");
    ssz = gl.getUniformLocation(program, "sz");


    
    gl.clear( gl.COLOR_BUFFER_BIT );

    objtodraw = [{
        buffer: buffer_circle1,
        vertex_location: vertex_location,
        circ: circle1,
        color_location: color_location},
        {
        buffer: buffer_circle2,
        vertex_location: vertex_location,
        circ: circle2,
        color_location: color_location          
        },
        {
        buffer: buffer_circle3,
        vertex_location: vertex_location,
        circ: circle3,
        color_location: color_location          
        },
        {
        buffer: buffer_circle4,
        vertex_location: vertex_location,
        circ: circle4,
        color_location: color_location          
        }    
    ];
    
    objtodraw2 = [
        {
        buffer: buffer_circle5,
        vertex_location: vertex_location,
        circ: circle5,
        color_location: color_location          
        },  
        {
        buffer: buffer_circle6,
        vertex_location: vertex_location,
        circ: circle6,
        color_location: color_location          
        },
        {
        buffer: buffer_circle7,
        vertex_location: vertex_location,
        circ: circle7,
        color_location: color_location          
        }, 
        {
        buffer: buffer_circle8,
        vertex_location: vertex_location,
        circ: circle8,
        color_location: color_location          
        },    
        {
        buffer: buffer_circle9,
        vertex_location: vertex_location,
        circ: circle9,
        color_location: color_location          
        },    
        {
        buffer: buffer_circle10,
        vertex_location: vertex_location,
        circ: circle10,
        color_location: color_location          
        },    
        {
        buffer: buffer_circle11,
        vertex_location: vertex_location,
        circ: circle11,
        color_location: color_location          
        },    
        {
        buffer: buffer_circle12,
        vertex_location: vertex_location,
        circ: circle12,
        color_location: color_location 
        }
    ];
    //draw background square
    //squareDraw(buffer_square, mainsquare, vertex_location, color_location);
    
    
    //circleDraw(buffer_circle1, circle1, vertex_location, color_location);

    //draw circle2
    //circleDraw(buffer_circle2, circle2, vertex_location, color_location);

    //draw ircle3
    //circleDraw(buffer_circle3, circle3, vertex_location, color_location);

    //draw circle4
    //circleDraw(buffer_circle4, circle4, vertex_location,color_location);
    render2();
    
    function render2(){
        gl.clear( gl.COLOR_BUFFER_BIT );
        //draw circle1 to circle4 
        //which are big 4 circles
        
        var x = document.getElementById("spinval").value;
        var spiralspd = document.getElementById("spiralval").value;
        if(spin){
            incr = -x;
        }else{
            incr = 0;
        }
        ANGLE += incr;
        
        if(scale){
            if(sx >= 1.5){
                flag1 = true;
            }
            if (sx <= 0.5){
                flag1 = false;
            }
            if(!flag1){
                sx += 0.005;
                sy += 0.005;
                sz += 0.005;
            }
            if(flag1){
                sx -= 0.005;
                sy -= 0.005;
                sz -= 0.005;
            }
            
        }
        
        if(spir){
            if(spiralspd > 0){
                if(loc+1 <= len){
                    Tx = -1*coords[loc];
                    Ty = coords[loc+1];
                    Tz = 0;
                    loc+=2*spiralspd;
                }else{
                    loc = 0;
                }
 
            }else if (spiralspd < 0){
                if(loc >= 0){
                    Tx = -1*coords[loc];
                    Ty = coords[loc+1];
                    Tz = 0;
                    loc+=2*spiralspd;
                }else{
                    loc = len-2;
                }
            }
            
        }
        
        gl.uniform1f(ssx, sx);
        gl.uniform1f(ssy, sy);
        gl.uniform1f(ssz, sz);
        
        gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
                
        gl.uniform1f(thetaLoc, ANGLE * Math.PI/180);
        if(Boolean(flag))
            gl.uniform1f(bruh, ANGLE/90);
        if(!Boolean(flag))
            gl.uniform1f(bruh, 0);

        objtodraw.forEach(function(object){
            circleDraw(object.buffer,object.circ,object.vertex_location, object.color_location);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 360);
        });
        if(Boolean(flag))
            gl.uniform1f(bruh, 0);
        if(!Boolean(flag))
            gl.uniform1f(bruh, 0);
        squareDraw(buffer_square2, mainsquare2, vertex_location, color_location);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if(Boolean(flag))
            gl.uniform1f(bruh, ANGLE/90);
        if(!Boolean(flag))
            gl.uniform1f(bruh, 0);
        objtodraw2.forEach(function(object2){
            circleDraw(object2.buffer,object2.circ,object2.vertex_location, object2.color_location);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 360);
        });

        requestAnimationFrame(render2);


    }
  
    //draw square2 
    //which is middle square
    //squareDraw(buffer_square2, mainsquare2, vertex_location, color_location);
    
    
    //draw circle5-12
    // which are tiny circles around the middle square
    //render2(program,buffer_circle5, circle5, vertex_location, color_location);
    //draw circle6
    //render2(program,buffer_circle6, circle6, vertex_location, color_location);
    //draw circle7
    //render2(program,buffer_circle7, circle7, vertex_location, color_location);
    //draw circle8
    //render2(program,buffer_circle8, circle8, vertex_location, color_location);
    //draw circle9
    //render2(program,buffer_circle9, circle9, vertex_location, color_location);
    //draw circle10
    //render2(program,buffer_circle10, circle10, vertex_location, color_location);
    //draw circle11
    //render2(program,buffer_circle11, circle11, vertex_location,color_location);
    //draw circle12
    //render2(program,buffer_circle12, circle12, vertex_location, color_location);

    

}
function buttonActions(id){
    if(id == "but1")
        spin  = true;
    if(id == "but2")
        spin = false;
    if(id == "but3")
        scale = true;
    if(id == "but4")
        scale = false;
    if(id == "but5")
        spir = true;
    if(id == "but6")
        spir = false;
}
function keyPressed(e){
        switch(e.key) {
          case '1':
              incr = 0;
              ANGLE = 0;
              flag = 0;
              break;
          case '2':
              if(ANGLE >= 45 ){
                  incr = -1;
              }
              if(ANGLE <= -45){
                  incr = 1;
              }
              if(ANGLE == 0){
                  incr = -1;
              }
              flag = 0
              break;
          case '3':
              if(ANGLE >= 45 ){
                  incr = -1;
              }
              if(ANGLE <= -45){
                  incr = 1;
              }
              if(ANGLE == 0){
                  incr = -1;
              }
              flag = 1;
              
              break;
        }
        e.preventDefault();
        
}

function render1(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    //draw circle1 to circle4 
    //which are big 4 circles
    ANGLE += incr;
    if(ANGLE <= -45)
        incr = 1;
    if(ANGLE >= 45)
        incr = -1;
    gl.uniform1f(thetaLoc, ANGLE * Math.PI/180);
    
    requestAnimationFrame(render1);
    

}


function circleBuff(buf, circ, circle_color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circ.concat(circle_color)), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(circ));
    gl.bufferSubData(gl.ARRAY_BUFFER, circ.length * 4, new Float32Array(circle_color));
}

function squareBuff(buf, sqr, square_color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sqr.concat(square_color)), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(sqr));
    gl.bufferSubData(gl.ARRAY_BUFFER, sqr.length * 4, new Float32Array(square_color));
}

function circleDraw(buf, circ, vertex_location, color_location) {
    var numComponents = 2;  
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0; 
    const offset = 0; 
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(vertex_location, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(vertex_location);
    gl.enableVertexAttribArray(color_location);
    gl.vertexAttribPointer(color_location, 3, type, normalize, stride, circ.length * 4);
    gl.drawArrays(gl.TRIANGLE_FAN, offset, 360);
}

function squareDraw(buf, sqr, vertex_location, color_location) {
    var numComponents = 2;  
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0; 
    const offset = 0; 
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(vertex_location, numComponents, type, normalize, stride, offset); 
    gl.enableVertexAttribArray(vertex_location);
    gl.enableVertexAttribArray(color_location);
    gl.vertexAttribPointer(color_location, 3, type, normalize, stride, sqr.length * 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, 4);
}