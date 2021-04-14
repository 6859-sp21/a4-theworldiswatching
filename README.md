# The World is Watching: US Election 2020

6.859 Assignment 4 completed by Charvi Gopal, Eesam Hourani, and Stacia Johanna.

## Intended Goals - Eesam

* Answer the question: "what does the world think of the U.S.?"
* Perhaps include quote from peer review re: international focus



## Dataset - Eesam

The dataset used in this visualization is US Election 2020 tweets from October 15, 2020 to November 8, 2020. Because of size restriction, only 50,000 tweets data is used.

The dataset is acquired from https://www.kaggle.com/manchunhui/us-election-2020-tweets.

* Time zone

### Data Cleanup

TODO - Stacia



## Design Decisions

### Encodings - Eesam

* Map

* Color

* Word cloud uses size

* Tooltip details on tweet count

* TODO: anything else?

  

### Interactions & Animation Techniques - Charvi

* Slider

* Tooltip

* Search bar

* Click on country

* Zoom animation

* TODO: anything else?

  

### Exploring Alternatives - Stacia
#### Choropleth VS Bubble Map
For the main visualization, we are considering between using choropleth and bubble map to visualize the number of tweets available. We decided against bubble map since some of the countries are really small, so if the diameter of the bubble is larger than the country, it will cover the others. Also, some of the countries have very few tweets, and this will cause the size of the bubble to be too small and not visible.

Other than from our own discussion, we also

#### Word Cloud VS Leaderboard
* Bubble map vs. chloropleth --> peer review feedback
* Word cloud vs. leaderboard --> size encoding gives a sense of magnitude as opposed to leaderboard



## Development Process

* Total time spent:

* What took the most time? Data cleanup, putting the map together (TopoJSON of world map) - Eesam

| Name           | Project Contribution |
| -------------- | -------------------- |
| Charvi Gopal   |                      |
| Eesam Hourani  |                      |
| Stacia Johanna |                      |



## Resources (TODO: Reformat - Eesam)

Tutorials and other learning materials we used:

- projections from https://github.com/d3/d3-geo-projection
- https://www.d3indepth.com/geographic/
- Slider code adapted from https://codepen.io/trevanhetzel/pen/rOVrGK

For choropleths:

- http://bl.ocks.org/stevenae/8362841?fbclid=IwAR23VlKEqpkOzd-ZQ52qFUeppmNpuK9d3MxgLh6lYwLoJzds-magPiicM78
- https://d3-geomap.github.io/map/choropleth/world/
- https://bl.ocks.org/mbostock/2206590?fbclid=IwAR2kSSQF5ikNSoB7SinuiMgm271ahH1DsEAqog9TZvt9nJprf6yZovXuX6Q 

Inspirations: