import csv
import json
from collections import defaultdict

def main() -> None:
    """Creates the index for the data.csv file to allow O(1) lookup time given a County id."""

    data_dict = defaultdict(dict) 

    with open("my-app\public\data.csv", 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:

            county_id = row['Id']
            year = row['Year']
            count_estimate = row['Count Estimate']
            rate_estimate = row['Rate Estimate']
            median_income = row['Median Household Income']
            
            data_dict[county_id][year] = {
                'count_estimate': count_estimate,
                'rate_estimate': rate_estimate,
                'median_income': median_income
            }

        with open("county_index.json", 'w') as json_file:
            json.dump(data_dict, json_file, indent=4)

if __name__ == "__main__":
    main()
