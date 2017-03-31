library(dplyr)
library(magrittr)
library(tidyr)

setwd("C://Users/racha/Desktop/Git/spring2017-datavis/02_Webpage/TestingGround/data/")
colombian <- read.csv("03_Assignment_3_Data.csv")
# 
# head(colombian)
# summary(colombian$year)

# filter data to dates of interest
colombian_clean <- colombian %>% filter(year < 2014) %>% group_by(year, age) %>% summarise(sumtotal = sum(total)) %>% 
  filter(age != "ND") 

colombian_clean$age <- recode_factor(colombian_clean$age, 'entre 0 y 5' = '0 to 5 years', 'entre 12 y 17' = '12 to 17 years', 
                                     'entre 18 y 28' = '18 to 28 years', 'entre 29 y 60' = '29 to 60 years',
                                     'entre 6 y 11' = '6 to 11 years', 'entre 61 y 100' = '61 to 100 years')

colombian_clean %>% write.csv('colombiandata.csv')
