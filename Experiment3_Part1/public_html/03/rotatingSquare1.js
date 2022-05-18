"use strict";
var delay = 50;
var canvas;
var gl;
var colors = [vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random())];
var theta = 0.0;
var thetaLoc;
var bruh;
var direction = true;
var flag = false;
var col = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec3(0.0, 0.0, -1.0),
        vec3(  0.0,  0.6, 0.333 ),
        vec3(  -0.5,  -0.3, 0.333 ),
        vec3( 0.5,  -0.3, 0.333 )
        
    ];
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "a_color" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation( program, "theta" );
    bruh = gl.getUniformLocation(program, "bruh");
    col = Math.random()/75;
    document.getElementById("Direction").onclick = function () {
        direction = !direction;
    };
    document.getElementById("Increase").onclick = function () {
        delay /= 2.0;
    };
    document.getElementById("Decrease").onclick = function () {
        delay *= 2.0;
    };
    document.getElementById("change").onclick = function () {
        flag = true;
        
    };

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    theta += (direction ? 0.1 : -0.1);
    
    gl.uniform1f( thetaLoc, theta );
    if(flag){
        col = Math.random()/85;
        gl.uniform1f(bruh,col);
        flag = !flag;
    }else{
        gl.uniform1f(bruh, col);
    }

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}
