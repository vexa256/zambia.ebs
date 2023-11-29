window.onload = function () {
  var myScriptsDiv = document.getElementById("my-scripts");

  // Create the first script element
  var script1 = document.createElement("script");
  script1.src = "";
  script1.defer = true;

  // Append the first script element to the my-scripts div after a delay of 0 milliseconds
  // setTimeout(function () {
  //   myScriptsDiv.appendChild(script1);
  // }, 0);

  // Create the second script element
  var script2 = document.createElement("script");
  script2.src = "./assets/js/scripts.bundle.js";
  script2.defer = true;

  // Append the second script element to the my-scripts div after a delay of 500 milliseconds
  setTimeout(function () {
    myScriptsDiv.appendChild(script2);
  }, 500);
};
