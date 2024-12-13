const tbody = document.querySelector("tbody");

function createVisitor() {
  const form = document.forms["visitor-form"];
  if (form.name.value.length === 0 || form.comment.value.length === 0) {
    alert("이름과 방명록을 모두 입력해주세요.");
    return;
  }
  // 테이블 생성시 name 컬럼을 varchar(10)으로 설정. => 프론트에서 유효성검사 후 데이터 전송
  if (form.name.value.length > 10) {
    alert("이름은 10자 이하로 작성해주세요");
    return;
  }
  axios({
    url: "/visitor",
    method: "post",
    data: {
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      const { id, name, comment } = res.data;
      const newHTML = `
        <tr id='tr_${id}'>
            <td>${id}</td>
            <td>${name}</td>
            <td>${comment}</td>
            <td><button onclick="editVisitor(${id})">수정</button></td>
            <td><button onclick="deleteVisitor(${id})">삭제</button></td>
        </tr>`;
      //   tbody.append(newHTML); 문자열로 그대로 붙음
      tbody.insertAdjacentHTML("beforeend", newHTML); // 문자열을 특정 요소의 맨 마지막으로 HTML 추가
      form.reset();
    })
    .catch((err) => console.error(err));
}

function deleteVisitor(btn, id) {
  axios({
    url: "/visitor",
    method: "delete",
    data: {
      id,
    },
  })
    .then((text) => {
      console.log(text.data);
      //   btn.parentElement.parentElement.remove();
      btn.closest(`#tr_${id}`).remove();
    })
    .catch((err) => console.error(err));
}

// 수정 버튼을 누르면~
// 1. 수정을 위한 입력창으로 바뀜
function editVisitor(id) {
  const form = document.forms["visitor-form"];
  axios({
    url: `/visitor/${id}`,
    method: "get",
  })
    .then((res) => {
      console.log(res.data);
      const { id, name, comment } = res.data;
      form.name.value = name;
      form.comment.value = comment;

      const btnContainer = document.getElementById("btn-group");
      const html = `
        <button type="button" onclick="editDo(${id})">수정하기</button>
        <button type="button" onclick="editCancel()">수정취소</button>
        `;
      btnContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
}

// 2. 실제 수정 데이터를 요청
function editDo(id) {
  const form = document.forms["visitor-form"];
  if (form.name.value.length === 0 || form.comment.value.length === 0) {
    alert("이름과 방명록을 모두 입력해주세요.");
    return;
  }
  // 테이블 생성시 name 컬럼을 varchar(10)으로 설정. => 프론트에서 유효성검사 후 데이터 전송
  if (form.name.value.length > 10) {
    alert("이름은 10자 이하로 작성해주세요");
    return;
  }
  axios({
    url: "/visitor",
    method: "patch",
    data: {
      id: id,
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      const tr = document.querySelector(`#tr_${id}`);
      console.log(tr.children);
      const children = tr.children; // 배열 형태 [td, td, td, td, td]
      children[1].textContent = form.name.value;
      children[2].innerHTML = form.comment.value;
      editCancel();
    })
    .catch((err) => {
      console.error(err);
    });
}

function editCancel() {
  const form = document.forms["visitor-form"];
  form.reset();
  const btnContainer = document.getElementById("btn-group");
  btnContainer.innerHTML = `<button type="button" onclick="createVisitor()">방명록 등록</button>`;
}
