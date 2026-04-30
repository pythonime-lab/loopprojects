// Reusable header component for all pages
function createHeader(isArticlePage = false) {
  const basePath = isArticlePage ? "../" : "./";

  const navHTML = `
    <nav>
      <a href="${basePath}index.html" class="logo"><span class="brand-loop">Loop</span> <span class="brand-projects">Projects</span></a>
      <ul class="nav-links">
        <li><a href="${basePath}index.html">Blog</a></li>
        <li><a href="${basePath}wordpress-security-services.html">Services</a></li>
        <li><a href="https://github.com/pythonime-lab?tab=repositories" target="_blank">Github</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" onclick="var n=this.closest('nav');var open=n.classList.toggle('nav-open');this.textContent=open?'▲':'▼';this.setAttribute('aria-expanded',open);">▼</button>
    </nav>
  `;

  return navHTML;
}

// Auto-inject header if on a page (look for placeholder or insert before first section)
function injectHeader(isArticlePage = false) {
  const headerContainer =
    document.querySelector("header") ||
    document.body.querySelector("nav")?.parentElement;

  if (!headerContainer) {
    const navHTML = createHeader(isArticlePage);
    const placeholder = document.querySelector("[data-header-placeholder]");

    if (placeholder) {
      placeholder.innerHTML = navHTML;
    } else {
      // Insert before the first major section
      const firstSection =
        document.querySelector("section") ||
        document.querySelector("article") ||
        document.querySelector("main");
      if (firstSection) {
        firstSection.insertAdjacentHTML("beforebegin", navHTML);
      }
    }
  }
}
