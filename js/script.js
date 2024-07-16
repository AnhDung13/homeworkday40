let point = 0;
let totalCorrect = 0;

import { getQuestion, params } from "../module/callApi.js";
const inner = document.querySelector(".inner");
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => {
  const outer = inner.querySelector(".outer");
  let count = 3;
  const countdown = setInterval(() => {
    outer.innerHTML = `<span class="fw-bold text-success" style="font-size:50px">${count--}</span>`;
    if (count < 0) {
      inner.removeChild(outer);
      clearInterval(countdown);
      getQuestion(params);
    }
  }, 1000);
});

export const renderQuestion = (data, totalPages) => {
  const questionInner = document.querySelector(".question-inner");
  questionInner.innerHTML = `${data
    .map(({ question, answers }) => {
      return `
           <h1 class="text-success mb-3 w-100">
              Question ${
                params._page
              }/${totalPages}: <span class="text-primary"> ${question} ?</span>
            </h1>
            <div class="answers-inner d-flex flex-column gap-3 w-50">
             ${answers
               .map(
                 ({ text, id }) => `
              <span
                class="answer text-success fs-2 w-100 border border-success d-block px-3 py-1 rounded-3 "
                style="cursor: pointer"
                data-id="${id}"
                >${text}</span>`
               )
               .join("")}
            </div>
      `;
    })
    .join("")}`;
};

export const addEventAnswer = (data, totalPages) => {
  document.querySelector(".point-n-time").classList.remove("hidden");
  const totalPointElement = document.querySelector(".point span");
  const notifyElement = document.querySelector(".notify");
  const totalCorrectElement = document.querySelector(".total-correct");
  let time = data[0].time_limit;
  let correctAnswer = data[0].correct_id;
  const countDown = setInterval(() => {
    const timeElement = document.querySelector(".time");
    if (timeElement) {
      timeElement.innerHTML = `Thời gian: ${time--}`;
    }
    if (time < 0) {
      clearInterval(countDown);
      params._page++;
      getQuestion(params);
    }
  }, 1000);

  const answers = document.querySelectorAll(".answer");
  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (params._page <= totalPages) {
        clearInterval(countDown);
        if (+answer.dataset.id === correctAnswer) {
          answer.classList.add("bg-success", "text-white");
          notifyElement.innerHTML = "Chính Xác!";
          totalPointElement.innerHTML = `${(point += data[0].point)}`;
          totalCorrectElement.innerText = `${(totalCorrect += 1)}`;
        } else {
          answers.forEach((answer) => {
            if (+answer.dataset.id === correctAnswer) {
              answer.classList.add("bg-success", "text-white");
            } else {
              answer.classList.add("text-white", "bg-danger");
            }
          });
          notifyElement.innerHTML = "Sai!";
        }
        setTimeout(() => {
          params._page++;
          notifyElement.innerHTML = "";
          getQuestion(params);
        }, 3000);
      }
    });
  });
};
export const finish = (totalPages) => {
  const totalPoint = document.querySelector(".point span").innerText;
  const totalCorrect = document.querySelector(".total-correct").innerText;
  inner.innerHTML = `<div class="text-success text-center fs-3">Bạn đã trả lời đúng ${totalCorrect}/${totalPages} câu hỏi</div>
                    <div class="text-success text-center fs-3">Số điểm của bạn là ${totalPoint}</div>`;
};
