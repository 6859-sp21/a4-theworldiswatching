let width = 800, height = 500; // TODO: change these to fit the screen
let projection = d3.geoEquirectangular();
projection.fitSize([width, height], small_data);
let geoGenerator = d3.geoPath().projection(projection);
let svg = d3.select("#map-placeholder").append('svg')
            .style("width", width).style("height", height);

// ---  Default values
var currentDate = '11/3/20';
var currentHashtag = "";
var includeUS = false;

var tip = d3.tip()
            .attr('class', 'd3-tip')
            .direction('e').offset([-5, -3])
            .html(function(d) {
                var totalTweet = tweetsByCountry.get(d.properties.name) || 0;
                return d.properties.name + ": " + totalTweet;
            });
svg.call(tip);

let map_svg = svg.append("g");
var tweetsByCountry = d3.rollup(small_data.features, v => v.length, d => d.properties.country);

var colorScale = d3.scaleThreshold()
  .domain([1, 100, 500, 1000, 1500, 2000, 2500])
  .range(d3.schemeBlues[7]);

map_svg.selectAll("path")
        .data(world_map_json.features)
        .enter()
        .append("path")
        .attr( "fill", function (d) {
            d.total = tweetsByCountry.get(d.properties.name) || 0;
            return colorScale(d.total);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr( "stroke", "#fff")
        .attr( "d", geoGenerator );
updateMap();

var inputValue = null;
var dates = ['October 15, 2020', 'October 16, 2020', 'October 17, 2020', 'October 18, 2020', 'October 19, 2020',
            'October 20, 2020', 'October 21, 2020', 'October 22, 2020 - Debate Day', 'October 23, 2020 - Debate Day + 1', 'October 24, 2020', 
            'October 25, 2020', 'October 26, 2020', 'October 27, 2020', 'October 28, 2020', 'October 29, 2020',
            'October 30, 2020', 'October 31, 2020', 'November 1, 2020', 'November 2, 2020', 'November 3, 2020 - Election Day', 
            'November 4, 2020 - Election Day + 1', 'November 5, 2020', 'November 6, 2020', 'November 7, 2020 - Biden declared winner', 'November 8, 2020'];

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
    currentDate = testDates[value];
    updateMap();
};

const radioButtonInput = document.getElementById("btn-group");
radioButtonInput.addEventListener('input', updateIncludeUS);

function updateIncludeUS(e) {
    var buttonPushed = e.target.value;
    if (buttonPushed == "includeUS") {
        if (includeUS) return;
        includeUS = true;
    }
    else {
        if (!includeUS) return;
        includeUS = false;
    }
    updateMap();
}

const searchBoxInput = document.getElementById("hashtag-search-box");
searchBoxInput.addEventListener('input', updateSearch);

function updateSearch(e) {
    var searchedHashtag = e.target.value.toLowerCase();
    currentHashtag = searchedHashtag;
    updateMap();
}

function updateSearchWOListener(newText) {
    currentHashtag = newText;
    updateMap();
}

function updateMap() {
    // Filter and get new data
    const newData = small_data.features
                         .filter(function(data) {
                             if (includeUS) return true;
                             return data.properties.country != "United States";
                         })
                         .filter(function(data) {
                            var dataHashtags = data.properties.hashtags.toLowerCase();
                            var isDataHasHashtag = dataHashtags.includes(currentHashtag);
                            var isDataCreatedAt = data.properties.created_at.includes(currentDate);
                            return isDataCreatedAt && isDataHasHashtag; 
                         });

    var tweetsByCountry = d3.rollup(newData, v => v.length, d => d.properties.country);

    tip = d3.tip()
            .attr('class', 'd3-tip')
            .direction('e').offset([-5, -3])
            .html(function(d) {
                var totalTweet = tweetsByCountry.get(d.properties.name) || 0;
                return d.properties.name + ": " + totalTweet;
            });
    svg.call(tip);

    map_svg.selectAll("path")
    .data(world_map_json.features)
    .join("path")
    .attr( "fill", function (d) {
        d.total = tweetsByCountry.get(d.properties.name) || 0;
        return colorScale(d.total);
      })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .attr( "stroke", "#fff")
    .attr( "d", geoGenerator );
}

// ------------------------ code for wordcloud -------------------------------
// get the words
var allHashtagsNotFlattened = small_data.features
                            .map(function(d) {
                                const hashtagList = d.properties.hashtags.substring(1, d.properties.hashtags.length-1).split(",");
                                const hashtags = hashtagList.map(function(h) {
                                                                    let trimmedHash = "";
                                                                    for (let i=0;i<h.length;i++) {
                                                                        if (h[i] === "'" || h[i] === " ") continue;
                                                                        trimmedHash = trimmedHash + h[i];
                                                                    }
                                                                    return trimmedHash.toLowerCase();
                                                                });
                                
                                return hashtags;
                            });
var allHashtags = [].concat.apply([], allHashtagsNotFlattened);
// convert all same hashtags to count
var allHashtagsCount = d3.rollups(allHashtags, group => group.length, w => w)
                        .sort(([, a], [, b]) => d3.descending(a, b))
                        .slice(0, 20)
                        .filter(([text, value]) => value > 1)
                        .map(([text, value]) => ({text, value}));

// below code is adapted from: https://observablehq.com/@contervis/clickable-word-cloud
const word_width = 800; // TODO: change this
const word_height = 500;
const fontFamily = "Verdana, Arial, Helvetica, sans-serif";
let word_svg = d3.select("#wordcloud-placeholder").append('svg')
                 .style("width", word_width)
                 .style("height", word_height)
                 .attr("font-familiy", fontFamily)
                 .attr("text-anchor", "middle");

let s = d3.scaleSqrt()
        .domain([1, d3.max(allHashtagsCount.map(d => d.value))])
        .range([6, 82]);

const cloud = d3.layout.cloud()
        .size([width, height])
        .words(allHashtagsCount.map(d => Object.create(d)))
        .padding(1)
        .text(function(d) { return d.text; })
        .rotate(() => 0)
        .font(fontFamily)
        .fontSize(d => s(d.value))
        .on("word", ({size, x, y, rotate, text}) => {
        word_svg.append("text")
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text)
            .classed("click-only-text", true)
            .classed("word-default", true)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleClick);
  
        function handleMouseOver(d, i) {
            d3.select(this)
                .classed("word-hovered", true)
                .transition(`mouseover-${text}`).duration(300).ease(d3.easeLinear)
                .attr("font-size", size + 2)
                .attr("font-weight", "bold");
        }
        
        function handleMouseOut(d, i) {
            d3.select(this)
                .classed("word-hovered", false)
                .interrupt(`mouseover-${text}`)
                .attr("font-size", size)
                .attr("font-weight", "normal");
        }
        
        function handleClick(d, i) {
            console.log(text);
            var textInput = document.getElementById('hashtag-search-box');
            textInput.value = text;
            updateSearchWOListener(text);
        }

    });
cloud.start();

