#!/usr/bin/env python
# coding: utf-8



import numpy as np
import pandas as pd
import requests

key = open("key.txt").read()

print(key)

URL = f"https://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEPOVALL_PT,SAEPOVRTALL_PT,SAEMHI_PT,SAEPOVU_ALL,STABREV&for=county:*&time=2018&key={key}"




r = requests.get(url = URL)
print(r.json())

