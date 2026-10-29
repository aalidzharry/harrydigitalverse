const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const articlePanel = document.querySelector("#article-panel");
const articleContent = document.querySelector("#article-content");
const closeArticle = document.querySelector(".article-close");

const articles = {
  "article-1": {
    title: "My First Website Went Live",
    body: [
      "I started without fully understanding the difference between Git and GitHub. My first step was not to build a large website, but to understand the roles of index.html, style.css and script.js.",
      "After learning to run a website using Live Server, I discovered that changes on my laptop are not automatically reflected on a live website. The updated files must be pushed to GitHub before visitors can see the latest version.",
      "The biggest lesson: something that looks complicated becomes easier when it is broken down into smaller steps."
    ]
  },

  "article-2": {
    title: "A Landing Page Is More Than Good Design",
    body: [
      "An attractive design can make people stop and look, but a clear message helps them understand what to do next.",
      "If a landing page promises to teach website building but its button leads to a marketplace filled with unrelated categories, visitors may become confused. That is why I reshaped Harry Digital into a central hub that explains the wider creative journey, with affiliate resources as just one part of it.",
      "The biggest lesson: the promise made on the first page should match the experience visitors receive after clicking a button."
    ]
  },

  "article-3": {
    title: "Building a Brand Before It Becomes Big",
    body: [
      "A brand is more than a logo. It is the feeling, story, colours, communication style and experience that people remember.",
      "Harry Digital represents learning and building. Harry Games represents fun and progression. Yenzi285 represents calm, visual storytelling and meaning.",
      "Although each brand has its own identity, they all come from the same journey: starting small and building consistently."
    ]
  },

  "article-4": {
    title: "Learning to Code by Creating Games",
    body: [
      "Games provide a practical way to learn about variables, functions, timers, scores and level progression.",
      "Harry Games began with a simple target-clicking game. Each level introduces changes to the timer and the number of targets players need to hit.",
      "This is not the final version. It is a foundation that can grow with animations, characters, sound effects, a credit system and more challenging gameplay."
    ]
  }
};

document.querySelectorAll("[data-article]").forEach((button) => {
  button.addEventListener("click", () => {
    const article = articles[button.dataset.article];
    if (!articlePanel || !articleContent || !article) return;

    articleContent.innerHTML = `
      <h3>${article.title}</h3>
      ${article.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    `;
    articlePanel.hidden = false;
    articlePanel.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

if (closeArticle && articlePanel) {
  closeArticle.addEventListener("click", () => {
    articlePanel.hidden = true;
  });
}
/*
========================================
HOMEPAGE GAME PROGRESS
========================================
*/

const homepageTapLevel =
    document.getElementById("homepage-tap-level");

const continueTapButton =
    document.getElementById("continue-tap-button");

const savedTapLevel =
    Number(
        localStorage.getItem("harryTapRelaxLevel")
    ) || 1;


if (homepageTapLevel) {
    homepageTapLevel.textContent =
        Math.min(
            Math.max(savedTapLevel, 1),
            100
        );
}


if (continueTapButton) {
    continueTapButton.addEventListener("click", () => {
        localStorage.setItem(
            "openTapRelaxAutomatically",
            "true"
        );
    });
}
/* =========================================
   YENZI285 AUTO QUOTES
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const yenziGrid =
        document.getElementById("yenzi-video-grid");

    if (!yenziGrid) {
        return;
    }

    if (typeof yenziQuotes === "undefined") {
        yenziGrid.innerHTML = `
            <p style="color: white; text-align: center;">
                Data quote tidak dapat dibaca.
            </p>
        `;

        console.error(
            "yenziQuotes tidak dijumpai. Semak fail quotes.js."
        );

        return;
    }

    /*
       Ambil hanya entry yang mempunyai video.
    */
    const realVideos =
        yenziQuotes.filter((quote) => {
            return Boolean(quote.video);
        });

    /*
       Nombor terbesar = video terbaru.
       Contoh: 007, 006, 005...
    */
    const sortedQuotes =
        [...realVideos].sort((a, b) => {
            return Number(b.number) - Number(a.number);
        });

    /*
       Homepage hanya paparkan 3 terbaru.
    */
    const latestQuotes =
        sortedQuotes.slice(0, 3);

    yenziGrid.innerHTML = latestQuotes
        .map((quote) => {

            const videoUrl =
                `https://www.tiktok.com/@yenzi285/video/${quote.video}`;

            return `
                <article class="yenzi-video-card">

                    <div class="yenzi-video-number">
                        ${quote.number}
                    </div>

                    <div class="yenzi-video-embed">

                        <blockquote
                            class="tiktok-embed"
                            cite="${videoUrl}"
                            data-video-id="${quote.video}"
                            style="max-width: 605px; min-width: 100%;"
                        >
                            <section>
                                <a
                                    href="${videoUrl}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Watch Quote ${quote.number}
                                </a>
                            </section>
                        </blockquote>

                    </div>

                    <div class="yenzi-video-info">

                        <p class="yenzi-video-label">
                            ${
                                quote.category === "diary"
                                    ? "YENZI DIARY"
                                    : quote.category === "game"
                                        ? "HARRY GAMES"
                                        : "YENZI285 QUOTE"
                            }
                        </p>

                        <h3>
                            ${quote.title}
                        </h3>

                        <p>
                            ${quote.description}
                        </p>

                        <a
                            class="yenzi-tiktok-button"
                            href="${videoUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch on TikTok ↗
                        </a>

                    </div>

                </article>
            `;
        })
        .join("");

    if (
        window.tiktokEmbed &&
        typeof window.tiktokEmbed.lib?.render === "function"
    ) {
        window.tiktokEmbed.lib.render();
    }

});
