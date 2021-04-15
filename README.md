# The World is Watching: US Election 2020

6.859 Assignment 4 completed by Charvi Gopal, Eesam Hourani, and Stacia Johanna.

## Intended Goals

*The World is Watching: US Election 2020* tells the story of the world intently watching the 2020 U.S. Election. Using tens of thousands of tweets from the days leading up to the election, our visualization makes use of tweet and hashtag counts to answer the question, "What does the world think of the 2020 U.S. Election?" Viewers can explore the dates and hashtags that resulted in the highest (or lowest) number of election-related tweets. Viewers can also zoom in and focus on a specific country or, conversely, watch as the rest of the world discusses the election. With this visualization, we hope viewers can gain a global perspective on such a consequential election in modern American history.



## Dataset

The dataset used in this visualization is "US Election 2020 tweets from October 15, 2020 to November 8, 2020," which compiles tweets that have #trump or #biden. Because of GitHub's maximize file size restriction, we randomly sampled 50,000 tweets in our final visualization, which is about 10% of the overall database. All tweets are reported using a GMT+0 time zone.

The dataset can be found on https://www.kaggle.com/manchunhui/us-election-2020-tweets.



### Data Cleanup

As the first step, we removed all the columns in the dataset unrelated to our visualization goal, such as a Twitter user's `join date`, users' `hash ID`, etc. Then, since we want to visualize the data in the form of a map, we removed all the rows which had empty longitude and/or latitude values.

During our initial data exploration, we found that some of the countries are represented using a variety of names. For example, tweets from the U.S. have values in the `country` column written as both "United States" or "United States of America." The same phenomenon exists in other countries: ("Netherlands", "The Netherlands"), ("Bahamas", "The Bahamas"), and ("Congo", "Congo-Brazzaville", "Republic of the Congo"). On top of this, some of the cells in the `country` column were empty, so we filled those with countries generated using the help of a geocoders library and the latitude/longitude values.

Then, we extracted the hashtags from the `tweet` column using regex and created a new column to retain the result. To reduce the size of the dataset, we then discarded the `tweet` column.

From the original datasource on Kaggle, the data was separated into 2 different .csv files: one for Biden-related tweets, and the other for Trump-related tweets. After completing all the steps mentioned thus far  both datasets, we combined both of them into a single table. Since some of the tweets contained both #biden and #trump, we removed all the duplicates after combining the two files.

As the final step, because Github has size limit of 100 MB per file and to ensure the smoothness of the interaction on our website, we randomly shuffled all the rows in the combined data, then extracted the top 50,000 rows to be visualized in the website.

To see more detail on how the data is cleaned, check out `Data Cleaning.ipynb` in the `scripts` folder.

We converted the cleaned CSV file into a GeoJSON file for displaying the geographical data on a map using separate script as well.

## Design Decisions

### Encodings

In *The World is Watching*, we used a variety of visual encodings to effectively communicate the intended message to viewers. Primarily, our visualization displays the quantity of election-related tweets via a chloropleth - a map that uses color as a visual encoding. Color serves as an effective encoding for tweet count because, combined with the specific number of tweets tooltip, it provides an accurate view of countries' relative tweet counts compared to each other. We used a logarithmic scale for the color legend because it suits the nature of the dataset better; the United States is an outlier with a significantly higher number of tweets for all dates in our range, leading us to abandon a linear scale. This enables viewers to more clearly see trends in the number of tweets outside the U.S. as well.

Additionally, the word cloud uses size as a visual encoding for the number of tweets containing a particular hashtag. This encoding is effective because it allows viewers to compare hashtag frequency while making the hashtags readible. Because we were dealing with textual data, we deliberately chose size above other encodings recommended by Munzner, such as position. In other words, we want our audience to identify not just the magnitude of the number of occurrences of a particular hashtag, but also the content of the hashtag itself. Size accompishes this effectively, allowing us to take advantage of the cultural significance and familiar format of word maps.



### Interactions & Animation Techniques

We added the following interactions and animation techniques while attempting to minimize hidden interactions.

#### Slider
Above the map, we have a time slider that can be changed either by dragging or by clicking. As one moves the time slider, both the map and hashtag word cloud update.

We chose to use a slider because it serves as a visual reminder of the chronological nature of our data. As users scrub through the slider, we want them to be observing changes in the chloropleth. Additionally, we've labeled parts of the slider with key dates that are of great significance in the election, such as the date of the Final Presidential Debate (10/22), Election Day (11/3), and the day Biden was declared the winner (11/7). These values came from our exploratory data analysis, which highlighted a sharp increase in the day *after*, due to the tweets being recorded in GMT time.

Since it is quite clear that the slider can be moved to the left and right to vary time, we do not explicitly include textual instructions for the time slider. We do, however, include supplementary instructions about the 'timeline' upon clicking the question mark icon on the bottom left.

