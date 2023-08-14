# Replace row numbers with UIDs made from state and county IDs

data = read.csv("Data.csv")
data$County.Code = sprintf("%03d", data$County.Code)
data$State.Code = sprintf("%02d", data$State.Code)
data$Id = paste(data$State.Code, data$County.Code, sep = "")
row.names(data) = c("County","Count Estimate","Rate Estimate","Median Household Income","State","Year","State Code","County Code","Id")
write.csv(data, "Data.csv", row.names = FALSE)


