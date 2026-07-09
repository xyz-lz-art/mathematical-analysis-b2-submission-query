(function () {
  const data = window.SUBMISSION_DATA;
  const form = document.querySelector("#lookup-form");
  const input = document.querySelector("#student-id");
  const message = document.querySelector("#message");
  const result = document.querySelector("#result");
  const studentName = document.querySelector("#student-name");
  const studentNumber = document.querySelector("#student-number");
  const regularScore = document.querySelector("#regular-score");
  const homeworkSummary = document.querySelector("#homework-summary");
  const quizSummary = document.querySelector("#quiz-summary");
  const midtermSummary = document.querySelector("#midterm-summary");
  const finalSummary = document.querySelector("#final-summary");
  const totalCards = document.querySelector("#total-cards");
  const homeworkHead = document.querySelector("#homework-head");
  const homeworkRow = document.querySelector("#homework-row");
  const quizHead = document.querySelector("#quiz-head");
  const quizRow = document.querySelector("#quiz-row");
  const policyBody = document.querySelector("#policy-body");
  const policyNote = document.querySelector("#policy-note");

  const studentsById = new Map(
    data.students.map((student) => [student.id.toUpperCase(), student]),
  );

  const totalOrder = ["235", "244", "potential"];

  function formatScore(value) {
    return Number(value).toFixed(2).replace(/\.00$/, "");
  }

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

  function renderPolicy() {
    const regular = document.createElement("div");
    regular.className = "policy-card";
    regular.innerHTML = `<strong>平时分</strong><span>作业 ${data.gradingPolicy.weights["作业"]}，小测 ${data.gradingPolicy.weights["小测"]}</span>`;

    const grades = document.createElement("div");
    grades.className = "policy-card";
    grades.innerHTML = `<strong>等第换算</strong><span>${Object.entries(data.gradingPolicy.gradeMap).map(([grade, percent]) => `${grade}=${percent}`).join("，")}</span>`;

    const formulas = document.createElement("div");
    formulas.className = "policy-card wide";
    const title = document.createElement("strong");
    const list = document.createElement("ul");
    title.textContent = "总评公式";
    totalOrder.forEach((key) => {
      const formula = data.formulaLabels[key];
      const li = document.createElement("li");
      li.textContent = `${formula.label}：${formula.name}，85分以上 ${formula.excellentCount} 人，优秀率 ${formula.excellentRate}%`;
      list.append(li);
    });
    formulas.append(title, list);

    policyBody.replaceChildren(regular, grades, formulas);
    policyNote.textContent = data.gradingPolicy.note;
  }

  function renderTotals(student) {
    totalCards.replaceChildren(
      ...totalOrder.map((key) => {
        const formula = data.formulaLabels[key];
        const card = document.createElement("article");
        card.className = key === "potential" ? "total-card recommended" : "total-card";

        const label = document.createElement("p");
        label.className = "total-label";
        label.textContent = formula.label;

        const value = document.createElement("p");
        value.className = "total-value";
        value.textContent = formatScore(student.totals[key]);

        const detail = document.createElement("p");
        detail.className = "total-detail";
        detail.textContent = formula.name;

        const stats = document.createElement("p");
        stats.className = "total-stats";
        stats.textContent = `全班85分以上：${formula.excellentCount}人 (${formula.excellentRate}%)`;

        card.append(label, value, detail, stats);
        return card;
      }),
    );
  }

  function showStudent(student) {
    studentName.textContent = student.name;
    studentNumber.textContent = student.id;
    regularScore.textContent = `平时分：${formatScore(student.regularPercent)}%`;
    homeworkSummary.textContent = `作业：${student.homeworkSubmitted}/${data.homeworkLabels.length}`;
    quizSummary.textContent = `小测：${student.quizSubmitted}/${data.quizLabels.length}`;
    midtermSummary.textContent = `期中：${formatScore(student.midtermScore)}`;
    finalSummary.textContent = `期末：${formatScore(student.finalScore)}`;
    renderTotals(student);
    renderStatuses(homeworkRow, student.homework);
    renderStatuses(quizRow, student.quizzes);
    result.classList.remove("hidden");
    message.textContent = "";
  }

  function hideResult(text) {
    result.classList.add("hidden");
    message.textContent = text;
  }

  renderPolicy();
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
      hideResult("没有找到这个学号的记录，请检查输入是否正确。");
      return;
    }

    showStudent(student);
  });
})();
