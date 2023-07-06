// $(document).on("click", ".like-comment", (e) => {
//   const ref = e.target.getAttribute("data-ref");

//   const likedComments = getOrSetItem("liked-comments");
//   let likes = $(this).closest(".like-count").text();

//   if (!likedComments.includes(ref)) {
//     e.target.classList.toggle("animate");
//     e.target.classList.add("fa-check");
//     e.target.classList.remove("fa-star");
//     likedComments.push(ref);
//     console.log("Liked");

//     $(this)
//       .closest(".like-count")
//       .text((likes += 1));
//     localStorage.setItem("liked-comments", JSON.stringify(likedComments));
//     actionLogger({ cat: "create", activity: "Liked a comment" });
//     $.ajax({
//       url: baseUrl + `api/v1/blogs/comment/${ref}?action=like`,
//       beforeSend: (xhr) => {
//         xhr.setRequestHeader("Authorization", "Bearer " + token);
//       },
//       success: (response) => {
//         notifyUser("You like has been recorded");
//       },
//       error: (error) => {
//         handleAjaxError(error);
//       },
//     });
//   } else {
//     Swal.fire({
//       title: "Dislike comment",
//       text: "You already liked the. This action will remove it from your favorites",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, dislike",
//       cancelButtonText: "No",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.value) {
//         likedComments.pop(ref);
//         console.log("Disliked");
//         actionLogger({ cat: "delete", activity: "Disliked a comment" });
//         localStorage.setItem("liked-comments", JSON.stringify(likedComments));
//         $.ajax({
//           url: baseUrl + `api/v1/blogs/comment/${ref}?action=dislike`,
//           beforeSend: (xhr) => {
//             xhr.setRequestHeader("Authorization", "Bearer " + token);
//           },
//           success: (response) => {
//             notifyUser("Your like has been removed");
//           },
//           error: (error) => {
//             handleAjaxError(error);
//           },
//         });
//       } else {
//       }
//     });
//   }
// });
