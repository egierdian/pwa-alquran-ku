const BASE_URL = "https://api.quran.sutanlab.id/surah/";

const ENDPOINT_SURAH = `${BASE_URL}`;


const fetchAPI = url => {
    return fetch(url)
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};


const surah = () => {
    if ("caches" in window) {
        caches.match(ENDPOINT_SURAH).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    // console.log("Data: " + data);
                    ambilSurah(data);
                })
            }
        })
    }
    fetchAPI(ENDPOINT_SURAH)
        .then(data => {
            ambilSurah(data);
        })
        .catch(error => {
            console.log(error)
        })
};

const ambilSurah = data => {
    // console.log(data);
    let surah = "";
    let surahElement =  document.getElementById("surah");

    data.data.forEach(function (ambil) {
        // console.log(ambil.number);
        
        surah += `
            <div class="col l4 s12 m6">
                <div class="card custom-shadow custom-card">
                    <a href="./surah.html?id=${ambil.number}">
                        <div class="card-content">
                            <p>${ambil.number}. <span>${ambil.name.transliteration.id}</span> <span class="badge">${ambil.name.short}</span></p>
                        </div>
                    </a>
                </div>
            </div>
        `;
    });
    surahElement.innerHTML = surah;
};

const surahById = () => {
    return new Promise((resolve,reject) => {
        let urlParam = new URLSearchParams(window.location.search);
        let idParam = urlParam.get("id");

        if("caches" in window) {
            caches.match(ENDPOINT_SURAH + idParam).then(function(response){
                //console.log(ENDPOINT_SURAH + idParam);
                if(response) {
                    response.json().then(function (data){
                        //console.log("data"+data);
                        ambilSurahById(data);
                        resolve(data);
                    })
                }
            })
        }
        fetchAPI(ENDPOINT_SURAH + idParam)
        .then(data => {
            ambilSurahById(data);
            resolve(data);
        })
        .catch(error => {
            console.log(error);
        })
    })
};

const ambilSurahById = data => {
    // console.log(data);
    let detailSurah = "";
    let surah = "";
    let surahElement = document.getElementById("body-content");

    data.data.verses.forEach(function(hasil) {
        // console.log(hasil);
        detailSurah +=`
            <div class="card custom-shadow">
                <div class="card-content">
                    <span class="badge">${hasil.number.inSurah}</span><p style="text-align:right; font-size:30px;">${hasil.text.arab}</p>
                    <br>
                    <p><i>${hasil.text.transliteration.en}</i></p>
                    <hr>
                    <p>${hasil.translation.id}</p>                
                </div>
            </div>
        `;
    })
    surah = `
        <h5 class="center">Surah ${data.data.name.transliteration.id}</h5>
        <hr style="width:250px; border: solid 3px;">
        ${detailSurah}
    `;

    surahElement.innerHTML = surah;
};

const ambilSurahTersimpan = () => {
    if("caches" in window) {
        caches.match(ENDPOINT_SURAH).then(function(response){
            //coba tampilkan
            //console.log(ENDPOINT_SURAH);
            if(response){
                response.json().then(function(data) {
                    ambilSemuaData().then(function(ambil) {
                        let surah ="";
                        let detailSurah ="";
                        alquran.forEach(function(hasil) {
                            console.log(hasil);
                            detailSurah +=`
                            <div class="col l4 s12 m6">
                                <div class="card custom-shadow custom-card">
                                    <a href="./surah.html?id=${hasil.number}&saved=true" style="font-color: black;">
                                        <div class="card-content">
                                            <p>${hasil.number}. <span>${hasil.name.transliteration.id}</span> <span class="badge">${hasil.name.short}</span></p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            `;
                        });
                        surah = `
                            <h5 class="center">Surah yang Anda simpan</h5>
                            <hr style="width:250px; border: solid 3px;">
                            ${detailSurah}
                        `;
                        document.getElementById("surahTersimpan").innerHTML = surah;
                    })
                })
            }
        })
    }
    fetchAPI(ENDPOINT_SURAH)
    .then(function() {
        ambilSemuaData().then(function(ambil) {
            let surah ="";
            let detailSurah ="";
            ambil.forEach(function(hasil) {
                console.log(hasil);
                detailSurah +=`
                <div class="col l4 s12 m6">
                    <div class="card custom-shadow custom-card">
                        <a href="./surah.html?id=${hasil.number}&saved=true" style="font-color: black;">
                            <div class="card-content">
                                <p>${hasil.number}. <span>${hasil.name.transliteration.id}</span> <span class="badge">${hasil.name.short}</span></p>
                            </div>
                        </a>
                    </div>
                </div>
                `;
            });
            surah = `
                <h5 class="center">Surah yang Anda simpan</h5>
                <hr style="width:250px; border: solid 3px;">
                ${detailSurah}
            `;
            document.getElementById("surahTersimpan").innerHTML = surah;
        })
    })
    .catch(error => {
        console.log(error);
    })
}

const ambilSurahTersimpanById = () => {
    let urlParam = new URLSearchParams(window.location.search);
    let idParam = urlParam.get("id");

    DataById(idParam).then(data => {
        let detailSurah = "";
        let surah = "";
        let surahElement = document.getElementById("body-content");

        data.data.verses.forEach(function(hasil) {
            //console.log(hasil);
            detailSurah +=`
            <div class="col l4 s12 m6">
                <div class="card custom-shadow">
                    <a href="./surah.html?id=${ambil.number}&saved=true" style="font-color: black;">
                        <div class="card-content">
                            <p>${ambil.number}. <span>${ambil.name.transliteration.id}</span> <span class="badge">${ambil.name.short}</span></p>
                        </div>
                    </a>
                </div>
            </div>
            `;
        })

        surah = `
            <h5 class="center">Surah ${data.data.name.transliteration.id}</h5>
            <hr style="width:250px; border: solid 3px;">
            ${detailSurah}
        `;

        surahElement.innerHTML = surah;
    })
}