# Add leading zeros

data = read.csv("Data.csv")
data$County.Code = sprintf("%03d", data$County.Code)
data$Id = paste(data$State.Code, data$County.Code, sep = "")
write.csv(data, "Data.csv")



     