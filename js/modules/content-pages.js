import { posts } from "../data/posts.js";
import { observations } from "../data/observations.js";

function formatDate(dateInput) {
  var date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return dateInput;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function getArchiveHeading(post, postIndex) {
  var archiveNumber = String(postIndex + 1).padStart(3, "0");
  return "Archive " + archiveNumber;
}

function createCard(post) {
  return (
    '<article class="card">' +
      '<div class="evidence">' +
        '<div class="crop-mark tl"></div><div class="crop-mark tr"></div><div class="crop-mark bl"></div><div class="crop-mark br"></div>' +
        '<img src="' + post.coverImage + '" alt="Evidence frame: ' + post.title + '" class="card-image" />' +
        '<div class="grid-overlay"></div>' +
        '<div class="live-num success-num">ROI <span class="live-value" data-base="' + post.metrics.roi + '">' + post.metrics.roi + "</span>%</div>" +
        '<div class="live-num empathy-num">EC <span class="live-value" data-base="' + post.metrics.empathyCost + '">' + post.metrics.empathyCost + "</span>%</div>" +
      "</div>" +
      '<h2 class="card-title">' + post.title + "</h2>" +
      '<div class="card-meta">' +
        "<span>Date <span class=\"value\">" + formatDate(post.date) + "</span></span>" +
        "<span>Rationality <span class=\"value\">" + post.rationalityScore + "%</span></span>" +
        "<span>Risk <span class=\"value\">" + post.riskLevel + "</span></span>" +
      "</div>" +
      '<p class="card-excerpt scan-text">' + post.summary + "</p>" +
      '<div class="card-actions">' +
        '<a class="open-case-link" href="post.html?slug=' + encodeURIComponent(post.slug) + '">Open Experiment Log</a>' +
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
  meta.innerHTML = "Date: " + formatDate(post.date) + " / Read Time: " + post.readTime + " / Risk: " + post.riskLevel;
  summary.textContent = post.summary;
  cover.src = post.coverImage;
  cover.alt = "Evidence frame: " + getArchiveHeading(post, postIndex);

  if (post.bodyHtml) {
    content.innerHTML = post.bodyHtml;
    return;
  }

  content.innerHTML =
    "<h2>Case Context</h2><p>" + post.sections.context + "</p>" +
    "<h2>Observed Options</h2><ul>" +
      post.sections.options.map(function (option) { return "<li>" + option + "</li>"; }).join("") +
    "</ul>" +
    "<h2>Chosen Action</h2><p>" + post.sections.action + "</p>" +
    "<h2>Outcome</h2><p>" + post.sections.outcome + "</p>" +
    "<h2>Final Verdict</h2><p>" + post.sections.verdict + "</p>";
}

export function initContentPages() {
  var page = document.body.getAttribute("data-page");
  if (page === "home") renderHome();
  if (page === "archive") renderArchive();
  if (page === "post") renderPost();
}
