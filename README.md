# The World is Watching: US Election 2020

6.859 Assignment 4 completed by Charvi Gopal, Eesam Hourani, and Stacia Johanna.

## Intended Goals

*The World is Watching: US Election 2020* tells the story of the world intently watching the 2020 U.S. Election. Using tens of thousands of tweets from the days leading up to the election, our visualization makes use of Tweet and hashtag counts to answer the question, "What does the world think of the 2020 U.S. Election?" Viewers can explore the dates and hashtags that result in the greatest number of Tweets. One can also zoom in and focus on a specific country or watch the globe discuss the election. With this visualization, we hope viewers can gain a global perspective on such a consequential election in modern American history.



## Dataset

The dataset used in this visualization is US Election 2020 tweets from October 15, 2020 to November 8, 2020. Because of GitHub's maximize size restriction, we only used 50,000 tweets, which is about 10% of the overall database.

The dataset is acquired from https://www.kaggle.com/manchunhui/us-election-2020-tweets. The time zone of all Tweets is GMT+0.



### Data Cleanup

As the first step, we remove all the columns unrelated to our visualization goal, such as Twitter user's join date, user's hash ID, etc. Then, since we want to visualize the data in the form of a map, we remove all the rows which have empty longitude and/or latitude value. 

During our initial data exploration, we found that some of the countries are written in different ways. For example, tweets from the U.S. has values in the country column written as "United States" or "United States of America". The same problems applies to other countries: ("Netherlands", "The Netherlands"), ("Bahamas", "The Bahamas"), and ("Congo", "Congo-Brazzaville", "Republic of the Congo"). Other than that, some of the cells in the country column is empty, so we fill those with countries generated using the help of geocoders library and the latitude/longitude column.

Then, we extract the hashtags from the tweet column using regex, and create a new column to retain the result. To reduce the size of the dataset, we then discard the tweet column.

In the Kaggle website, the data that we obtained are separated into 2 different .csv files: one for Biden-related tweets, and the other for Trump-related tweets. After doing all the steps mentioned in the previous paragraphs for both datasets, we combine both of them into 1 table. Since some of the tweets may contain both #biden and #trump, we remove all the duplicates in the combined table.

As the final step, because Github has size limit of 100 MB per file and to ensure the smoothness of the interaction in our website, we shuffle all the rows in the combined data, then take the top 50,000 rows to be visualized in the website.

To see more detail on how the data is cleaned, check out Data Cleaning.ipynb in the `scripts` folder.

## Design Decisions

### Encodings

For our visualization, we used a variety of visual encodings to effectively communicate its intended message to viewers. Primarily, *The World is Watching* represents the quantity of election-related Tweets using a chloropleth - a map that uses color as a visual encoding. Color serves as an effective encoding for Tweet count because, combined with the specific number tooltip, it provides an accurate view of countries' relative Tweet counts compared to each other. Additionally, the word cloud uses size as a visual encoding for the number of Tweets containing a particular hashtag. This encoding is effective because it allows viewers to compare hashtag frequency while making the hashtags visible. It also takes advantage of the cultural significance of word maps, serving as a familiar format for audiences.



### Interactions & Animation Techniques - Charvi

* Slider

* Tooltip

* Search bar

* Click on country

* Zoom animation

* Click on word cloud

* TODO: anything else?

  

### Exploring Alternatives
#### Choropleth vs. Bubble Map
For the main visualization, we are considering between using choropleth and bubble map to visualize the number of tweets available. We decided against bubble map since some of the countries are really small, so if the diameter of the bubble is larger than the country, it will cover the others. Also, some of the countries have very few tweets, and this will cause the size of the bubble to be too small and not visible.

Other than from our own discussion, we also consider the peer review feedbacks, in which almost all of them agree that choropleth is better to visualize our data compared to bubble map for the same reasons we stated above. 

#### Word Cloud vs. Leaderboard
To give suggestions of what hashtags that readers can search, we provide word cloud near the search bar. Initially, we are considering between using word cloud or leaderboard. We decided to use word cloud as the size encoding can give users a sense of magnitude instead of just listing the hashtags in the form of leaderboard. Also, the size of the hashtags can help users to know which hashtags to focus on, as the more the hashtags are mentioned in the tweets, the larger the hashtags will be.



## Development Process

##### Total Time Spent: 60 hrs

Of this time, the most difficult and time-consuming tasks involved conducting the data cleanup and initially plotting the data on a world map. Specifically, the initial data that we acquired from Kaggle requires us to use different delimiter and encoding for it to be readable in Tableau. Also, some of the newline spaces in the tweets column are not parsed correctly, thus we have to manually find and remove those rows from the table so the rest of the data can be parsed. Additionally, we faced a significant roadblock when trying to plot the data on a map. It took several iterations before we realized we needed to convert our CSV into TopoJSON to make it compatible with d3. It also took us time to figure out that in order to have the lat/long points show up on a baseline map, we needed to plot a TopoJSON world map projection. After moving past these roadblocks, we were on course to make a usable, insightful MVP that would motivate our final submission.

Below is a person-by-person breakdown of project contributions:

| Name           | Project Contribution                                         |
| -------------- | ------------------------------------------------------------ |
| Charvi Gopal   | GeoJSON conversion, basic choropleth logic, zooming behavior, legend                                                              |
| Eesam Hourani  | Initial exploratory analysis, time slider data filtering, time slider improved design, writeup outline |
| Stacia Johanna | Data cleanup, UI and d3/data processing of: hashtag search, word cloud, include/exclude US toggle, overall web layout, help button popover |



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
