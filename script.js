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
    title: "Website pertama saya berjaya live",
    body: [
      "Saya bermula tanpa memahami beza Git dan GitHub. Langkah pertama bukan terus membina website besar, tetapi memahami fail index.html, style.css dan script.js.",
      "Selepas website boleh dibuka melalui Live Server, saya belajar bahawa perubahan di laptop belum sama dengan website yang sudah live. Fail perlu dihantar ke GitHub sebelum orang lain boleh melihat versi terbaru.",
      "Pelajaran terbesar: sesuatu yang nampak rumit boleh menjadi lebih mudah apabila dipecahkan kepada langkah kecil."
    ]
  },
  "article-2": {
    title: "Landing page bukan sekadar cantik",
    body: [
      "Design yang menarik boleh membuat orang berhenti dan melihat, tetapi mesej yang jelas membuat mereka memahami apa yang perlu dilakukan.",
      "Jika landing page bercakap tentang belajar website tetapi butangnya membawa ke marketplace dengan pelbagai kategori, pembaca boleh keliru. Sebab itu saya menukar Harry Digital menjadi rumah utama yang menerangkan keseluruhan perjalanan dan menjadikan affiliate hanya salah satu bahagian.",
      "Pelajaran terbesar: janji di halaman pertama mesti sepadan dengan pengalaman selepas orang menekan butang."
    ]
  },
  "article-3": {
    title: "Membina jenama sebelum menjadi besar",
    body: [
      "Jenama bukan sekadar logo. Ia ialah rasa, cerita, pilihan warna, cara bercakap dan pengalaman yang orang ingat.",
      "Harry Digital membawa semangat belajar dan membina. Harry Games membawa keseronokan dan perkembangan level. Yenzi285 membawa rasa tenang, visual dan makna.",
      "Walaupun ketiga-tiganya berbeza, semuanya datang daripada perjalanan yang sama: bermula kecil dan membina dengan konsisten."
    ]
  },
  "article-4": {
    title: "Mencipta game sambil belajar coding",
    body: [
      "Game memberi latihan yang sangat baik untuk memahami pemboleh ubah, fungsi, masa, skor dan perubahan level.",
      "Harry Games bermula dengan game klik sasaran yang ringkas. Setiap level mengubah masa dan jumlah sasaran yang perlu diklik.",
      "Ini bukan versi akhir. Ia ialah asas yang boleh dikembangkan kepada animasi, karakter, bunyi, sistem kredit dan cabaran yang lebih besar."
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
