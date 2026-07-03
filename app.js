(function () {
  const data = window.SUBMISSION_DATA;
  const form = document.querySelector("#lookup-form");
  const input = document.querySelector("#student-id");
  const message = document.querySelector("#message");
  const result = document.querySelector("#result");
  const studentName = document.querySelector("#student-name");
  const studentNumber = document.querySelector("#student-number");
  const homeworkHead = document.querySelector("#homework-head");
  const homeworkRow = document.querySelector("#homework-row");
  const quizHead = document.querySelector("#quiz-head");
  const quizRow = document.querySelector("#quiz-row");

  const studentsById = new Map(
    data.students.map((student) => [student.id.toUpperCase(), student]),
  );

  function renderHeaders(target, labels) {
    target.replaceChildren(
      ...labels.map((label) => {
        const cell = document.createElement("th");
        cell.scope = "col";
        cell.textContent = label;
        return cell;
      }),
    );
  }

  function renderStatuses(target, statuses) {
    target.replaceChildren(
      ...statuses.map((submitted) => {
        const cell = document.createElement("td");
        const mark = document.createElement("span");
        mark.className = submitted ? "mark" : "blank";
        mark.textContent = submitted ? "✓" : "";
        mark.setAttribute("aria-label", submitted ? "已提交" : "未提交");
        cell.append(mark);
        return cell;
      }),
    );
  }

  function showStudent(student) {
    studentName.textContent = student.name;
    studentNumber.textContent = student.id;
    renderStatuses(homeworkRow, student.homework);
    renderStatuses(quizRow, student.quizzes);
    result.classList.remove("hidden");
    message.textContent = "";
  }

  function hideResult(text) {
    result.classList.add("hidden");
    message.textContent = text;
  }

  renderHeaders(homeworkHead, data.homeworkLabels);
  renderHeaders(quizHead, data.quizLabels);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = input.value.trim().toUpperCase();

    if (!id) {
      hideResult("请输入学号。");
      return;
    }

    const student = studentsById.get(id);
    if (!student) {
      hideResult("没有找到这个学号的提交记录，请检查输入是否正确。");
      return;
    }

    showStudent(student);
  });
})();
