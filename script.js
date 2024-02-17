document.addEventListener("DOMContentLoaded", () => {
  const outerCircle1 = document.getElementById("outer-circle1");
  const outerCircle2 = document.getElementById("outer-circle2");
  // Listen for the animationend event of magic-circle-animation
  outerCircle1.addEventListener("animationend", () => {
    outerCircle1.classList.add("complete");
    console.log("animationend event fired");
  });
  outerCircle2.addEventListener("animationend", () => {
    outerCircle2.classList.add("complete");
    console.log("animationend event fired");
  });
});
