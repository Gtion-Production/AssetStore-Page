/* Mobile hamburger menu for the shared header (<=768px). */
(function () {
  var header = document.querySelector("header");
  var nav = header && header.querySelector("nav");
  if (!nav) return;

  var css = [
    ".nav-toggle{display:none;background:none;border:0;padding:8px;margin-right:-8px;cursor:pointer;width:44px;height:44px;position:relative}",
    ".nav-toggle span{position:absolute;left:10px;right:10px;height:3px;background:#fff;border-radius:2px;transition:transform .25s,opacity .2s,top .25s}",
    ".nav-toggle span:nth-child(1){top:13px}.nav-toggle span:nth-child(2){top:20px}.nav-toggle span:nth-child(3){top:27px}",
    "header.nav-open .nav-toggle span:nth-child(1){top:20px;transform:rotate(45deg)}",
    "header.nav-open .nav-toggle span:nth-child(2){opacity:0}",
    "header.nav-open .nav-toggle span:nth-child(3){top:20px;transform:rotate(-45deg)}",
    "@media (max-width:768px){",
    ".nav-toggle{display:block}",
    "header nav{position:fixed;top:var(--header-h);right:0;bottom:0;width:50%;min-width:200px;background:#000;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:0;padding:24px 16px;transform:translateX(100%);visibility:hidden;transition:transform .3s ease,visibility 0s .3s;overflow-y:auto}",
    "header.nav-open nav{transform:none;visibility:visible;transition:transform .3s ease}",
    "header nav a,header nav a:nth-child(n+4){display:block!important;text-align:center;font-size:18px;padding:20px 0;border-bottom:1px solid #2a2a2a;color:#fff}",
    "header nav a:first-child{border-top:1px solid #2a2a2a}",
    "header nav a.active{color:var(--accent,#4ea3dc);border-bottom:1px solid #2a2a2a}",
    "body.nav-lock{overflow:hidden}",
    "}"
  ].join("");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement("button");
  btn.className = "nav-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Toggle menu");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  header.querySelector(".container").appendChild(btn);

  function set(open) {
    header.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-lock", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  btn.addEventListener("click", function () { set(!header.classList.contains("nav-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", function (e) { if (!header.contains(e.target)) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 768) set(false); });
})();
