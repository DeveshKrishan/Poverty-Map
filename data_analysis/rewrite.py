import requests
import json


def main() -> None:
    '''Note that this is a fix to our original data.csv.'''
    # https://gist.github.com/rogerallen/1583593
    # Thank you for this contribution, Roger!

    us_state_to_abbrev = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY",
        "District of Columbia": "DC",
        "American Samoa": "AS",
        "Guam": "GU",
        "Northern Mariana Islands": "MP",
        "Puerto Rico": "PR",
        "United States Minor Outlying Islands": "UM",
        "U.S. Virgin Islands": "VI",
    }


    url = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"

    response = requests.get(url)

    data = json.loads(response.text)['objects']

    # Grabbing data for counties and states
    county_data = data['counties']['geometries']
    state_data = data['states']['geometries']

    id_to_county = {}
    id_to_state = {}
    write_to_json = {}
    
    # Map each id to a name
    for i in county_data:
        id_to_county[i['id']] = i['properties']['name']

    for i in state_data:
        id_to_state[i['id']] = i['properties']['name']
    
    for i, j in id_to_county.items():
        try:
            write_to_json[i] = [f"{j} County", us_state_to_abbrev[id_to_state[i[0:2]]]]
        except KeyError:
            pass

    json_object = json.dumps(write_to_json, indent=4) # indent is how many spaces to indent with

    with open("county_id.json", "w") as outfile: # Write to a .json file
        outfile.write(json_object)

if __name__ == "__main__":
    main()