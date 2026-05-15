// Declare the map variable
var map;

// Create the map function
function createMap() {

    // Only run this code if the page has a map div
    if (!document.getElementById("map")) {
        return;
    }

    // Create the map and center it over the eastern / central United States
    map = L.map("map").setView([38.5, -87.5], 5);

    // Disable scroll wheel zoom for smoother page navigation
    map.scrollWheelZoom.disable();

    
    // Add CartoDB Dark Matter basemap
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 20
    }).addTo(map);

    // Resume work locations
    var workLocations = [

        {
            name: "Chatham County: Project Management Office",
            place: "Chatham County, Georgia",
            coords: [32.0000, -81.1000],
            title: <i>"Public Safety GIS Analyst"</i>,
            dates: "September 2025 - Present",
            duties:
                "Regular updates to CAD system, designed and implemented geodatabases, developed scripts for automation, resolved technical issues with the 911 system."
        },

        {
            name: "United States Marshals Service",
            place: "Madison, Wisconsin",
            coords: [43.0731, -89.4012],
            title: <i>"Investigative Analyst"</i>,
            dates: "September 2023 - August 2025",
            duties:
                "Supported criminal investigators, conducted database and OSINT research, coordinated federal/state operations, and developed GIS resources using ArcGIS Enterprise and ArcGIS Pro."
        },

        {
            name: "Bureau of Prisons: FCI Oxford",
            place: "Oxford, Wisconsin",
            coords: [43.7797, -89.5726],
            title: <i>"Correctional Counselor"</i>,
            dates: "February 2023 - September 2023",
            duties:
                "Conducted NCIC checks, intake screening, administrative remedies, unit operations, and institutional compliance duties."
        },

        {
            name: "Bureau of Prisons: USP Thomson",
            place: "Thomson, Illinois",
            coords: [41.9584, -90.1026],
            title: <i>"Correctional Systems Officer"</i>,
            dates: "August 2020 - February 2023",
            duties:
                "Performed database inquiry, records management, mail monitoring, intelligence gathering, and policy interpretation and revision."
        },

        {
            name: "Bureau of Prisons: FMC Lexington",
            place: "Lexington, Kentucky",
            coords: [38.0498, -84.4585],
            title: <i>"Correctional Officer"</i>,
            dates: "December 2013 - August 2020",
            duties:
                "Managed institutional mail, records, correspondence, intelligence gathering, and communication with the public and government agencies."
        },

    ];

    // Store marker references so timeline items can open them
    var markers = [];

    // Add markers and timeline cards
    workLocations.forEach(function(job, index) {

        var popupContent =
            "<strong>" + job.name + "</strong><br>" +
            "<em>" + job.place + "</em><br><br>" +
            "<strong>" + job.title + "</strong><br>" +
            job.dates + "<br><br>" +
            job.duties;

        var marker = L.circleMarker(job.coords, {
            radius: 8,
            color: "#ffffff",
            weight: 2,
            fillColor: "#e11f09",
            fillOpacity: 0.9
        })
        .addTo(map)
        .bindPopup(popupContent);

        markers.push(marker);

        // Create sidebar timeline item only if timeline div exists
        if (document.getElementById("timeline")) {

            var timelineItem = document.createElement("div");
            timelineItem.className = "timeline-item";

            timelineItem.innerHTML =
                "<h4>" + job.name + "</h4>" +
                "<p><strong>" + job.title + "</strong></p>" +
                "<p>" + job.place + "</p>" +
                "<p><em>" + job.dates + "</em></p>";

            timelineItem.addEventListener("click", function() {
                map.setView(job.coords, 8);
                markers[index].openPopup();
            });

            document.getElementById("timeline").appendChild(timelineItem);
        }

    });
}

// Call createMap when the DOM loads
document.addEventListener("DOMContentLoaded", createMap);