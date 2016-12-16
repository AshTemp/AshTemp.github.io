(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var moon;
        var circle;
        var circles = [];
        var city;
        var cities = [];
        // add objects for display in bakground
        // called at the start of game and whenever the page is resized
       
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            //var groundY = ground.y;

            background.removeAllChildren();

            // TODO: 3 - YOUR DRAW CODE GOES HERE

            // this fills the background with a dark blue
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'#011028');
            background.addChild(backgroundFill);
            
            
            
            //draws starfield
            for(var i=0;i<100;i++) {
             circle = draw.circle(3,'#fffa05','yellow',1);
             circle.x = canvasWidth*Math.random();
             circle.y = canvasHeight*Math.random();
             background.addChild(circle);
             circles.push(circle);
                }
            
            //creates the cityscape background
            city=  draw.bitmap('img/city.png');
            city.x = 0;
            city.y = ground.y - 325;
            background.addChild(city);
         
            
            
            //adds the moon
            moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth-300;
            moon.y = -50;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);

        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
          
        
          for (var j=0; j<circles.length; j++) {
              circles[j].x=circles[j].x-0.5;
                 if (circles[j].x < -50) {
                    circles[j].x=canvasWidth;
                }
          } 
           city.x = city.x - 1.5;
            if(city.x < -2300) {
             city.x = canvasWidth;
            }
            
        
        
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
}(window));





