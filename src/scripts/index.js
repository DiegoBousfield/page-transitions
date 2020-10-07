const loadPage = async (url) =>
  await fetch(url, { method: "GET" }).then((response) => response.text());

const main = document.querySelector("main");
const animate = (oldContent, newContent) => {
  const fadeOut = oldContent.animate(
    {
      opacity: [1, 0],
    },
    500
  );

  fadeOut.onfinish = () => {
    newContent.animate({ opacity: [0, 1] }, 500);
    oldContent.parentNode.removeChild(oldContent);
  };
};

const changePage = () => {
  const url = window.location.href;

  loadPage(url).then((responseText) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = responseText;
    const oldContent = document.querySelector(".content");
    const newContent = wrapper.querySelector(".content");

    main.appendChild(newContent);
    animate(oldContent, newContent);
  });
};

window.addEventListener("popstate", changePage);

document.addEventListener("click", (e) => {
  let el = e.target;

  while (el && !el.href) {
    el = el.parentNode;
  }

  if (el) {
    e.preventDefault();
    history.pushState(null, null, el.href);
    changePage();
    return;
  }
});
