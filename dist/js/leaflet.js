var latGlobal, lngGlobal;
var map = L.map('ipmap').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Icon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconAnchor: [28, 74],
    popupAnchor: [-3, -76]
});

$body = $("body");

$(document).on({
    ajaxStart: function() {
        $body.addClass("loading");
    },
    ajaxStop: function() {
        $body.removeClass("loading");
    }
});

$(document).ready(function() {

    updateSearchbox();
    $(window).resize(function() {
        updateSearchbox();
    });

    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: {
            apiKey: "at_c2GL3YZ441KwqAAEbLbqBkqUSlbEY",
        },
        success: function(data) {
            var myJson = JSON.parse(JSON.stringify(data));
            document.getElementById('ipAddressValue').innerText = document.getElementById('ipAddressValue1').innerText = myJson.ip;
            document.getElementById('locationValue').innerHTML = document.getElementById('locationValue1').innerHTML = myJson.location.city + "," + myJson.location.region;
            document.getElementById('timeZone').innerHTML = document.getElementById('timeZone1').innerHTML = "UTC " + myJson.location.timezone;
            document.getElementById('ispValue').innerHTML = document.getElementById('ispValue1').innerHTML = myJson.isp;

            map.setView([myJson.location.lat, myJson.location.lng], 13);

            L.marker([myJson.location.lat, myJson.location.lng], {
                icon: Icon
            }).addTo(map);
        }
    });
});

function updateSearchbox() {
    $(document).ready(function() {
        $("#ipInfo").css("top", "170px");

        var ipInfoOffsetTop = 300 - $("#ipInfo1").height() / 2;
        $("#ipInfo1").css("top", ipInfoOffsetTop);
    })
}

function ipRequest() {

    var ipValue = document.getElementById('search').value || document.getElementById('search1').value;
    var api_key = "at_c2GL3YZ441KwqAAEbLbqBkqUSlbEY";
    $(function() {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {
                apiKey: api_key,
                ipAddress: ipValue
            },
            success: function(data) {
                var jsonObj = JSON.stringify(data);
                var json = JSON.parse(jsonObj);

                document.getElementById('ipAddressValue').innerHTML = document.getElementById('ipAddressValue1').innerHTML = json.ip;
                document.getElementById('locationValue').innerHTML = document.getElementById('locationValue1').innerHTML = json.location.city + "," + json.location.region;
                document.getElementById('timeZone').innerHTML = document.getElementById('timeZone1').innerHTML = "UTC " + json.location.timezone;
                document.getElementById('ispValue').innerHTML = document.getElementById('ispValue1').innerHTML = json.isp;
                latGlobal = json.location.lat;
                lngGlobal = json.location.lng;

                var strCols = json.isp.length;

                if (strCols => 35) {
                    $("#ispValue").css("font-size", "1.2rem");
                };

                map.setView([latGlobal, lngGlobal], 13);

                L.marker([latGlobal, lngGlobal], {
                    icon: Icon
                }).addTo(map);
            }
        });
    });
}