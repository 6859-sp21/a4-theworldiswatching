# The World is Watching: US Election 2020

6.859 Assignment 4 completed by Charvi Gopal, Eesam Hourani, and Stacia Johanna.

## Intended Goals

*The World is Watching: US Election 2020* aims to give viewers an idea on how the world viewed the 2020 U.S. Election by using 

* Answer the question: "what does the world think of the U.S.?"
* Perhaps include quote from peer review re: international focus



## Dataset - Eesam

The dataset used in this visualization is US Election 2020 tweets from October 15, 2020 to November 8, 2020. Because of GitHub's maximize size restriction, we only used 50,000 tweets, which is about 10% of the overall database.

Tweets 

The dataset is acquired from https://www.kaggle.com/manchunhui/us-election-2020-tweets.

* Time zone

### Data Cleanup

As the first step, we remove all the columns unrelated to our visualization goal, such as Twitter user's join date, user's hash ID, etc. Then, since we want to visualize the data in the form of a map, we remove all the rows which have empty longitude and/or latitude value. 

During our initial data exploration, we found that some of the countries are written in different ways. For example, tweets from the U.S. has values in the country column written as "United States" or "United States of America". The same problems applies to other countries: ("Netherlands", "The Netherlands"), ("Bahamas", "The Bahamas"), and ("Congo", "Congo-Brazzaville", "Republic of the Congo"). Other than that, some of the cells in the country column is empty, so we fill those with countries generated using the help of geocoders library and the latitude/longitude column.

Then, we extract the hashtags from the tweet column using regex, and create a new column to retain the result. To reduce the size of the dataset, we then discard the tweet column.

In the Kaggle website, the data that we obtained are separated into 2 different .csv files: one for Biden-related tweets, and the other for Trump-related tweets. After doing all the steps mentioned in the previous paragraphs for both datasets, we combine both of them into 1 table. Since some of the tweets may contain both #biden and #trump, we remove all the duplicates in the combined table.

As the final step, because Github has size limit of 100 MB per file and to ensure the smoothness of the interaction in our website, we shuffle all the rows in the combined data, then take the top 50,000 rows to be visualized in the website.

To see more detail on how the data is cleaned, check out Data Cleaning.ipynb in the `scripts` folder.

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

  

### Exploring Alternatives
#### Choropleth VS Bubble Map
For the main visualization, we are considering between using choropleth and bubble map to visualize the number of tweets available. We decided against bubble map since some of the countries are really small, so if the diameter of the bubble is larger than the country, it will cover the others. Also, some of the countries have very few tweets, and this will cause the size of the bubble to be too small and not visible.

Other than from our own discussion, we also consider the peer review feedbacks, in which almost all of them agree that choropleth is better to visualize our data compared to bubble map for the same reasons we stated above. 

#### Word Cloud VS Leaderboard
To give suggestions of what hashtags that readers can search, we provide word cloud near the search bar. Initially, we are considering between using word cloud or leaderboard. We decided to use word cloud as the size encoding can give users a sense of magnitude instead of just listing the hashtags in the form of leaderboard. Also, the size of the hashtags can help users to know which hashtags to focus on, as the more the hashtags are mentioned in the tweets, the larger the hashtags will be.



## Development Process

* Total time spent:

* What took the most time? Data cleanup, putting the map together (TopoJSON of world map) - Eesam

| Name           | Project Contribution |
| -------------- | -------------------- |
| Charvi Gopal   |                      |
| Eesam Hourani  |                      |
| Stacia Johanna | data cleanup, hashtag search, word cloud, include/exclude US toggle, overall web layout, help button popover.              |



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