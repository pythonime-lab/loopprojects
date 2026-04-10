// Carousel functionality for article pages
function initializeArticleCarousel(currentArticleUrl) {
  // Auto-detect current article URL if not provided
  if (!currentArticleUrl) {
    const pathname = window.location.pathname;
    currentArticleUrl =
      pathname.substring(pathname.lastIndexOf("/") + 1) || "article.html";
  }

  const carousel = document.getElementById("relatedCarousel");
  const cardWidth = 324; // Card width (300px) + gap (24px)

  // Generate carousel from ARTICLES registry, excluding current article
  function renderRelatedArticles() {
    const articles = ARTICLES.filter(
      (article) => article.url !== currentArticleUrl
    );

    carousel.innerHTML = articles
      .map((article) => {
        // Extract just the filename from the full path
        const filename = article.url.split("/").pop();
        return `
      <a href="./${filename}" class="carousel-card">
        <h3>${article.title}</h3>
        <p>${
          article.title.split(":")[0]
        } security guide for modern applications.</p>
        <div class="carousel-card-tags">
          <span class="article-tag">${article.tag}</span>
        </div>
      </a>
    `;
      })
      .join("");
  }

  function scrollCarousel(direction) {
    const scrollAmount = cardWidth * direction;
    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  function updateClippedCards() {
    const carouselRect = carousel.getBoundingClientRect();
    const wrapper = carousel.closest(".carousel-wrapper");
    const cards = carousel.querySelectorAll(".carousel-card");
    const navButtons =
      wrapper.parentElement.querySelectorAll(".carousel-nav-btn");

    // Check if scrolling is needed
    const totalWidth = cards.length * cardWidth;
    const wrapperWidth = carouselRect.width;
    const canScroll = totalWidth > wrapperWidth;

    // Hide/disable arrows if no scrolling needed
    navButtons.forEach((btn) => {
      if (!canScroll) {
        btn.style.opacity = "0.2";
        btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
        btn.style.pointerEvents = "none";
        btn.style.cursor = "not-allowed";
      } else {
        btn.style.opacity = "";
        btn.style.borderColor = "";
        btn.style.pointerEvents = "";
        btn.style.cursor = "";
      }
    });

    // Only show clipping indicators if scrolling is possible
    if (!canScroll) {
      wrapper.classList.remove("is-clipped-left", "is-clipped-right");
      return;
    }

    let hasLeftClip = false;
    let hasRightClip = false;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const clippedLeft = rect.left < carouselRect.left + 2;
      const clippedRight = rect.right > carouselRect.right - 2;
      if (clippedLeft) hasLeftClip = true;
      if (clippedRight) hasRightClip = true;
    });
    if (wrapper) {
      wrapper.classList.toggle("is-clipped-left", hasLeftClip);
      wrapper.classList.toggle("is-clipped-right", hasRightClip);
    }
  }

  // Expose scrollCarousel globally for onclick handlers
  window.scrollCarousel = scrollCarousel;

  // Initialize carousel
  renderRelatedArticles();
  carousel.addEventListener("scroll", updateClippedCards, {
    passive: true,
  });
  window.addEventListener("resize", updateClippedCards, {
    passive: true,
  });
  updateClippedCards();
}
