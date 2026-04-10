// Reusable footer component for all pages
function createFooter(isArticlePage = false) {
  const basePath = isArticlePage ? "../" : "./";

  const footerHTML = `
    <footer>
      <p>Developed with passion by <strong>Loop</strong></p>
      <p>
        Special thanks to <strong>Low Signal Workshop</strong> | Exploring the
        intersection of development and security
      </p>
      <p style="margin-top: 1rem">
        © 2026 Loop Projects · All rights reserved ·
        <a href="${basePath}legal.html">Legal Terms</a> ·
        <a href="${basePath}privacy.html">Privacy</a>
      </p>
    </footer>
  `;

  return footerHTML;
}
