# uwu fridge / food add

import numpy as np
import matplotlib.pyplot as plt

CALORIE_GOAL_LIMIT = 1500 #kcal
PROTEIN_GOAL = 113 #grams
FAT_GOAL = 50 #grams
CARB_GOAL = 150 #grams

class Fridge:
    def __init__(self, name, coolbox=[], icebox=[]):
        self.name = name
        self.coolbox = coolbox
        self.icebox = icebox

    def add_coolbox(self, food):
        self.coolbox.append(food)
        
    def add_icebox(self, food):
        self.icebox.append(food)

    def show_coolbox(self):
        return self.coolbox

    def show_icebox(self):
        return self.icebox

    def show_fridge(self):
        return self.coolbox + self.icebox
    
class Food:
    def __init__(self, brand, name, age, total_serving, serving_size, kcal, fat, carb, protein):
        self.brand = brand
        self.name = name
        self.age = age
        self.total_serving = total_serving
        self.serving_size = serving_size
        self.kcal = kcal
        self.fat = fat
        self.carb = carb
        self.protein = protein

    def __repr__(self):
        return self.name

    def show_macros(self):
        print(f"Fat({self.fat}), Carb({self.carb}), Protein({self.protein})")

    def show_name(self):
        print(f"{self.name} from {self.brand}")

    def show_serving(self):
        print(f"Total: {self.total_serving}, Single: {self.serving_size}")

    def show_age(self):
        print(f"Shelf age: {self.age}")

    def show_info(self):
        self.show_name()
        self.show_serving()
        self.show_macros()
        self.show_age()


uwufridge = Fridge("uwufridge")
populate = True
print("Populate Fridge :3")
while populate:
    print("""
    (1) Add Food
    (2) Done
    """)

    choice = input("Choose an option: ")
    if choice == "1":
        add = input("brand, name, age, total_serving, serving_size, kcal, fat, carb, protein:")
        brand, name, age, total_serving, serving_size, kcal, fat, carb, protein = add.split(', ')
        food = Food(brand, name, age, total_serving, serving_size, kcal, fat, carb, protein)
        store = (input("Add to coolbox or icebox: "))
        if store == 'coolbox':
            uwufridge.add_coolbox(food)
        else:
            uwufridge.add_icebox(food)
    elif choice == "2":
        populate = False
        

        

        
