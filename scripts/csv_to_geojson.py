import csv, json
from geojson import Feature, FeatureCollection, Point

features = []
with open('../data/combined_data_small.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for created_at, latitude, longitude, country, continent, state, hashtags in reader:
        if (latitude != 'latitude'):
            try:
                latitude, longitude = map(float, (latitude, longitude))
                features.append(
                    Feature(
                        geometry = Point((longitude, latitude)),
                        properties = {
                            'created_at' : created_at,
                            'country' : country,
                            'continent' : continent,
                            'state' : state,
                            'hashtags' : hashtags
                        }
                    )
                )
            except:
                pass

collection = FeatureCollection(features)
with open("../data/combined_data_small.geojson", "w") as f:
    f.write('%s' % collection)
    
    
# source: https://stackoverflow.com/questions/48586647/python-script-to-convert-csv-to-geojson
