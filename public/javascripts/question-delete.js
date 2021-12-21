window.addEventListener("DOMContentLoaded", (event) => {
  // console.log('Comment JS loaded')
  const deleteButtonArr = document.querySelectorAll(".delete-button");

  deleteButtonArr.forEach((button) => {
    // console.log("for Each")
    // console.log(button)
    button.addEventListener("click", async (e) => {
      console.log("Event Listener")
      console.log(e.target.id.split("-")[1]);
      e.stopPropagation();
      // const td = document.getElementsByTagName("td")
      const res = await fetch(`/question/${e.target.id.split("-")[1]}`, {
        method: "DELETE",
      });
      console.log(res);
      if (res) {
        e.target.parentNode.remove();
      }
    });
  });
});
