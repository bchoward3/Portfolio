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
            title: "Public Safety GIS Analyst",
            dates: "September 2025 - Present",
            seal: "assets/chatham.png",
            duties:
                "Performs complex geographic data management and analysis duties supporting Chatham County E911 Communications, GIS public safety initiatives, SAGIS, and the Project Management Department. Provides geospatial database management, implementation, analysis, and design for mission-critical public safety operations. Leads CAD-GIS integration initiatives, ensuring schema alignment, address synchronization, and response zone optimization. Migrates and aligns Road Centerlines and Master Address Database datasets with Central Square GIS standards. Maintains and improves critical public safety GIS datasets and workflows to ensure efficiency and timely updates. Develops GIS feature layers and supporting workflows including highway mile markers, common places, and supplemental E911 datasets. Coordinates collaboratively with municipalities, PSAP technical staff, addressing authorities, MPC, Board of Assessors, and GIS staff to maintain database integrity and accurate addressing. Supports NG911 planning and implementation efforts while assisting with MSAG and 911 database management. Provides advanced troubleshooting and technical support for E911 mapping applications, GIS software, and hardware systems. Creates performance metrics, reporting products, and analytical outputs to support public safety leadership and operational decision-making. Mentors junior GIS personnel and provides GIS training and technical guidance to public safety staff. "
        },

        {
            name: "United States Marshals Service",
            place: "Madison, Wisconsin",
            coords: [43.0731, -89.4012],
            title: "Investigative Analyst",
            dates: "September 2023 - August 2025",
            seal: "assets/usms.svg",
            duties:
                "Supported criminal investigators, conducted database and OSINT research, coordinated federal/state operations, and developed GIS resources using ArcGIS Enterprise and ArcGIS Pro."
        },

        {
            name: "Bureau of Prisons: FCI Oxford",
            place: "Oxford, Wisconsin",
            coords: [43.7797, -89.5726],
            title: "Correctional Counselor",
            dates: "February 2023 - September 2023",
            seal: "assets/bop.svg",
            duties:
                "Conducted NCIC checks, intake screening, administrative remedies, unit operations, and institutional compliance duties."
        },

        {
            name: "Bureau of Prisons: USP Thomson",
            place: "Thomson, Illinois",
            coords: [41.9584, -90.1026],
            title: "Correctional Systems Officer",
            dates: "August 2020 - February 2023",
            seal: "assets/bop.svg",
            duties:
                "Performed database inquiry, records management, mail monitoring, intelligence gathering, and policy interpretation and revision."
        },

        {
            name: "Bureau of Prisons: FMC Lexington",
            place: "Lexington, Kentucky",
            coords: [38.0498, -84.4585],
            title: "Correctional Officer",
            dates: "December 2013 - August 2020",
            seal: "assets/bop.svg",
            duties:
                "Managed institutional mail, records, correspondence, intelligence gathering, and communication with the public and government agencies."
        }

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

        // Create map marker
        var markerColor = job.dates.includes("Present") ? "#2ecc71" : "#e11f09";

        var marker = L.circleMarker(job.coords, {
            radius: job.dates.includes("Present") ? 10 : 8,
            color: "#ffffff",
            weight: 2,
            fillColor: markerColor,
            fillOpacity: 0.95
        })
        .addTo(map)
        .bindPopup(popupContent);

        markers.push(marker);

        // Create sidebar timeline item only if timeline div exists
        if (document.getElementById("timeline")) {

            var timelineItem = document.createElement("div");

            timelineItem.className = "timeline-item";

            if (job.dates.includes("Present")) {
                timelineItem.classList.add("current-job");
            }

            // Allow keyboard accessibility / focus
            timelineItem.setAttribute("tabindex", "0");

            timelineItem.innerHTML =
                "<div class='timeline-content'>" +
                    "<img src='" + job.seal + "' alt='" + job.name + " seal' class='timeline-seal'>" +
                    "<div class='timeline-text'>" +
                        "<h4>" + job.name + "</h4>" +
                        "<p><strong>" + job.title + "</strong></p>" +
                        "<p>" + job.place + "</p>" +
                        "<p><em>" + job.dates + "</em></p>" +
                    "</div>" +
                "</div>";

            // Timeline interaction
            timelineItem.addEventListener("click", function() {

                // Remove active class from all timeline items
                document.querySelectorAll(".timeline-item").forEach(function(item) {
                    item.classList.remove("active-timeline");
                });

                // Highlight selected timeline item
                timelineItem.classList.add("active-timeline");

                // Move map to selected location
                map.setView(job.coords, 8);

                // Open popup for associated marker
                markers[index].openPopup();
            });

            // Add timeline item to sidebar
            document.getElementById("timeline").appendChild(timelineItem);
        }

    });

}

// Call createMap when the DOM loads
document.addEventListener("DOMContentLoaded", createMap);