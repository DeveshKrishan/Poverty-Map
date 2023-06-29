import numpy as np
import pandas as pd
import requests

def api_request() -> None:
    """This functions sents multiple GET requests from the years 1995-2020 and generates .csv files for the given years."""
    key = open("key.txt").read()

    year = np.arange(1997,2021)
        
    appended_data = []
    for _ in year:
        try:
            URL = f"https://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEPOVALL_PT,SAEPOVRTALL_PT,SAEMHI_PT,STABREV&for=county:*&time={_}&key={key}"
            r = requests.get(url = URL).json()
            tmp = pd.DataFrame(r)
            tmp = tmp.drop(index=0)
            appended_data.append(tmp)
            print(_)
        except:
            print(f"No data for {_}")
    
    appended_data = pd.concat(appended_data)
    appended_data["Id"] = list(range(1,len(appended_data)+1))
    appended_data.columns = ['County', 'Count Estimate', 'Rate Estimate', 'Median Household Income', 'State', 'Year', 'State Code', 'County Code']
    appended_data.to_csv('Dataset/data.csv', header=True, index=False)

def main():
    api_request()

if __name__ == "__main__":
    main()
