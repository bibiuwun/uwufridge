#uwu person class


## Maintenance Calorie
### 1. Little to no exercise = REE * 1.2
### 2. Light exercise (1-3 days/week) = REE * 1.375
### 3. Moderate active (3-5 days/week) = REE * 1.55
### 4. Very active (6-7 days/week) = REE * 1.725

import math

def normal_round(n):
    if n - math.floor(n) < 0.5:
        return math.floor(n)
    return math.ceil(n)

class Person:
    def __init__(self, age, sex, height, weight, goal, activitylvl):
        self.age = age
        self.sex = sex
        self.height = round(height/0.393701, 1) #convert to kg
        self.weight = math.ceil(weight*0.453592) #convert to cm
        self.goal = goal
        self.activitylvl = activitylvl

    def REE(self): 
        if self.sex == 'M':
            return (10 * self.weight) + (6.25 * self.height) - (5 * self.age) + 5
        else:
            return (10 * self.weight) + (6.25 * self.height) - (5 * self.age) - 161
        
    def maintenance_calories(self):
        d = {1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725}
        return math.ceil(self.REE() * d[self.activitylvl])
    
    def calorie_intake_lower(self): # 5% to 20% is a good amount
        if self.goal == 'Fat Loss':
            return int(self.maintenance_calories() - (self.maintenance_calories() * 0.05))
        elif self.goal == 'Bulk':
            return int(self.maintenance_calories() + (self.maintenance_calories() * 0.05))
        else:
            return int(self.maintenance_calories())

    def calorie_intake_upper(self): # 5% to 20% is a good amount
        if self.goal == 'Fat Loss':
            return int(self.maintenance_calories() - (self.maintenance_calories() * 0.20))
        elif self.goal == 'Bulk':
            return int(self.maintenance_calories() + (self.maintenance_calories() * 0.20))
        else:
            return int(self.maintenance_calories())

    def macro_split(self, calorie_per_day): # 40/30/30 rule
        carbg = (calorie_per_day * 0.40)/4
        proteing = (calorie_per_day * 0.30)/4
        fatg = (calorie_per_day * 0.30)/9
        return (normal_round(carbg), normal_round(proteing), normal_round(fatg))
    
        
#Testing
person_age = int(input("Age in Years: "))
person_sex = str(input("Sex [M or F]: "))
person_height = int(input("Height in Inches: "))
person_weight = int(input("Weight in lbs: "))
person_goal = str(input("Goal [Fat Loss, Maintain, Bulk]: "))
person_activitylvl = int(input("Activity Level [1,2,3,4]: "))

p = Person(person_age, person_sex, person_height, person_weight, person_goal, person_activitylvl)
a = p.calorie_intake_lower()
b = p.calorie_intake_upper()
print(p.macro_split(1500))
#print(p.macro_split(a))
#print(p.macro_split(b))

