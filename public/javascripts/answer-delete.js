window.addEventListener("DOMContentLoaded", (event) => {

    const deleteButtonArr = document.querySelectorAll(".answer-delete-button");

    deleteButtonArr.forEach(button => {
        button.addEventListener("click", async (e) => {

            e.stopPropagation();
            const res = await fetch(`/answer/${e.target.id.split("-")[1]}/delete`, {
                method: "DELETE"
            });

            if (res) {
                e.target.parentNode.parentNode.parentNode.parentNode.remove();
            }
        });
    });
});
