(function () {
  var cfg = {};
  try {
    var el = document.getElementById("feat-config");
    if (el) cfg = JSON.parse(el.textContent);
  } catch (_) {}

  function initCodeBlocks() {
    var pres = document.querySelectorAll(".prose-neon pre");
    if (!pres.length) return;

    pres.forEach(function (pre) {
      var code = pre.querySelector("code");
      if (!code) return;
      if (pre.parentElement && pre.parentElement.classList.contains("code-block-wrap")) return;

      var lang = "";
      var cls = code.className || "";
      var m = cls.match(/language-(\w+)/);
      if (m) lang = m[1];
      if (!lang) {
        var dl = pre.getAttribute("data-language");
        if (dl) lang = dl;
      }

      var lines = code.textContent.split("\n").length - 1;
      if (lines < 1) lines = 1;

      var wrap = document.createElement("div");
      wrap.className = "code-block-wrap";

      var header = document.createElement("div");
      header.className = "code-block-header";

      if (cfg.showLanguage !== false && lang) {
        var langBadge = document.createElement("span");
        langBadge.className = "code-lang";
        langBadge.textContent = lang;
        header.appendChild(langBadge);
      } else {
        var spacer = document.createElement("span");
        header.appendChild(spacer);
      }

      var headerRight = document.createElement("div");
      headerRight.className = "code-header-right";

      if (cfg.showLineNumbers !== false) {
        var lineCount = document.createElement("span");
        lineCount.className = "code-line-count";
        lineCount.textContent = lines + " lines";
        headerRight.appendChild(lineCount);
      }

      if (cfg.enableCopy !== false) {
        var copyBtn = document.createElement("button");
        copyBtn.className = "code-copy-btn";
        copyBtn.textContent = "复制";
        copyBtn.addEventListener("click", function () {
          var text = code.textContent;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
              copyBtn.textContent = "已复制";
              setTimeout(function () { copyBtn.textContent = "复制"; }, 2000);
            });
          } else {
            var ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            copyBtn.textContent = "已复制";
            setTimeout(function () { copyBtn.textContent = "复制"; }, 2000);
          }
        });
        headerRight.appendChild(copyBtn);
      }

      header.appendChild(headerRight);
      wrap.appendChild(header);

      if (cfg.showLineNumbers !== false) {
        code.style.counterReset = "line";
        var lineNodes = code.innerHTML.split("\n");
        code.innerHTML = "";
        lineNodes.forEach(function (ln, i) {
          if (i === lineNodes.length - 1 && ln.trim() === "") return;
          var lineEl = document.createElement("span");
          lineEl.className = "code-line";
          lineEl.innerHTML = ln || " ";
          code.appendChild(lineEl);
          if (i < lineNodes.length - 2 || ln.trim() !== "") {
            code.appendChild(document.createTextNode("\n"));
          }
        });
      }

      var threshold = cfg.autoFoldThreshold || 20;
      if (lines > threshold) {
        wrap.classList.add("code-folded");
        var expandBtn = document.createElement("button");
        expandBtn.className = "code-expand-btn";
        expandBtn.textContent = "展开全部 (" + lines + " 行)";
        expandBtn.addEventListener("click", function () {
          wrap.classList.remove("code-folded");
          expandBtn.remove();
        });
        wrap.appendChild(expandBtn);
      }

      pre.parentNode.replaceChild(wrap, pre);
      wrap.insertBefore(pre, wrap.querySelector(".code-expand-btn"));
    });
  }

  function initActiveNav() {
    var path = window.location.pathname;
    document.querySelectorAll("#desktop-nav .nav-link, #mobile-drawer .nav-link").forEach(function(link) {
      link.classList.remove("active");
      var href = link.getAttribute("href");
      if (!href || href === "#" || href.startsWith("javascript:")) return;
      if (href === "/" && path === "/") {
        link.classList.add("active");
      } else if (href !== "/" && path.startsWith(href)) {
        link.classList.add("active");
      }
    });
  }

  var _navShadowInitialized = false;
  function initNavShadow() {
    if (_navShadowInitialized) return;
    _navShadowInitialized = true;
    var nav = document.querySelector("nav");
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle("nav-scrolled", window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initAll() {
    initCodeBlocks();
    initActiveNav();
    initNavShadow();
  }

  window._reinitFeatures = initAll;
  window._reinitActiveNav = initActiveNav;

  document.addEventListener("DOMContentLoaded", initAll);
})();