if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    this.navigator.serviceWorker
    .register("/service-worker.js")
    .then(function() {
      // console.log("Pendaftaran serviceWorker berhasil");
    })
    .catch(function() {
      // console.log("Pendaftaran serviceWorker gagal");
    });
  });
} else {
  console.log("ServiceWorker belum didukung browser");
}
document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var number = urlParams.get("id");
  var isFromSaved = urlParams.get("saved");
  var btnSave = document.getElementById("save");
  var btnDelete = document.getElementById("hapus");

  if (isFromSaved) {
    btnSave.style.display = 'none';
    ambilSurahTersimpanById();
  } else {
    btnDelete.style.display = 'none';
  }

  var item = surahById();

  save.onclick = function () {
    M.toast({ html: 'Surah berhasil disimpan..' })
    //console.log("Di klik.");
    item.then(function (data) {
      simpanData(data);
      //mending jangan redirect
      //window.location.href = 'index.html'; 
    });
  }

  hapus.onclick = function () {
    M.toast({ html: 'Berhasil dihapus dari daftar tersimpan' })
    //console.log("button delete diklik");
    item.then(function (number) {
      deleteById(number);
      //mending jangan redirect
      window.location.href = 'index.html';
    })
  }
});