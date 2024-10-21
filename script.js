"use strict";
const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const content = document.getElementById("content");
const close = document.getElementById("close");
const add = document.getElementById("add");
const overlayadd = document.getElementById("overlay-add");
const formadd = document.getElementById("form-add");
//
function ajax(url, fnc) {
  fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      const responseEr = document.createElement("p");
      main.appendChild(responseEr);
      if (response.status !== 200) {
        responseEr.textContent = "Server Error";
      } else if (!response.ok) {
        responseEr.textContent = "Server ISNT OK ";
      }
      return response.json();
    })
    .then(function (comeback) {
      fnc(comeback);
    })
    .catch(function (errot) {});
}
ajax("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach(function (element) {
    post(element);
  });
});
//
function post(item) {
  const divID = document.createElement("div");
  divID.classList.add("post");
  divID.setAttribute("id", item.id);
  const titleID = document.createElement("p");
  titleID.innerText = item.id;
  const titleDCR = document.createElement("p");
  titleDCR.textContent = item.title;
  //delete BTN
  const delet = document.createElement("button");
  delet.classList.add("deletebtn");
  delet.textContent = "  Delete This Item";
  delet.setAttribute("delete-item", item.id);
  delet.addEventListener("click", function (del) {
    del.stopPropagation();
    const deleteId = del.target.getAttribute("delete-item");
    const deleteItem = `https://jsonplaceholder.typicode.com/posts/${deleteId}`;
    fetch(deleteItem, {
      method: "Delete",
    }).then(function () {
      divID.remove();
    });
  });
  //
  divID.addEventListener("click", function () {
    overlay.classList.add("active");
    const id = this.getAttribute("id");
    const newURL = `https://jsonplaceholder.typicode.com/posts${id}`;
    ajax(newURL, function () {
      const dscr = document.createElement("p");
      dscr.textContent = item.body;
      content.appendChild(dscr);
    });
  });
  divID.appendChild(titleID);
  divID.appendChild(titleDCR);
  divID.appendChild(delet);
  main.appendChild(divID);
}
//
close.addEventListener("click", function () {
  overlay.classList.remove("active");
  content.innerHTML = "";
});
//
add.addEventListener("click", function () {
  overlayadd.classList.add("addactive");
});
formadd.addEventListener("submit", function (prevent) {
  prevent.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: this[0].value,
      userId: 11,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((responses) => responses.json())
    .then(function (newOBJ) {
      overlayadd.classList.remove("addactive");
      prevent.target[0].value = "";
      post(newOBJ);
    });
});
