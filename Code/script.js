function MoveBiker() {
    const Image = document.getElementById("biker");
    Image.style.left = '0%';

    function ToRight() {
        Image.style.left = '95%';
        Image.style.transition = 'all 28s';
    }
    function Flip() {
        Image.style.transform = 'rotateY(180deg)';
        Image.style.transition = 'all 2s';
    }
    function ToLeft() {
        Image.style.left = '0%';
        Image.style.transition = 'all 28s';
    }
    function UnFlip() {
        Image.style.transform = 'rotateY(0deg)';
        Image.style.transition = 'all 2s';
    }

    ToRight();
    setTimeout(() => {
        Flip();
        setTimeout(() => {
            ToLeft();
            setTimeout(() => {
                UnFlip();
            }, 28000);
        }, 2000);
    }, 28000);
}

MoveBiker();
setInterval(MoveBiker, 60000);

document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slideshow img");
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlide(slideIndex);
    }

    showSlide(slideIndex);
    setInterval(nextSlide, 5000);

    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    welcomeMSG();
});

function welcomeMSG() {
    if (!window.location.pathname.endsWith("index.html")) return
    fetch('../Documents/welcomeMessage.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("welcomeMessage").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("welcomeMessage").innerHTML = "Welkom bij de Fluitende Fietser!";
        });
}

