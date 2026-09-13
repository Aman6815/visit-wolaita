// =========================
// DESTINATION DATA
// =========================

const destinations = [

    {
        name: "Mount Damota",
        category: "nature",
        tag: "Nature",
        description:
            "One of Wolaita's most prominent mountains, rising to nearly 2,750 metres and located north of Wolaita Sodo.",
        location: "Sodo Zuria",
        distance: "≈ 12 km from Sodo",
        coordinates: {
            lat: 6.903583,
            lng: 37.779389
        },
        map:
            "https://www.google.com/maps?q=6.903583,37.779389"
    },

    {
        
        name: "Ajora Falls",
        category: "waterfall",
        tag: "Waterfall",
        description:
            "Twin waterfalls formed by the Ajancho and Skoke rivers, surrounded by the natural landscape of Boloso Bombe.",
        location: "Boloso Bombe",
        distance: "≈ 56 km from Sodo",
        map:
            "https://www.google.com/maps/search/Ajora+Falls+Wolaita"
    },

    {
        name: "Mochena Borago",
        category: "heritage",
        tag: "Archaeological Heritage",
        description:
            "An important archaeological rockshelter on the southwestern slope of Mount Damota, with evidence of ancient human occupation.",
        location: "Near Mount Damota",
        distance: "Northwest of Sodo",
        map:
            "https://www.google.com/maps/search/Mochena+Borago+Wolaita"
    },

    {
    name: "Bedessa Bridge",
    category: "nature",
    tag: "Landmark",
    description:
        "Bambala Suspension Bridge, also known as Bedessa Bridge, is a notable crossing and local landmark in Wolaita.",
    location: "Bedessa, Wolaita",
    distance: "Near Sodo",
    map:
        "https://maps.app.goo.gl/sEciFLWoi1QDLhYPA"
    },

    {
        name: "Sangana Waterfall",
        category: "waterfall",
        tag: "Waterfall",
        description:
            "A natural waterfall surrounded by forest and landscape in Boloso Bombe.",
        location: "Boloso Bombe",
        distance: "Wolaita Zone",
        map:
            "https://www.google.com/maps/search/Sangana+Waterfall+Wolaita"
    },

    {
        name: "Abala Chokare Hot Spring",
        category: "nature",
        tag: "Hot Spring",
        description:
            "A natural hot spring area with steaming water and bubbling ground in Abala Abaya district.",
        location: "Abala Abaya",
        distance: "Southeast of Sodo",
        map:
            "https://www.google.com/maps/search/Abala+Chokare+Hot+Spring"
    }

];


// =========================
// DESTINATION ELEMENTS
// =========================

const destinationGrid =
    document.querySelector("#destination-grid");

const searchInput =
    document.querySelector("#destination-search");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const noResults =
    document.querySelector("#no-results");


// =========================
// DISPLAY DESTINATIONS
// =========================

function displayDestinations(list) {

    destinationGrid.innerHTML = "";

    if (list.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";


    list.forEach(destination => {

        const card = document.createElement("article");

        card.className = "destination-card";

        card.innerHTML = `
            <div class="destination-image">
                <div class="image-placeholder">
                    ${destination.name}
                </div>
            </div>

            <div class="destination-content">

                <span class="tag">
                    ${destination.tag}
                </span>

                <h3>
                    ${destination.name}
                </h3>

                <p>
                    ${destination.description}
                </p>

                <div class="destination-meta">

                    <span>
                        📍 ${destination.location}
                    </span>

                    <span>
                        🚗 ${destination.distance}
                    </span>

                </div>

                <a
                    href="${destination.map}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on map →
                </a>

            </div>
        `;

        destinationGrid.appendChild(card);
    });
}


// =========================
// FILTER DESTINATIONS
// =========================

function filterDestinations() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const activeButton =
        document.querySelector(".filter-btn.active");

    const category =
        activeButton.dataset.category;


    const filtered = destinations.filter(destination => {

        const matchesSearch =
            destination.name
                .toLowerCase()
                .includes(searchTerm) ||

            destination.description
                .toLowerCase()
                .includes(searchTerm) ||

            destination.location
                .toLowerCase()
                .includes(searchTerm);


        const matchesCategory =
            category === "all" ||
            destination.category === category;


        return matchesSearch && matchesCategory;
    });


    displayDestinations(filtered);
}


// =========================
// CATEGORY BUTTONS
// =========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterDestinations();
    });

});


// =========================
// SEARCH
// =========================

searchInput.addEventListener(
    "input",
    filterDestinations
);


// Initial display
displayDestinations(destinations);


// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });


// =========================
// HEADER ON SCROLL
// =========================

const header =
    document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// =========================
// ACTIVE NAVIGATION
// =========================

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});




