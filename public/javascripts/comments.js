// const handleDelete = (commentId) => {
//     return async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/answers/${commentId}`, {method: "DELETE"});
//         if (!res.ok) {
//           throw res;
//         }
//         document.querySelector(`#${commentId}`).remove();
//       } catch (err) {
//         console.error(err);
//       }
//     };
//   };
// const removeSecondDiv = (buttonId) => {
//     const removeDiv = document.getElementById(buttonId);
//     removeDiv.remove();
// }

window.addEventListener("DOMContentLoaded", event => {

    console.log('Comment JS loaded')
    const deleteButtonArr = document.querySelectorAll('.delete-button');

    deleteButtonArr.forEach(button => {
        console.log("for Each")
        console.log(button)
        button.addEventListener("click", async (e) => {

                console.log("Event Listener")
                // button.id
                // button.innerHTML = "hello"
                // try {

                const res = await fetch(`/comment/${e.target.id.split('-')[1]}`, { method: "DELETE" })
                if (res) {
                    e.target.parentNode.remove();
                }
                // }catch (e) {

                // }
                // })
        });
    })
})