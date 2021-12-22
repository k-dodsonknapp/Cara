window.addEventListener("DOMContentLoaded", (event) => {

  const questionDeleteButtonArr = document.querySelectorAll(".delete-button");

  questionDeleteButtonArr.forEach((button) => {

    button.addEventListener("click", async (e) => {
      e.stopPropagation();

      const res = await fetch(`/question/${e.target.id.split("-")[1]}`, {
        method: "DELETE",
      });

      if (res) {
        window.alert("Are you sure you want to delete your question?")
        e.target.parentNode.parentNode.remove();
      }
    });
  });
});
