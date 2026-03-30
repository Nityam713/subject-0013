import { posts } from "../data/posts.js";
import { observations } from "../data/observations.js";

function formatDate(dateInput) {
  var date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return dateInput;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function getArchiveHeading(post, postIndex) {
  var n = Number(post.archiveNumber);
  var index = Number.isFinite(n) && n >= 1 ? Math.floor(n) : postIndex + 1;
  return "Archive " + String(index).padStart(3, "0");
}

function createCard(post) {
  var density = post.metrics && post.metrics.narrativeDensity != null
    ? post.metrics.narrativeDensity
    : post.metrics && post.metrics.roi != null ? post.metrics.roi : 50;
  var genre = post.genre || "Observation";
  return (
    '<article class="card">' +
      '<div class="evidence">' +
        '<div class="crop-mark tl"></div><div class="crop-mark tr"></div><div class="crop-mark bl"></div><div class="crop-mark br"></div>' +
        '<img src="' + post.coverImage + '" alt="Evidence frame: ' + post.title + '" class="card-image" />' +
        '<div class="grid-overlay"></div>' +
        '<div class="live-num density-num">ND <span class="live-value" data-base="' + density + '">' + density + "</span></div>" +
        '<div class="live-num genre-num">' + genre + "</div>" +
      "</div>" +
      '<h2 class="card-title">' + post.title + "</h2>" +
      '<div class="card-meta">' +
        "<span>Filed <span class=\"value\">" + formatDate(post.date) + "</span></span>" +
        "<span>Coherence <span class=\"value\">" + post.rationalityScore + "%</span></span>" +
        "<span>Risk <span class=\"value\">" + post.riskLevel + "</span></span>" +
      "</div>" +
      '<p class="card-excerpt scan-text">' + post.summary + "</p>" +
      '<div class="card-actions">' +
        '<a class="open-case-link" href="post.html?slug=' + encodeURIComponent(post.slug) + '">Open ledger entry</a>' +
      "</div>" +
    "</article>"
  );
}

function renderObservations() {
  var list = document.getElementById("observationsList");
  if (!list) return;
  list.innerHTML = observations
    .map(function (entry) {
      return (
        "<li>" +
          '<span class="obs-date">' + entry.date + " / " + entry.severity + "</span>" +
          entry.note +
        "</li>"
      );
    })
    .join("");
}

function renderHome() {
  var container = document.getElementById("homeCards");
  if (!container) return;
  container.innerHTML = posts.slice(0, 9).map(createCard).join("");
  renderObservations();
}

function renderArchive() {
  var container = document.getElementById("archiveCards");
  if (!container) return;
  container.innerHTML = posts.map(createCard).join("");
}

function renderPost() {
  var title = document.getElementById("postTitle");
  var meta = document.getElementById("postMeta");
  var summary = document.getElementById("postSummary");
  var cover = document.getElementById("postCover");
  var content = document.getElementById("postBody");
  if (!title || !meta || !summary || !cover || !content) return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var postIndex = posts.findIndex(function (entry) { return entry.slug === slug; });
  if (postIndex < 0) postIndex = 0;
  var post = posts[postIndex];

  title.textContent = getArchiveHeading(post, postIndex);
  meta.innerHTML = "Filed: " + formatDate(post.date) + " &nbsp;·&nbsp; Read: " + post.readTime + " &nbsp;·&nbsp; Risk tier: " + post.riskLevel;
  summary.textContent = post.summary;
  cover.src = post.coverImage;
  cover.alt = "Evidence frame: " + getArchiveHeading(post, postIndex);

  if (post.bodyHtml) {
    content.innerHTML = post.bodyHtml;
    return;
  }

  content.innerHTML =
    "<h2>Stated conditions</h2><p>" + post.sections.context + "</p>" +
    "<h2>Competing hypotheses</h2><ul>" +
      post.sections.options.map(function (option) { return "<li>" + option + "</li>"; }).join("") +
    "</ul>" +
    "<h2>Method executed</h2><p>" + post.sections.action + "</p>" +
    "<h2>Result</h2><p>" + post.sections.outcome + "</p>" +
    "<h2>Conclusion filed</h2><p>" + post.sections.verdict + "</p>";
}

export function initContentPages() {
  var page = document.body.getAttribute("data-page");
  if (page === "home") renderHome();
  if (page === "archive") renderArchive();
  if (page === "post") renderPost();
}
