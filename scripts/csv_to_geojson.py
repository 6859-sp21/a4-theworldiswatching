import csv, json
from geojson import Feature, FeatureCollection, Point

features = []
with open('../data/test0_geoJSONPlotting.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for created_at, tweet, likes, retweet_count, source, user_name, user_screen_name, user_description,  user_followers_count, user_location, latitude, longitude, city, country, continent, state, state_code, hashtags in reader:
        if (latitude != 'latitude'):
            try:
                print(latitude)
                latitude, longitude = map(float, (latitude, longitude))
                features.append(
                    Feature(
                        geometry = Point((longitude, latitude)),
                        properties = {
                            'created_at' : created_at,
                            'tweet': tweet,
                            'likes': likes,
                            'retweet_count': retweet_count,
                            'source' : source,
                            'user_name' : user_name,
                            'user_screen_name' : user_screen_name,
                            'user_description' : user_description,
                            'user_followers_count' : user_followers_count,
                            'user_location' : user_location,
                            'city' : city,
                            'country' : country,
                            'continent' : continent,
                            'state' : state,
                            'state_code' : state_code,
                            'hashtags' : hashtags
                            
                        }
                    )
                )
            except:
                pass

collection = FeatureCollection(features)
with open("../data/test0_geoJSONPlotting.geojson", "w") as f:
    f.write('%s' % collection)
    
    
# source: https://stackoverflow.com/questions/48586647/python-script-to-convert-csv-to-geojson
