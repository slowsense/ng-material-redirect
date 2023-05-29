document.addEventListener("DOMContentLoaded", function () {

  initActivated();
  const activatedCheckBox = document.getElementById("activatedCheckBox");
  activatedCheckBox.onchange = function () {
    localStorage.setItem("activated", activatedCheckBox.checked);
  };

  initVersion();
  const version = document.getElementById("version");
  version.onchange = function () {
    localStorage.setItem("version", version.value);
  };
});

function initActivated() {
  const activated = localStorage.getItem("activated");
  console.log(activated);
  document.getElementById("activatedCheckBox").checked = activated === 'true';
}

function initVersion() {
  const version = localStorage.getItem("version");
  document.getElementById("version").value = version ?? 16;
}
