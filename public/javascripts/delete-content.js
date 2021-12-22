window.addEventListener("DOMContentLoaded", event => {

    // console.log('Comment JS loaded')
    const commentDeleteArr = document.querySelectorAll('.delete-button');

    commentDeleteArr.forEach(button => {

        button.addEventListener("click", async (e) => {
        // const td = document.getElementsByTagName("td")
            e.stopPropagation();
            const res = await fetch(`/comment/${e.target.id.split('-')[1]}`, { method: "DELETE" })
            console.log(res)
            if (res) {
                // window.alert("Are you sure you want to delete your comment?")
                e.target.parentNode.parentNode.remove()
            }
        });
    });

    const answerDeleteArr = document.querySelectorAll(".answer-delete-button");

    answerDeleteArr.forEach(button => {
        button.addEventListener("click", async (e) => {

            e.stopPropagation();
            const res = await fetch(`/answer/${e.target.id.split("-")[1]}/delete`, {
                method: "DELETE"
            });

            if (res) {
                // window.alert("Are you sure you want to delete your answer?")
                e.target.parentNode.parentNode.parentNode.parentNode.remove();
            }
        });
    });

    const questionDeleteArr = document.querySelectorAll('.question-delete-button');

    questionDeleteArr.forEach(button => {

        button.addEventListener("click", async (e) => {
        // const td = document.getElementsByTagName("td")
            e.stopPropagation();
            const res = await fetch(`/question/${e.target.id.split('-')[1]}`, { method: "DELETE" })
            console.log(res)
            if (res) {
                window.alert("Are you sure you want to delete your question?")
                e.target.parentNode.remove()
            }
        });
    });
});
