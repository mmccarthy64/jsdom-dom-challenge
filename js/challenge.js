let timer;
let isActive = true;

const counter = document.querySelector("#counter");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const heart = document.querySelector("#heart");
const pause = document.querySelector("#pause");
const commentForm = document.querySelector("#comment-form");
const comments = document.querySelector("#list");
const likes = document.querySelector(".likes");

document.addEventListener("DOMContentLoaded", startTimer);
plus.addEventListener("click", plusTimer);
minus.addEventListener("click", minusTimer);
pause.addEventListener("click", pauseTimer);
heart.addEventListener("click", addHeart);
commentForm.addEventListener("submit", addComment);

function startTimer(){
    timer = setInterval(plusTimer, 1000);
}

function plusTimer() {
    const count = parseInt(counter.textContent, 10);
    counter.textContent = count + 1;
}

function minusTimer() {
    const count = parseInt(counter.textContent, 10);
    counter.textContent = count - 1;
}

function addHeart() {
    const currentCount = parseInt(counter.textContent, 10);

    const previousLikes = Array.from(likes.children);
    const previousLike = previousLikes.find(previousLike => {
        const previousLikeCount = parseInt(previousLike.textContent.split(" ")[0], 10);
        return previousLikeCount === currentCount;
    });

    if (previousLike) {
        const previousLikeNum = parseInt(previousLike.textContent.split(" ").slice(-2)[0], 10);
        previousLike.textContent = `${currentCount} has been like ${previousLikeNum + 1} times`;
    } else {
        const newLike = document.createElement("li");
        newLike.textContent = `${currentCount} has been liked 1 time`;
        likes.appendChild(newLike);
    }
}

function pauseTimer() {
    const btns = Array.from(document.querySelectorAll("button"));
    const notPauseBtn = btns.filter( btn => btn.id != "pause");

    if (isActive) {
        clearInterval(timer);
        notPauseBtn.forEach(btn => btn.disabled = true);
        pause.textContent = "resume";
        isActive = false;
    } else {
        startTimer();
        notPauseBtn.forEach(btn => btn.disabled = false);
        pause.textContent = "pause";
        isActive = true;
    }
}

function addComment(e) {
    e.preventDefault();
    const commentInput = document.querySelector("#comment-input");
    const newComment = document.createElement("li");
    newComment.textContent = commentInput.value;

    comments.appendChild(newComment);
    
    e.target.reset();
}