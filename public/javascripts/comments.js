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

    // console.log('Comment JS loaded')
    const deleteButtonArr = document.querySelectorAll('.delete-button');

    deleteButtonArr.forEach(button => {

<<<<<<< HEAD
        button.addEventListener("click", async (e) => {
            
=======
            console.log("Event Listener")
            console.log(e.target.id.split("-")[1]);
>>>>>>> 5b5debfaf52040516eba0056048d2599ddc007c6
            e.stopPropagation();
            const res = await fetch(`/comment/${e.target.id.split('-')[1]}`, { method: "DELETE" })
            if (res) {
                e.target.parentNode.remove();
            }
        });
    })
})
