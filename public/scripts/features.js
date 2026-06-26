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

  function initLightbox() {
    if (cfg.lightbox === false) return;
    if (document.querySelector(".lightbox-overlay")) return;

    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = '<button class="lightbox-close">&times;</button><img class="lightbox-img" src="" alt=""><p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector(".lightbox-img");
    var capEl = overlay.querySelector(".lightbox-caption");
    var closeBtn = overlay.querySelector(".lightbox-close");

    function open(src, alt) {
      imgEl.src = src;
      imgEl.alt = alt || "";
      capEl.textContent = alt || "";
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function close() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      imgEl.src = "";
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === imgEl) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    if (cfg.lightboxGallery !== false) {
      document.querySelectorAll(".gallery-item img").forEach(function (img) {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
          open(img.src, img.alt);
        });
      });
    }

    if (cfg.lightboxContent !== false) {
      document.querySelectorAll(".prose-neon img").forEach(function (img) {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
          open(img.src, img.alt);
        });
      });
    }
  }

  function initAll() {
    initCodeBlocks();
    initLightbox();
  }

  window._reinitFeatures = initAll;

  document.addEventListener("DOMContentLoaded", initAll);
})();