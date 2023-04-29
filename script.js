function getPosts(userId) {
  fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((posts) => {
      document.querySelector(".posts").innerHTML = "";
      for (let post of posts) {
        let content = `
        <div class="post">
          <h4>${post.title}</h4>
          <h6>${post.body}</h6>
        </div>
        `;
        document.querySelector(".posts").innerHTML += content;
      }
    });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject("error with users request");
        }
      })
      .then((users) => {
        document.querySelector(".users").innerHTML = "";
        for (let user of users) {
          let content = `
        <div class="user" onclick="userClicked(${user.id}, this)">
          <h4>${user.name}</h4>
          <h6>${user.email}</h6>
        </div>
        `;
          document.querySelector(".users").innerHTML += content;
        }
        resolve();
      });
  });
}

getUsers()
  .then(() => {
    getPosts(1);
  })
  .catch((error) => {
    console.log(error);
  });

function userClicked(id, el) {
  getPosts(id);
  let selectedElements = document.getElementsByClassName("selected");
  for (element of selectedElements) {
    element.classList.remove("selected");
  }
  el.classList.add("selected");
}

// #######
// another solution with xml http request
// function getPosts(userId) {
//   let request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     "https://jsonplaceholder.typicode.com/posts?userId=" + userId
//   );
//   request.responseType = "json";
//   request.send();
//   request.onload = function () {
//     if (request.status >= 200 && request.readyState == 4) {
//       let posts = request.response;
//       document.querySelector(".posts").innerHTML = "";
//       for (let post of posts) {
//         let content = `
//         <div class="post">
//           <h4>${post.title}</h4>
//           <h6>${post.body}</h6>
//         </div>
//         `;
//         document.querySelector(".posts").innerHTML += content;
//       }
//     } else {
//       alert("error");
//     }
//   };
// }

// function getUsers() {
//   let request = new XMLHttpRequest();
//   request.open("GET", "https://jsonplaceholder.typicode.com/users");
//   request.responseType = "json";
//   request.send();
//   request.onload = function () {
//     if (request.status >= 200 && request.readyState == 4) {
//       let users = request.response;
//       document.querySelector(".users").innerHTML = "";
//       for (let user of users) {
//         let content = `
//         <div class="user" onclick="userClicked(${user.id}, this)">
//           <h4>${user.name}</h4>
//           <h6>${user.email}</h6>
//         </div>
//         `;
//         document.querySelector(".users").innerHTML += content;
//       }
//     } else {
//       alert("error");
//     }
//   };
// }

// getPosts(1);
// getUsers();

// function userClicked(id, el) {
//   getPosts(id);
//   let selectedElements = document.getElementsByClassName("selected");
//   for (element of selectedElements) {
//     element.classList.remove("selected");
//   }
//   el.classList.add("selected");
// }
