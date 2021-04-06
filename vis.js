let width = 1000, height = 800; // TODO: change these to fit the screen
let projection = d3.geoEquirectangular();
projection.fitSize([width, height], small_data);
let geoGenerator = d3.geoPath().projection(projection);
let svg = d3.select("#map-placeholder").append('svg')
            .style("width", width).style("height", height);
let map_svg = svg.append("g");

var tweetsByCountry = d3.rollup(small_data.features, v => v.length, d => d.properties.country);
console.log(tweetsByCountry)
var colorScale = d3.scaleThreshold()
  .domain([10, 100, 1000, 10000])
  .range(d3.schemeBlues[4]);

map_svg.selectAll("path")
        .data(world_map_json.features)
        .enter()
        .append("path")
        .attr( "fill", function (d) {
            d.total = tweetsByCountry.get(d.properties.name) || 0;
            return colorScale(d.total);
        })
        .attr( "stroke", "#fff")
        .attr( "d", geoGenerator );

// let point_svg = svg.append("g");
// point_svg.selectAll('path')
//             .data(small_data.features)
//             .enter()
//             .append('path')
//             .attr( "fill", "#66e" )
//             .attr( "stroke", "#999" )
//             .attr('d', geoGenerator);
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
                '10/30/20', '10/31/20', '11/1/20', '11/2/20', '11/3/20',
                '11/4/20', '11/5/20', '11/6/20', '11/7/20', '11/8/20'];

// when the input range changes update the value 
d3.select("#timeslide").on("input", function() {
    updateTime(+this.value);
});

// update the fill of each SVG of class "____" with value
function updateTime(value) {
    document.getElementById("range").innerHTML=dates[value];
    inputValue = dates[value];

    // TODO: Include data filtering
    const newTimeData = small_data.features
                        .filter(d => d.properties.created_at.includes(testDates[value]))

    var tweetsByCountry = d3.rollup(newTimeData, v => v.length, d => d.properties.country);
    console.log(tweetsByCountry)

    // TODO: why is this not updating? :((
    map_svg.selectAll("path")
    .data(world_map_json.features)
    .append("path")
    .attr( "fill", function (d) {
        // console.log(tweetsByCountry.get(d.properties.name));
        d.total = tweetsByCountry.get(d.properties.name) || 0;
        return colorScale(d.total);
      })
    .attr( "stroke", "#000")
    .attr( "d", geoGenerator ); 

    // point_svg.selectAll('path')
    //     .data(newTimeData)
    //     .join('path')
    //     .attr( "fill", "#66e" )
    //     .attr( "stroke", "#999" )
    //     // .attr("r", d => tweetsByCountry.get(d.properties.country))
    //     .attr('d', geoGenerator);
    
};

// ----------- Code related to searching hashtags
function updateSearch() {
    var textBoxName = document.getElementById("hashtag-search-box");
    var searchedHashtag = textBoxName.value;

    // how to generate tweetsByCountry for the hashtag search?

    // point_svg.selectAll('path')
    //          .attr("visibility", function(data) {
    //             var curHashtags = data.properties.hashtags.toLowerCase();
    //             return curHashtags.includes(searchedHashtag.toLowerCase()) ? "visible" : "hidden"; 
    //          });
    
    
}