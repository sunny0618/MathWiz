/**
 * Created by J Fong on 5/10/2016.
 */

ymouse = 0;
xmouse = 0;

//Maximum numbers
MaxNum = 15;



//Variables to store values
var Questions, Answers,	Score,Missed;
var	RemainingQuestions, QuestionAnswered;
var startTime;

Ny = new Array();
NDy = new Array();

//Making numbers
for (i=0; i < MaxNum; i++)
    document.write('<div id= "NumberID"style="position:absolute;top:0px;' +
        'left:0;text-align:center;"> </B></font></div>');

//The Mouse functions and Cursor
document.write('<div id= "MouseQuestionID"style="position:absolute;top:0px;' +
    'left:0;text-align:center;"> </B></font></div>');

//Loading Game and mouse functions
document.onmousemove = Mouse;
window.onload = Startup;
document.onmouseclick = MouseClick;


var incorrectElement;

function MouseClick( evnt ) {
    element = event.srcElement;
    if ( element.id == "NumberID" ) {
        if ( element.innerText == Answers[CurrentQuestionIndex] ) {
            QuestionAnswered[ CurrentQuestionIndex ] = true;
            element.style.visibility = 'hidden';
            Score += 1;
            ScoreID.innerText = Score;
            NextQuestion( );
        }
        else {
            Missed += 1;
            MissID.innerText = Missed;
            HighlightIncorrectAnswer( element );
        }
    }
}

//Mouse Cursor
function Mouse(event) {
    var ymouse = event.clientY;
    var xmouse = event.clientX;

    var cursor = document.getElementById("MouseQuestionID");

    cursor.style.top = ymouse + 5 + "px";
    cursor.style.left = xmouse + 10 + "px";
}

function NextQuestion( ) {
    if ( RemainingQuestions == 0 ) {
        MouseQuestionID.innerText = '';
        //Load game over function
    }
    else {
        var index = createNum(1,RemainingQuestions);
        var i = 0;
        while ( index > 0 ) {
            if (!QuestionAnswered[i])
                index = index - 1;
            i = i + 1;
        }
        CurrentQuestionIndex = i - 1;
        Question.innerText = Questions[CurrentQuestionIndex];
        MouseQuestionID.innerText = Questions[CurrentQuestionIndex];
        RemainingQuestions = RemainingQuestions - 1;
    }
}


function MoveAnswers() {
    var documentWidth = document.body.clientWidth / ( MaxNum + 2 );
    for (var i = 0; i < MaxNum; i++) {
        Ny[i] = Ny[i] + NDy[i];
        if(Ny[i] > 600) {
            Ny[i] = 0;
        }
        NumberID[i].style.top = Ny[ i ] + "px";
        NumberID[i].style.left = (i+1) * documentWidth + "px";
    }
}


function HighlightIncorrectAnswer( element ) {
    element.style.backgroundColor = 'red';
    incorrectElement = element;
}


function Timer() {

    MoveAnswers();

    if (RemainingQuestions > 0) {
        var timeRightNow = new Date();
        TimeID.innerText = SecondsAsString(
            Math.floor(
                (timeRightNow.valueOf() - startTime.valueOf())/1000 ) );
    }
    setTimeout('Timer()',100);
}

function SecondsAsString( seconds ) {
    var minutes = Math.floor( seconds/60 );
    var secRem = seconds - (minutes*60);
    var str = minutes + ':';
    if ( secRem < 10 )
        return str + '0' + secRem;
    return str + secRem;
}

function createNum( MinValue, MaxValue ) {
    var i;
    range = MaxValue - MinValue + 1;
    i = Math.random( ) * range;
    i = Math.round( i - 0.5 )
    i = MinValue + i;
    return i;
}

function CreateQuestionsAndAnswers(Questions, Answers, MaxQuestions) {
    var i;
    for (i=0;i<MaxQuestions;i++) {

        var operand = 1;
        var numberMax;

        numberMax = 10 * 2;

        var x = createNum(1,numberMax);
        var y = createNum(1,numberMax);

        if (operand == 1) {
            var z = x + y;
            var operandStr = '+';
        }

        Questions[i] = x + operandStr + y + '=';
        Answers[i] = z;
    }
}


function startGame( ) {

    Score = 0;
    Missed = 0;
    RemainingQuestions = MaxNum;
    Questions = new Array();
    Answers = new Array();

    CreateQuestionsAndAnswers( Questions,Answers, MaxNum );

    QuestionAnswered = new Array( );

    for (i=0;i<MaxNum;i++) {
        QuestionAnswered[i] = false;

        //Speed of the numbers
        Ny[i] = 0;
        NDy[i] = (Math.random( )*0.5+0.5);

        //Giving the element ID an answer value
        NumberID[ i ].innerText = Answers[i];
        NumberID[ i ].style.visibility = 'visible';
    }

    //Values of html code
    ScoreID.innerText = Score;
    MissID.innerText = Missed;
    startTime = new Date();

    //Asking the next question
    NextQuestion();
}

function Startup( ) {
    //Start the timer
    Timer();
}