#### Search Bar
To the right of the map, we have a search bar for hashtags, and the map updates in real-time as one types hashtags. The 'x' button on the righthand side can be used to empty the search bar should a viewer not want to repeatedly backspace.

We included a search bar because it very naturally lends itself to the textual data we were presenting. Rather than having a pre-selected group of popular hashtags, we wanted to give viewers the freedom to search and explore their own hashtags.

Since it is quite clear from the "Search a hashtag" placeholder and icons that the search bar can be used to input hashtags, we do not explicitly include textual instructions for the search bar directly beside the slider. We do, however, include supplementary instructions about the 'hashtag search' upon clicking the question mark icon on the bottom left.

#### Word Cloud
The hashtag word cloud enables users to interact with the content of the text in the tweets, both worldwide and by country. It updates whenever one clicks on a country, moves the time slider, or chooses 'Include US' or 'Exclude US.' When someone clicks on a particular hashtag on the word cloud, the search bar automatically updates with the clicked hashtag.

#### Tooltip and Country Zoom
When the viewer hovers over a country, the visualization shows the name of the country and the number of tweets for a particular day based on the slider. This tooltip works both for countries that are zoomed in and zoomed out. When a viewer clicks on a country, an animation plays that zooms in on the countries and centers it. We chose to use an animation to help orient viewers around the map and visualize the relationship between the zoomed-in and zoomed-out views. This zooming feature, combined with the tooltip, can enable viewers to explore a variety of countries, especially small countries that may not be easily explorable on a zoomed-out map. Because users may not be previously familiar with the zooming interaction, we include a sentence below the map guiding instructions. 


### Exploring Alternatives
#### Choropleth vs. Bubble Map
For the overall format of the visualization, we were torn between using choropleth and bubble map to visualize the number of tweets available. We decided against bubble map since some of the countries are really small, so if the diameter of the bubble is larger than the country, it could cover neighboring countries. Also, some of the countries have very few tweets, and this would cause the size of the bubble to be too small and not visible.

Other than from our own discussion, we also decided to verify this by posing the choice between a chloropleth and bubble map in our MVP presentation. In almost all cases, fellow 6.859 students agree that a choropleth is more effective in visualizing our data compared to bubble map for many of the same reasons we stated above.

#### Word Cloud vs. Leaderboard
To give viewers suggested hashtags to search, we provided a word cloud near the search bar. Initially, we were choosing between using a word cloud or a leaderboard-style visualization. We decided to use a word cloud since the size encoding can give users a sense of magnitude instead of just listing the hashtags in the form of a leaderboard. Also, the size of the hashtags can help users know which hashtags to focus on, as the more the hashtags are mentioned in the tweets, the larger the hashtags will be.



## Development Process

##### Total Time Spent: 60 hrs

In developing this project, the most difficult and time-consuming tasks involved conducting the data cleanup and initially plotting the data on a world map. Specifically, the initial data that we acquired from Kaggle requires us to use a special delimiter and encoding for it to be readable in Tableau. Also, some of the newline spaces in the tweets column are not parsed correctly, so we needed to manually find and remove those rows from the table so the rest of the data can be parsed. Additionally, we faced a significant roadblock when trying to plot the data on a map. It took several iterations before we realized we needed to convert our CSV into TopoJSON to make it compatible with d3. It also took us time to figure out that in order to have the lat/long points show up on a background map, we needed to plot a TopoJSON world map projection. After moving past these roadblocks, we were on course to make a usable, insightful MVP that would motivate our final submission.

Below is a person-by-person breakdown of project contributions:

| Name           | Project Contribution                                         |
| -------------- | ------------------------------------------------------------ |
| Charvi Gopal   | dataset-finding, conversion, basic choropleth logic, zooming behavior, legend |
| Eesam Hourani  | Initial exploratory analysis, time slider data filtering, time slider design, writeup outline |
| Stacia Johanna | Data cleanup, UI and d3/data processing of: hashtag search, word cloud, include/exclude US toggle, overall web layout, help button popover |



## Resources

Tutorials and other learning materials we used:

- Map projections: https://github.com/d3/d3-geo-projection
- d3 tutorial: https://www.d3indepth.com/geographic/
- Slider code adapted from: https://codepen.io/trevanhetzel/pen/rOVrGK

For choropleths:

- http://bl.ocks.org/stevenae/8362841?fbclid=IwAR23VlKEqpkOzd-ZQ52qFUeppmNpuK9d3MxgLh6lYwLoJzds-magPiicM78
- https://d3-geomap.github.io/map/choropleth/world/
- https://bl.ocks.org/mbostock/2206590?fbclid=IwAR2kSSQF5ikNSoB7SinuiMgm271ahH1DsEAqog9TZvt9nJprf6yZovXuX6Q 

Writeup:

* Tamara Munzner, Visualization Analysis and *Design* (2014).