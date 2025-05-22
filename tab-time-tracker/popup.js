chrome.storage.local.get(null, (data) => {
  const list = document.getElementById("time-list");
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([domain, seconds]) => {
    const li = document.createElement("li");
    li.textContent = `${domain}: ${Math.floor(seconds / 60)} mins`;
    list.appendChild(li);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    location.reload();
  });
});
