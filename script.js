function openCloseCardFeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElem = document.querySelectorAll(".fullElems");
  let allFullElemBack = document.querySelectorAll(".back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      // console.log(elem);
      // console.log(allFullElem);

      allFullElem[elem.id].style.display = "block";
    });
  });

  allFullElemBack.forEach((back) => {
    //   console.log(back.id);
    back.addEventListener("click", () => {
      allFullElem[back.id].style.display = "none";
    });
  });
}
openCloseCardFeature();