/* Dax Java Cock */
document.addEventListener("DOMContentLoaded", function () {
    const fietsLijst = document.getElementById("fiets-lijst");
    const huurButton = document.getElementById("huur-button");
    const verhuurFormulier = document.getElementById("verhuur-formulier");
    const gekozenFiets = document.getElementById("gekozen-fiets");
    const gegevensForm = document.getElementById("gegevens-form");
    const bevestiging = document.getElementById("bevestiging");

    // Fietsen laden uit een .txt-bestand
    if (!window.location.pathname.endsWith("verhuur.html")) return;

    fetch('../Documents/huurLijst.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Kan fietsenbestand niet laden.');
            }
            return response.text();
        })
        .then(data => {
            const fietsen = JSON.parse(data); // Parse de JSON-string uit het .txt-bestand
            fietsen.forEach((fiets, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><input type="checkbox" class="fiets-checkbox" data-fiets="${fiets.type}"></td>
                    <td>${fiets.type}</td>
                    <td>${fiets.prijs}</td>
                `;
                fietsLijst.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Fout bij het laden van fietsen:', error);
        });

    huurButton.addEventListener("click", function () {
        const geselecteerdeFiets = document.querySelector(".fiets-checkbox:checked");
        if (!geselecteerdeFiets) {
            alert("Selecteer een fiets om te huren.");
            return;
        }

        gekozenFiets.textContent = geselecteerdeFiets.dataset.fiets;
        verhuurFormulier.classList.remove("hidden");
    });

    gegevensForm.addEventListener("submit", function (e) {
        e.preventDefault();
        bevestiging.classList.remove("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.endsWith("index.html")) return
    const welcomeMessage = document.getElementById("welcomeMessage");
    const messageBackground = document.getElementsByClassName("welcome-text")[0];
    const slider = document.getElementsByClassName("slider")[0];

    // Add a click event listener to hide the welcome message
    welcomeMessage.addEventListener("click", function () {
        messageBackground.style.transition = "opacity 1s ease, visibility 1s ease";
        messageBackground.style.opacity = "0";
        messageBackground.style.visibility = "hidden";
        setTimeout(() => {
            slider.style.transition = "all 1s ease";
            messageBackground.style.display = "none";
        }, 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.endsWith("contact.html")) return;
    const winkelStatus = document.querySelector(".winkelStatus-shown");
    const statusText = document.querySelector(".status");
    const mainElement = document.querySelector("main");
    const welcomeMessage = document.getElementsByClassName("welcome-text")[0];

    // Openingstijden (aanpassen indien nodig)
    const openingstijden = {
        maandag: { open: "09:00", close: "18:00" },
        dinsdag: { open: "09:00", close: "18:00" },
        woensdag: { open: "09:00", close: "18:00" },
        donderdag: { open: "09:00", close: "18:00" },
        vrijdag: { open: "09:00", close: "18:00" },
        zaterdag: { open: "09:00", close: "20:00" },
        zondag: { open: null, close: null }, // Gesloten
    };

    // Controleer of de winkel open is
    function isWinkelOpen() {
        const now = new Date();
        const dayNames = [
            "zondag",
            "maandag",
            "dinsdag",
            "woensdag",
            "donderdag",
            "vrijdag",
            "zaterdag",
        ];
        const today = dayNames[now.getDay()];
        const currentTime = now.toTimeString().slice(0, 5); // Formatteer als HH:MM

        const tijden = openingstijden[today];
        if (!tijden.open || !tijden.close) {
            return false; // Gesloten
        }

        return currentTime >= tijden.open && currentTime <= tijden.close;
    }

    // Toon de winkelstatus na 5 seconden
    setTimeout(() => {
        winkelStatus.style.opacity = "1";
        winkelStatus.style.pointerEvents = "auto";
        winkelStatus.style.transition = "opacity 0.5s ease";

        if (isWinkelOpen()) {
            statusText.textContent = "Geopend";
            statusText.id = "geopend";
        } else {
            statusText.textContent = "Gesloten";
            statusText.id = "gesloten";
        }
    }, 5000);

    // Verberg de popup en vervang door een knop
    winkelStatus.addEventListener("click", function () {
        winkelStatus.style.transition = "all 0.5s ease";
        setTimeout(() => {
            winkelStatus.classList.add("winkelStatus-hidden");
            winkelStatus.classList.remove("winkelStatus-shown");
        }, 250);

        const button = document.createElement("button");
        button.style.opacity = "0";
        button.textContent = "Toon winkelstatus";
        button.style.marginTop = "20px";
        button.style.width = "100px";
        button.style.height = "50px";
        setTimeout(() => {
            button.style.transition = "opacity 0.5s ease";
            button.style.opacity = "1";
        }, 500);
        button.style.right = "46.5%";
        button.style.top = "-30px";
        button.style.position = "absolute";
        button.style.paddingTop = "10px";
        button.style.backgroundColor = "#465e79";
        button.style.border = "1px solid #000";
        button.style.color = "#fff";
        button.addEventListener("click", function () {
            button.style.transition = "opacity 0.25s ease";
            button.style.opacity = "0";
            winkelStatus.style.display = "flex";
            winkelStatus.style.opacity = "1";
            winkelStatus.style.pointerEvents = "auto";
            winkelStatus.classList.add("winkelStatus-shown");
            winkelStatus.classList.remove("winkelStatus-hidden");
            welcomeMessage.style.display = "block";
            setTimeout(() => {
            welcomeMessage.style.transition = "all 1s ease";
            welcomeMessage.style.visibility = "visible";
            welcomeMessage.style.opacity = "1";
            }
            , 500);
        });

        mainElement.appendChild(button);
    });
});

function historieText() {
    fetch('../Documents/historie.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("historie").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("historie").innerHTML = "Error: Kan historie.txt niet laden.";
        });
}

function eigenaarText() {
    fetch('../Documents/eigenaar.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("eigenaar").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("eigenaar").innerHTML = "Error: Kan eigenaar.txt niet laden.";
        });
}

function monteursText() {
    fetch('../Documents/monteurs.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("monteurs").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("monteurs").innerHTML = "Error: Kan monteurs.txt niet laden.";
        });
}

function missieText() {
    fetch('../Documents/missie.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("missieBericht").innerHTML = data;
        })
        .catch(() => {
            document.getElementById("missieBericht").innerHTML = "Error: Kan missie.txt niet laden.";
        });
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("over.html")) {
        historieText();
        eigenaarText();
        monteursText();
        missieText();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("header input[type='text']");
    const searchButton = document.querySelector("header button");

    // Zoekwoorden en bijbehorende pagina's
    const zoekwoorden = {
        "home": "homepage.html",
        "fietsen": "fietsen.html",
        "verhuur": "verhuur.html",
        "contact": "contact.html",
        "over ons": "over.html",
        "steun": "steun.html",
        "algemene voorwaarden": "algemene_voorwaarden.html",
        "fluitend fonds": "ff.html"
    };

    searchButton.addEventListener("click", function () {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            alert("Voer een zoekterm in.");
            return;
        }

        // Controleer of de zoekterm overeenkomt met een pagina
        for (const [term, pagina] of Object.entries(zoekwoorden)) {
            if (term.includes(query)) {
                window.location.href = pagina; // Navigeer naar de bijbehorende pagina
                return;
            }
        }

        // Als geen pagina wordt gevonden, zoek naar elementen op de huidige pagina
        const elements = document.querySelectorAll("main, header, footer, nav *"); // Zoek in alle subelementen
        let found = false;

        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query)) {
                found = true;

                // Highlight alleen het specifieke element
                element.style.backgroundColor = "#9aafc7aa"; // Highlight het element
                element.scrollIntoView({ behavior: "smooth", block: "center" });

                // Verwijder highlight na 2 seconden
                setTimeout(() => {
                    element.style.backgroundColor = "";
                }, 2000);
            }
        });

        if (!found) {
            alert("Geen resultaten gevonden voor: " + query);
        }
    });
});

// Winkelmand functionaliteit
let winkelmand = [];

// Voeg een fiets toe aan de winkelmand
function voegToeAanMand(fietsNaam, prijs) {
    const item = { naam: fietsNaam, prijs: prijs };
    winkelmand.push(item);
    alert(`${fietsNaam} is toegevoegd aan je winkelmand.`);
    updateMandIcon();
}

// Update het winkelmand-icoon met het aantal items
function updateMandIcon() {
    const mandIcon = document.getElementById("mand-aantal");
    mandIcon.textContent = winkelmand.length;
}

// Toon de winkelmandinhoud op de mandje-pagina
function toonWinkelmand() {
    const mandContainer = document.getElementById("mand-container");
    mandContainer.innerHTML = ""; // Leeg de container

    if (winkelmand.length === 0) {
        mandContainer.innerHTML = "<p>Je winkelmand is leeg.</p>";
        return;
    }

    let totaalPrijs = 0;
    winkelmand.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("mand-item");
        row.innerHTML = `
            <p>${item.naam} - €${item.prijs}</p>
            <button onclick="verwijderUitMand(${index})">Verwijder</button>
        `;
        mandContainer.appendChild(row);
        totaalPrijs += parseFloat(item.prijs);
    });

    const totaalElement = document.createElement("p");
    totaalElement.innerHTML = `<strong>Totaal: €${totaalPrijs.toFixed(2)}</strong>`;
    mandContainer.appendChild(totaalElement);

    const afrekenKnop = document.createElement("button");
    afrekenKnop.textContent = "Afrekenen";
    afrekenKnop.onclick = function () {
        window.location.href = "afrekenen.html";
    };
    mandContainer.appendChild(afrekenKnop);
}

// Verwijder een item uit de winkelmand
function verwijderUitMand(index) {
    winkelmand.splice(index, 1);
    toonWinkelmand();
    updateMandIcon();
}