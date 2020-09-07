var dbPromised = idb.open("db-alquran-apps", 1, upgradeDb => {
    var articlesObjectStore = upgradeDb.createObjectStore("alquran", {keyPath: "number"});
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

function simpanData(data) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("alquran", "readwrite");
        var store = tx.objectStore("alquran");
        console.log(data.data);
        store.put(data.data);
        return tx.complete;
        
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
}

const ambilSemuaData = () => {
    return new Promise((resolve, reject) => {
      dbPromised
        .then(db => {
          var tx = db.transaction("alquran", "readonly");
          var store = tx.objectStore("alquran");
          return store.getAll();
        })
        .then(surah => {
          resolve(surah);
        });
    });
}

function DataById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        var tx = db.transaction("alquran", "readonly");
        var store = tx.objectStore("alquran");
        
        return store.get(Number(id));
      })
      .then(data => {
        //console.log();
      })
  });
}

function deleteById (number){
  return new Promise(function(resolve,reject){
      dbPromised
      .then(function(db) {
        var tx = db.transaction('alquran', 'readwrite');
        var store = tx.objectStore('alquran');
        //console.log(number.data.number);

        store.delete(number.data.number);
        return tx.complete; 
      })
      .then(function(id) {
        console.log('Berhasil dihapus');
      })
      .catch(err => {
        console.error(err);
      })

  });
}