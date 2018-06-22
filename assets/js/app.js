$('#start').on('click',function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e)
})

$(document).on('click','#reset',function(){
    game.reset();
})

var questions = [{
    question:"Who hit the first home run at the current Yankee Stadium?",
    answers:["Alex Rodriguez", "Derek Jeter", "Jorge Posada", "Hideki Matsui"],
    correctAnswer: "Jorge Posada",
    image: ""
}, {
    question:"Who was the longest tenured Yankee captain?",
    answers:["Derek Jeter", "Lou Gehrig", "Don Mattingly", "Babe Ruth"],
    correctAnswer: "Derek Jeter",
    image: "" 
}, {
    question:"Mickey Mantle hit a record 18 World Series home runs in his career. Which Yankee is in second place with 15 World Series home runs?",
    answers:["Yogi Bera", "Bernie Williams", "Babe Ruth", "Reggie Jackson"],
    correctAnswer: "Babe Ruth",
    image: ""
}, {
    question:"Yogi Berra's iconic nickname was not given to him by a Yankee but by this childhood friend who went on to be a member of the 1954 world champion New York Giants. Who is this friend?",
    answers:["Willie Mays", "Whitey Lockman", "Bobby Hofman", "Leo Durocher"],
    correctAnswer: "Bobby Hofman",
    image: ""
}, {
    question:"This Yankee was the first relief pitcher to win the American League Cy Young Award:",
    answers:["Rich Gossage", "Mariano Rivera", "Sparky Lyle", "Mark Teixeira"],
    correctAnswer: "Sparky Lyle",
    image: ""
}, {
    question:"On Aug. 25, 2011, Robinson Cano, Russell Martin and this guy made the Yankees the first team in MLB history to hit three grand slams in one game:",
    answers:["Alex Rodriguez", "Curtis Granderson", "Nick Swisher", "Mar Teixeira"],
    correctAnswer: "Curtis Granderson",
    image: ""
}]

var game = {
    questions:questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("times up");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2 id='counter'>30</h2>");
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>')
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
                currentQuestion].answers[i]+'">'+questions[game.
                currentQuestion].answers[i]+'</button>' + '<br>')
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer)
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>')
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else {
            setTimeout(game.nextQuestion,2*1000)
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        $('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>")
        $('#subwrapper').append("<button id='reset'>RESET</button>")
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("RIGHT")
        clearInterval(timer)
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>' + game.questions);
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else {
            setTimeout(game.nextQuestion,2*1000)
        }
    },
    answeredIncorrectly: function(){
        console.log("wrong");
        clearInterval(timer)
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('subwrapper').html('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>')
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else {
            setTimeout(game.nextQuestion,2*1000)
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 30;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}