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
    let surahElement = document.getElementById("surah");

    data.data.forEach(function (ambil) {
        // console.log(ambil.name.translation.id);

        surah += `
            <div class="col l4 s12 m6">
                <div class="card custom-shadow custom-card">
                    <a href="./surah.html?id=${ambil.number}">
                        <div class="card-content" style="margin-left:-10px; margin-right:-10px;">
                            <button style="background-color:#eeeeee; margin-top: -10px; margin-bottom: 20px; border: none; padding:10px; border-radius: 10px; color:#7579e7; font-weight:700;">
                                ${ambil.number}
                            </button>
                            <button class="right font-arabic transparent" style="background-color:#eeeeee; margin-top: -5px; margin-bottom: 20px; border: none; border-radius: 10px; color:#686d76;">
                                ${ambil.name.short}
                            </button>
                            <p>
                                <span style="font-size: 1.4rem; font-weight:bold;">${ambil.name.transliteration.id}</span>
                            </p>
                            <p class="pt-3">
                                <span style="font-size: 1rem; font-weight:300; color:#686d76;">${ambil.name.translation.id}</span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        `;
    });
    // console.log(surah);
    surahElement.innerHTML = surah;
};

const surahById = () => {
    return new Promise((resolve, reject) => {
        let urlParam = new URLSearchParams(window.location.search);
        let idParam = urlParam.get("id");

        if ("caches" in window) {
            caches.match(ENDPOINT_SURAH + idParam).then(function (response) {
                //console.log(ENDPOINT_SURAH + idParam);
                if (response) {
                    response.json().then(function (data) {
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

    data.data.verses.forEach(function (hasil) {
        // console.log(hasil);
        detailSurah += `
            <div class="card custom-shadow custom-card-detail">
                <a class="btn disabled text-white" style="background-color:grey; border-radius:10px 2px 2px 2px; color:#ffffff; font-weight:700;">${hasil.number.inSurah}</a>
                <div class="card-content" style="margin-top:-10px;">
                <p class="font-arabic" style="text-align:right; font-size:30px; padding-bottom:15px;">${hasil.text.arab}</p>
                    <p><i>${hasil.text.transliteration.en}</i></p>
                    <hr style="color:#686d76;">
                    <p>${hasil.translation.id}</p>                
                </div>
            </div>
        `;
    })
    surah = `
        <h5 class="center">Surah ${data.data.name.transliteration.id}</h5>
        <hr style="width:200px; border: solid 3px #a5a5a5; border-radius:15px 0px 15px 0px;">
        ${detailSurah}
    `;

    surahElement.innerHTML = surah;
};

const ambilSurahTersimpan = () => {
    if ("caches" in window) {
        caches.match(ENDPOINT_SURAH).then(function (response) {
            //coba tampilkan
            //console.log(ENDPOINT_SURAH);
            if (response) {
                response.json().then(function (data) {
                    ambilSemuaData().then(function (ambil) {
                        let surah = "";
                        let detailSurah = "";
                        alquran.forEach(function (hasil) {
                            console.log(hasil);
                            detailSurah += `
                                <div class="col l4 s12 m6">
                                    <div class="card custom-shadow custom-card">
                                        <a href="./surah.html?id=${hasil.number}&saved=true">
                                            <div class="card-content" style="margin-left:-10px; margin-right:-10px;">
                                                <button style="background-color:#eeeeee; margin-top: -10px; margin-bottom: 20px; border: none; padding:10px; border-radius: 10px; color:#7579e7; font-weight:700;">
                                                    ${hasil.number}
                                                </button>
                                                <button class="right font-arabic transparent" style="background-color:#eeeeee; margin-top: -5px; margin-bottom: 20px; border: none; border-radius: 10px; color:#686d76;">
                                                    ${hasil.name.short}
                                                </button>
                                                <p>
                                                    <span style="font-size: 1.4rem; font-weight:bold;">${hasil.name.transliteration.id}</span>
                                                </p>
                                                <p class="pt-3">
                                                    <span style="font-size: 1rem; font-weight:300; color:#686d76;">${hasil.name.translation.id}</span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                `;
                        });
                        surah = `
                                <h5 class="center">Surah yang Anda simpan</h5>
                                <hr style="width:200px; border: solid 3px #a5a5a5; border-radius:15px 0px 15px 0px;">
                                ${detailSurah}
                            `;
                        document.getElementById("surahTersimpan").innerHTML = surah;

                    })
                })
            }
        })
    }
    fetchAPI(ENDPOINT_SURAH)
        .then(function () {
            ambilSemuaData().then(function (ambil) {
                let surah = "";
                let detailSurah = "";
                ambil.forEach(function (hasil) {
                    console.log(hasil);
                    detailSurah += `
                    <div class="col l4 s12 m6">
                        <div class="card custom-shadow custom-card">
                            <a href="./surah.html?id=${hasil.number}&saved=true">
                                <div class="card-content" style="margin-left:-10px; margin-right:-10px;">
                                    <button style="background-color:#eeeeee; margin-top: -10px; margin-bottom: 20px; border: none; padding:10px; border-radius: 10px; color:#7579e7; font-weight:700;">
                                        ${hasil.number}
                                    </button>
                                    <button class="right font-arabic transparent" style="background-color:#eeeeee; margin-top: -5px; margin-bottom: 20px; border: none; border-radius: 10px; color:#686d76;">
                                        ${hasil.name.short}
                                    </button>
                                    <p>
                                        <span style="font-size: 1.4rem; font-weight:bold;">${hasil.name.transliteration.id}</span>
                                    </p>
                                    <p class="pt-3">
                                        <span style="font-size: 1rem; font-weight:300; color:#686d76;">${hasil.name.translation.id}</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
                });
                surah = `
                <h5 class="center">Surah yang Anda simpan</h5>
                <hr style="width:200px; border: solid 3px #a5a5a5; border-radius:15px 0px 15px 0px;">
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

        data.data.verses.forEach(function (hasil) {
            //console.log(hasil);
            detailSurah += `
            <div class="card custom-shadow custom-card-detail">
                <a class="btn disabled text-white" style="background-color:grey; border-radius:10px 2px 2px 2px; color:#ffffff; font-weight:700;">${hasil.number.inSurah}</a>
                <div class="card-content" style="margin-top:-10px;">
                <p class="font-arabic" style="text-align:right; font-size:30px; padding-bottom:15px;">${hasil.text.arab}</p>
                    <p><i>${hasil.text.transliteration.en}</i></p>
                    <hr style="color:#686d76;">
                    <p>${hasil.translation.id}</p>                
                </div>
            </div>
            `;
        })

        surah = `
            <h5 class="center">Surah ${data.data.name.transliteration.id}</h5>
            <hr style="width:200px; border: solid 3px #a5a5a5; border-radius:15px 0px 15px 0px;">
            ${detailSurah}
        `;

        surahElement.innerHTML = surah;
    })
}