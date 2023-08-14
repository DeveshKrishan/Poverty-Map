import requests
import json


def main() -> None:
    '''Note that this is a fix to our original data.csv.'''

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
    state_data = data['states']['geometries']

    id_to_state = {}
    
    for i in state_data:
        try:
            id_to_state[i['id']] = {
                "name" : i['properties']['name'],
                "short" : us_state_to_abbrev[i['properties']['name']]
                }
        except KeyError:
            id_to_state[i['id']] = {
                "name" : i['properties']['name'],
                "short" : "N/A"
                }
    
    json_object = json.dumps(id_to_state, indent=4) # indent is how many spaces to indent with

    with open("state_id.json", "w") as outfile: # Write to a .json file
        outfile.write(json_object)

if __name__ == "__main__":
    main()