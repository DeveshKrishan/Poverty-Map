import numpy as np
import pandas as pd
import requests

def api_request() -> None:
    """This functions sents multiple GET requests from the years 1995-2020 and generates .csv files for the given years."""
    key = open("key.txt").read()

    year = np.arange(1995,2021)
        
    for _ in year:
        try:
            URL = f"https://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEPOVALL_PT,SAEPOVRTALL_PT,SAEMHI_PT,STABREV&for=county:*&time={_}&key={key}"
            r = requests.get(url = URL).json()
            print(_)
            df = pd.DataFrame(r)
            df.to_csv(f'Dataset/{_}.csv', header=False, index=False)

        except:
            print(f"No data for {_}")

def main():
    api_request()

if __name__ == "__main__":
    main()
