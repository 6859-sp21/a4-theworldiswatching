let width = 1000, height = 800; // TODO: change these to fit the screen
let projection = d3.geoEquirectangular();
projection.fitSize([width, height], non_us_data);
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
            .data(non_us_data.features)
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
                '10/15/20', '10/16/20', '10/17/20', '10/18/20', '10/19/20',
                '10/15/20', '10/16/20', '10/17/20', '10/18/20', '10/19/20',
                '10/15/20', '10/16/20', '10/17/20', '10/18/20', '10/19/20',
                '10/15/20', '10/16/20', '10/17/20', '10/18/20', '10/19/20'];

// when the input range changes update the value 
d3.select("#timeslide").on("input", function() {
    update(+this.value);
});

// update the fill of each SVG of class "____" with value
function update(value) {
    document.getElementById("range").innerHTML=dates[value];
    inputValue = dates[value];

    // TODO: Include data filtering
    const newData = non_us_data.features
        .filter(d => d.properties.created_at.includes(testDates[value]))
    console.log(testDates[value])

    d3.select("h2")
        .data(newData)
        .text(d => `${d.properties.created_at}`)
};

// ----------- Code related to searching hashtags
const searchBoxInput = document.getElementById("hashtag-search-box");
searchBoxInput.addEventListener('input', updateSearch);

function updateSearch(e) {
    var searchedHashtag = e.target.value;

    // Filter and get new data
    const newPointData = non_us_data.features
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