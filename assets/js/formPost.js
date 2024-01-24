const formPost = document.querySelector("#addGoal");

function alertGoal(e) {
  Swal.fire({
    title: "Good job!",
    text: "you successfully added a goal!!",
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
  });
}

formPost.addEventListener("submit", alertGoal);
