import { params, getQuestion } from "../module/callApi.js";
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
  }, 200);
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

export const addEventAnswer = (data) => {
  document.querySelector(".point-n-time").classList.remove("hidden");
  const questionInner = document.querySelector(".question-inner");

  let time = data[0].time_limit;
  const countDown = setInterval(() => {
    document.querySelector(".time").innerHTML = `Thời gian: ${time--}`;
    if (time < 0) {
      clearInterval(countDown);
      params._page++;
      getQuestion(params);
    }
  }, 1000);

  const notify = document.querySelector(".notify");

  let correctAnswer = data[0].correct_id;
  questionInner.addEventListener("click", (e) => {
    if (Number(e.target.dataset.id) === correctAnswer) {
      e.target.classList.add("bg-success", "text-white");
      e.target.classList.remove("bg-danger");
      params._page++;
      notify.innerHTML = "Chính Xác!";
      setTimeout(() => {
        notify.innerHTML = "";
        getQuestion(params);
      }, 3000);
      clearInterval(countDown);
    } else {
      e.target.classList.add("text-white", "bg-danger");
      params._page++;
      notify.innerHTML = "Sai!";
      setTimeout(() => {
        notify.innerHTML = "";
        getQuestion(params);
      }, 3000);
      clearInterval(countDown);
    }
  });
};

export const countDown = (data) => {};
