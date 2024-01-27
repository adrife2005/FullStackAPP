const formUpdt = document.querySelector("#updGoal");
const hamburger_buttom = document.querySelector(".hamburguer-button");
const mobile_menu = document.querySelector(".mobile-menu");
const lineFirstOne = document.querySelectorAll(".line")[0];
const lineRemove = document.querySelectorAll(".line")[1];
const lineSecondOne = document.querySelectorAll(".line")[2];
const header = document.querySelector("#header");
const navbar = document.querySelector("nav");
const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
  function sidebarMovile() {
    mobile_menu.classList.toggle("active");
    lineFirstOne.classList.toggle("open");
    lineRemove.classList.toggle("close");
    lineSecondOne.classList.toggle("open");
    body.classList.toggle("overflow");
  }

  function scrollEvent() {
    if (window.scrollY > 0) {
      navbar.classList.add("p-5");
      navbar.classList.remove("p-20");
    } else {
      navbar.classList.remove("p-5");
      navbar.classList.add("p-20");
    }
  }

  function updtGoal(e) {
    e.preventDefault();
    const unindexed_array = $(this).serializeArray();
    let data = {};

    $.map(unindexed_array, function (n, i) {
      data[n["name"]] = n["value"];
    });

    const request = {
      url: `https://to-do-app-qa3t.onrender.com/api/goals/${data.id}`,
      method: "PUT",
      data: data,
    };

    $.ajax(request).done(function (res) {
      Swal.fire({
        title: "Good job!",
        text: "you successfully updated your goal!!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  if (window.location.pathname == "/") {
    $ondelete = $(".card .card-item button a.delete-goal");
    $ondelete.click(function () {
      const id = $(this).attr("data-id");

      const request = {
        url: `https://to-do-app-qa3t.onrender.com/api/goals/${id}`,
        method: "DELETE",
      };

      const verdad = true;

      if (verdad) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            $.ajax(request).done(function (res) {
              Swal.fire({
                title: "Deleted!",
                text: "Your goal has been deleted.",
                icon: "success",
                showConfirmButton: false,
              });
              setTimeout(() => {
                location.reload();
              }, 1500);
            });
          }
        });
      }
    });
  }
  // EventListeners
  hamburger_buttom.addEventListener("click", sidebarMovile);
  formUpdt.addEventListener("submit", updtGoal);
  document.addEventListener("scroll", scrollEvent);
});

console.log("Welcome to my ToDoApp =)))");
console.log("Check out my GitHub to se my other proyects ❤️❤️");
