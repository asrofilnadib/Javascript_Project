document.getElementById("toggler").addEventListener("click", function () {
  var content = document.getElementById("content");
  if (content.style.display === "none") {
    content.style.display = "block"; // Show the content
  } else {
    content.style.display = "none"; // Hide the content
  }
});
