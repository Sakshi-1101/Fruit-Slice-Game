var playing = false;
var score;
var trialsLeft;
var step;
var action; 
var fruits = ['f1' ,'f2' , 'f3' ,'f4' ,'f5' ,'f6' , 'f7' , 'f8' , 'f9' , 'f10'];

$(function(){
    
//click on start/reset button
    
    $("#startreset").on('click' , function()
    {
       //are we playing?
        //yes
        if(playing == true)
        {
            location.reload();
        }

        //no
        else
        {
            playing = true; //game initiated

            //set score to 0
            score = 0; 
            $("#scorevalue").html(score);

            $("#trialsLeft").show();

            trialsLeft = 3; 
            addHearts();

            $("#score").show();

            $("#gameOver").hide();

            //change button text to reset game
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });

        
    //slice a fruit 
    $("#fruit1").on("mouseover" , function()
    {
        score++;
        $("#scorevalue").html(score); //update score

        $("#slicesound")[0].play();//play sound
        
        //explode the fruit
        clearInterval(action);
    
        //hide fruit
        $("#fruit1").hide("explode", {pieces: 15} , 500); //slice fruit
        
        //send new fruit
        setTimeout(startAction, 800);
    });
    

//trialLeft box  
function addHearts()
{
    $("#trialsLeft").empty();

    for(i = 0 ; i < trialsLeft ; i++)
    {
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits
function startAction()
{
    $("#fruit1").show();

    chooseFruit(); //choose a random fruit

    $("#fruit1").css({'left' : Math.round(600*Math.random()), 'top' : -80}); //random position of fruit
    
    step = 1+ Math.round(5*Math.random()); // change step
    
    //(2)Move fruit down by one step every 10ms
    action = setInterval(function(){

        $("#fruit1").css('top', $("#fruit1").position().top + step); 

        //check if the fruit is too low ?
        if($("#fruit1").position().top > $("#fruitsContainer").height())
        {
            //any trials left? no -> repeat step2 
            if(trialsLeft > 1 ) //yes
            {
                // repeat step (1)

                $("#fruit1").show(); //displayfruit

                chooseFruit();

                $("#fruit1").css({'left' : Math.round(600*Math.random()), 'top' : -80}); // set random position of fruit

                step = 1+ Math.round(5*Math.random()); // change step

                trialsLeft --;
                addHearts();
                
            }
            // game over
            else 
            { 
                playing = false;

                $("#startreset").html("Start Game"); 

                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!<br/>Your score is '+ score +'</p>');

                $("#trialsLeft").hide();

                $("#score").hide();

                //stopping the fruits from dropping
                stopAction();
            }
        }
    }, 10);
}


//(1) create a random fruit
function chooseFruit()
{
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(9*Math.random())] +'.png'); 
}


//Stop dropping fruits
function stopAction()
{
    clearInterval(action);

    $("#fruit1").hide();

}

}); 