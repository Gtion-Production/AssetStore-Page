// Docs navigation without full page reloads: swaps the article, sidebar and crumbs in place.
// Falls back to a normal navigation on any problem (file://, fetch error, unexpected markup).
(function () {
  if (!window.fetch || !window.history || !document.querySelector(".docs")) return;
  var cache = {};

  function sameDocs(a) {
    if (a.target || a.hasAttribute("download") || a.origin !== location.origin) return false;
    if (!/\/products\/vectoria\/docs\//.test(a.pathname) || !/\.html$/.test(a.pathname)) return false;
    return !(a.pathname === location.pathname && a.hash);
  }
  function load(url) {
    if (!cache[url]) cache[url] = fetch(url, { credentials: "same-origin" }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    });
    return cache[url];
  }
  function folds() {
    var o = {};
    document.querySelectorAll(".toc.tree details.grp").forEach(function (d) { o[d.getAttribute("data-k")] = d.open; });
    return o;
  }
  function swap(html, url, push) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var nBody = doc.querySelector(".doc-body"), nToc = doc.querySelector(".toc.tree"), nCr = doc.querySelector(".crumbs");
    var body = document.querySelector(".doc-body"), toc = document.querySelector(".toc.tree"), cr = document.querySelector(".crumbs");
    if (!nBody || !nToc || !body || !toc) throw new Error("markup");
    var prev = folds();
    if (push) history.pushState(null, "", url);
    document.title = doc.title;
    body.innerHTML = nBody.innerHTML;
    if (nCr && cr) cr.innerHTML = nCr.innerHTML;
    // keep only the sidebar markup (drop the inline fold-state script) and restore user folds
    toc.innerHTML = nToc.innerHTML.replace(/<script[\s\S]*?<\/script>/g, "");
    toc.querySelectorAll("details.grp").forEach(function (d) {
      var k = d.getAttribute("data-k");
      if (!d.querySelector("a.cur, a.anc") && k in prev) d.open = prev[k];
    });
    var h = location.hash && document.querySelector(location.hash);
    if (h) h.scrollIntoView(); else window.scrollTo(0, 0);
  }
  function go(url, push) {
    load(url).then(function (html) { swap(html, url, push); }).catch(function () { location.href = url; });
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !sameDocs(a) || a.href === location.href) { if (a && a.href === location.href && sameDocs(a)) e.preventDefault(); return; }
    e.preventDefault();
    go(a.href, true);
  });
  window.addEventListener("popstate", function () { go(location.href, false); });
  document.addEventListener("mouseover", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (a && sameDocs(a)) load(a.href).catch(function () { delete cache[a.href]; });
  });
})();

// Click an image in the article to preview it full size; click, or press Esc, to close.
(function () {
  var box;
  function close() { if (box) { box.remove(); box = null; } }
  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest(".doc-body img");
    if (!img) { if (box && e.target === box) close(); return; }
    close();
    box = document.createElement("div");
    box.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out";
    var big = document.createElement("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    big.style.cssText = "max-width:100%;max-height:100%;object-fit:contain;border-radius:4px";
    box.appendChild(big);
    box.addEventListener("click", close);
    document.body.appendChild(box);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
