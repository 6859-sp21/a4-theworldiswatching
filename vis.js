let width = 1000, height = 800; // TODO: change these to fit the screen
let projection = d3.geoEquirectangular();
projection.fitSize([width, height], small_data);
let geoGenerator = d3.geoPath().projection(projection);
let svg = d3.select("#map-placeholder").append('svg')
            .style("width", width).style("height", height);
let map_svg = svg.append("g");
map_svg.selectAll("path")
        .data(world_map_json.features)
        .enter()
        .append("path")
        .attr( "fill", "#000" )
        .attr( "stroke", "#fff")
        .attr( "d", geoGenerator );

let point_svg = svg.append("g");
point_svg.selectAll('path')
            .data(small_data.features)
            .enter()
            .append('path')
            .attr( "fill", "#66e" )
            .attr( "stroke", "#999" )
            .attr('d', geoGenerator);
// to run the server, run python3 -m http.server

var inputValue = null;
var dates = ['October 15, 2020', 'October 16, 2020', 'October 17, 2020', 'October 18, 2020', 'October 19, 2020',
            'October 20, 2020', 'October 21, 2020', 'October 22, 2020', 'October 23, 2020', 'October 24, 2020', 
            'October 25, 2020', 'October 26, 2020', 'October 27, 2020', 'October 28, 2020', 'October 29, 2020',
            'October 30, 2020', 'October 31, 2020', 'November 1, 2020', 'November 2, 2020', 'November 3, 2020', 
            'November 4, 2020', 'November 5, 2020', 'November 6, 2020', 'November 7, 2020', 'November 8, 2020'];

var testDates = ['10/15/20', '10/16/20', '10/17/20', '10/18/20', '10/19/20',
                '10/20/20', '10/21/20', '10/22/20', '10/23/20', '10/24/20',
                '10/25/20', '10/26/20', '10/27/20', '10/28/20', '10/29/20',
                '10/30/20', '10/31/20', '11/01/20', '11/02/20', '11/03/20',
                '11/04/20', '11/05/20', '11/06/20', '11/07/20', '11/08/20'];

// when the input range changes update the value 
d3.select("#timeslide").on("input", function() {
    updateTime(+this.value);
});

// update the fill of each SVG of class "____" with value
function updateTime(value) {
    document.getElementById("range").innerHTML=dates[value];
    inputValue = dates[value];

    // TODO: Include data filtering
    const newTimeData = non_us_data.features
                        .filter(d => d.properties.created_at.includes(testDates[value]))

    point_svg.selectAll('path')
        .data(newTimeData)
        .join('path')
        .attr( "fill", "#66e" )
        .attr( "stroke", "#999" )
        .attr('d', geoGenerator);
};

// ----------- Code related to searching hashtags
function updateSearch() {
    var textBoxName = document.getElementById("hashtag-search-box");
    var searchedHashtag = textBoxName.value;

    // Filter and get new data
    const newPointData = small_data.features
                         .filter(function(data) {
                            var curHashtags = data.properties.hashtags.toLowerCase();
                            return curHashtags.includes(searchedHashtag.toLowerCase()); 
                         });

    point_svg.selectAll('path')
             .data(newPointData)
             .join(
                 enter => enter.append('path'),
                 update => update,
                 exit => exit.remove()
             )
             .attr( "fill", "#66e" )
             .attr( "stroke", "#999" )
             .attr('d', geoGenerator);
}