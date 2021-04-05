import csv, json
from geojson import Feature, FeatureCollection, Point

features = []
with open('test0_geoJSONPlotting.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for created_at, tweet, likes, retweet_count, source,  user_name, user_screen_name, user_description,  user_followers_count, user_location, latitude, longitude, city, country, continent, state, state_code, hashtags in reader:
        if (latitude != 'latitude'):
            try:
                print(latitude)
                latitude, longitude = map(float, (latitude, longitude))
                features.append(
                    Feature(
                        geometry = Point((longitude, latitude)),
                        properties = {
                            'user_location': user_location,
                            'tweet': tweet,
                            'likes': likes
                        }
                    )
                )
            except:
                pass

collection = FeatureCollection(features)
with open("test0_geoJSONPlotting.geojson", "w") as f:
    f.write('%s' % collection)
    
    
# source: https://stackoverflow.com/questions/48586647/python-script-to-convert-csv-to-geojson
