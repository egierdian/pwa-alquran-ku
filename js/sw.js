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