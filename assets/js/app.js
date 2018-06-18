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
    question:"The term wake, kettle, or committee refers to a group of what bird?",
    answers:["Vulture", "Flamingo", "Geese", "Bald Eagle"],
    correctAnswer: "Vulture",
    image: ""
}, {
    question:"In the 1997 American science fiction comedy Men in Black, which actor played Agent K?",
    answers:["Tom Hanks", "Anthony Hopkins", "Tommy Lee Jones", "Denzel Washington"],
    correctAnswer: "Tommy Lee Jones",
    image: "" 
}, {
    question:"The slogan “Just Do It” was created in 1988 for which company?",
    answers:["Adidas", "Nike", "Asics", "Reebok"],
    correctAnswer: "Nike",
    image: ""
}, {
    question:"What fast food franchise has the most worldwide locations?",
    answers:["Subway", "Mcdonalds", "Wendy's", "Burger King"],
    correctAnswer: "Subway",
    image: ""
}, {
    question:"In what year did the Houston Texans become a team in the US National Football League?",
    answers:["2003", "1997", "1984", "2002"],
    correctAnswer: "2002",
    image: ""
}, {
    question:"What is the largest internal organ of the human body?",
    answers:["Stomach", "Heart", "Pancreas", "Liver"],
    correctAnswer: "Liver",
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
        $('#subwrapper').html('<h2>' + questions[game.currentQuestion].question + '</h2>')
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
                currentQuestion].answers[i]+'">'+questions[game.
                currentQuestion].answers[i]+'</button>')
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
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
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