// const { options } = require("yargs");

// const { get } = require("lodash");

//NavBar
function hideIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:none;");
    navigation.classList.remove("hide");
}

function showIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:block;");
    navigation.classList.add("hide");
}

//Comment
function showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
}

//Reply
// function showReply(){
//     var replyArea = document.getElementById("reply-area");
//     replyArea.classList.remove("hide");
// }

//---------------------------------------------------------------------------------
//comment
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var courseAPI = 'http://localhost:3000/course';


fetch(courseAPI)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(reponse) {
        console.log(reponse);
    })

function start() {
    getCourse(renderCourse);
    handleCreateForm();
}
start();

function getCourse(callBack){
    fetch(courseAPI)
        .then(function(reponse) {
            return reponse.json();
        })
        .then(callBack);
}

//create JSON
function createCourse(data, callback){
    options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type' : 'application/Json'
        }
    }

    fetch(courseAPI, options)
        .then(function(reponse) {
            reponse.json();
        })
        .then(callback);
}

//create comment
function appendComment(){
    const newComment = $('.comment-area textarea[name = "comment"]').value;
    const formData = {
        comment: newComment
    }
    createCourse(formData, function() {
        getCourse(renderCourse);
    })
}

function handleCreateForm(){
    const btnElement = $('.btn');

    //event phím tắt
    const inputElement = $('.comment-area textarea');
        inputElement.addEventListener('keyup', function(event) {
            if(event.which === 13){
               appendComment();
            }
        })


    btnElement.addEventListener('click', appendComment);
}

//renderComment

function renderCourse(course){
    const courseBlock = $('.list-comment');
    const htmls = course.map(function(course) {
        return `
                    <li>
                            <div class="authors">
                                <div class="username"><a href="">KudoShinichi</a></div>
                                <div>Member</div>
                                <img src="../img/No_Avatar.jpg" alt="">
                                <div>Posts: <u>834</u></div>
                                <div>Points: <u>9416</u></div>
                            </div>

                            <div class="content">
                                <p> ${course.comment}</p>
                                <div class="comment">
                                    <button onclick="showReply()">Reply</button>
                                </div>
                            </div>
                    </li>
                `
    })
    courseBlock.innerHTML = htmls.join('');
}


