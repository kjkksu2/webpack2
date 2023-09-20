import "../css/vendors.css";
import styles from "../css/notification.module.css";
import CheckmarkImage from "../../images/checkmark.svg";
import { getMotivationalPictures } from "./api";

export function renderTodos(todos) {
  const renderedItemArray = todos.map(function (todo) {
    const className = todo.completed ? "completed" : "";
    const completionClass = todo.completed ? "checked" : "";
    return `
              <li data-id="${todo.id}" class="${className}">
                  <span class="custom-checkbox">
                      <img class="check" src="${CheckmarkImage}" width="22" height="22"></img>
                      <input class="real-checkbox" type="checkbox" ${completionClass} />
                  </span>
                  <label>${todo.text}</label>
                  <span class="delete"></span>
              </li>
          `;
  });
  document.querySelector(".todo-list").innerHTML = renderedItemArray.join("");
  renderMotivationalPictures();
}

export function clearNewTodoInput() {
  document.querySelector(".new-todo").value = "";
  showNotification();
}

export function getTodoId(element) {
  return parseInt(
    element.dataset.id ||
      element.parentNode.dataset.id ||
      element.parentNode.parentNode.dataset.id,
    10
  );
}

function showNotification() {
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("vendor-notification");
  notificationElement.textContent = "Todo item added";
  document.body.append(notificationElement);

  // setTimeout(() => {
  //   const notificationElement = document.querySelector(
  //     `.${styles.notification}`
  //   );
  //   notificationElement.remove();
  // }, 2000);
}

function renderMotivationalPictures() {
  getMotivationalPictures().then((pictures) => {
    const motivationalPicturesHtml = `
      <div class="motivational-pictures">
        ${pictures
          .map((picture) => {
            return '<img class="header-image" src="' + picture + '" />';
          })
          .join("")}
      </div>
    `;
    const motivationalPicturesContainer = document.querySelector(
      ".motivational-pictures-container"
    );
    motivationalPicturesContainer.innerHTML = motivationalPicturesHtml;
  });
}
