# Replace row numbers with UIDs made from state and county IDs

data = read.csv("Data.csv")
data$County.Code = sprintf("%03d", data$County.Code)
data$State.Code = sprintf("%02d", data$State.Code)
data$Id = paste(data$State.Code, data$County.Code, sep = "")
colnames(data) = c("County","Count Estimate","Rate Estimate","Median Household Income","State","Year","State Code","County Code","Id")
write.csv(data, "Data.csv", row.names = FALSE)


# Compute min/max yearly statistics for parameters
library(jsonlite)

# remove rows with NA values
data = na.omit(data)

# aggregate minimum and maximum of rate estimate
pv_rate = data.frame(aggregate(data$Rate.Estimate, list(data$Year), FUN=min)[,2],
  aggregate(data$Rate.Estimate, list(data$Year), FUN=max)[,2])
colnames(pv_rate) = NULL

# aggregate minimum and maximum of marks with median household income
income = data.frame(aggregate(data$Median.Household.Income, list(data$Year), FUN=min)[,2],
  aggregate(data$Median.Household.Income, list(data$Year), FUN=max)[,2])
colnames(income) = NULL

for(i in 1:nrow(pv_rate)) {
  ls[[i]]$rate = pv_rate[i,]
}

for(i in 1:nrow(income)) {
  ls[[i]]$income = income[i,]
}

names(ls) = c(1997,1998, 2000:2020)


json_min_max = toJSON(ls)
write(json_min_max, "min_max.json")
