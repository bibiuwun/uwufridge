package diet

import "math"

type ActivityLevel int64

const (
	ActivityLevelOne   ActivityLevel = 1
	ActivityLevelTwo   ActivityLevel = 2
	ActivityLevelThree ActivityLevel = 3
	ActivityLevelFour  ActivityLevel = 4
)

type Goal string

const (
	FatLoss  Goal = "fat_loss"
	Maintain Goal = "maintain"
	Bulk     Goal = "bulk"
)

type Gender string

const (
	Male   Gender = "m"
	Female Gender = "f"
)

type Person struct {
	Age            int64
	Sex            Gender
	Height         float64
	Weight         float64
	Goal           Goal
	Activity_level ActivityLevel
}

func (p *Person) REE() float64 {
	if p.Sex == Male {
		return (10 * p.Weight) + (6.25 * p.Height) - (5 * float64(p.Age)) + 5
	} else {
		return (10 * p.Weight) + (6.25 * p.Height) - (5 * float64(p.Age)) - 161
	}
}

func (p *Person) MaintenanceCalories() float64 {
	calories_table := map[ActivityLevel]float64{
		ActivityLevelOne:   1.2,
		ActivityLevelTwo:   1.375,
		ActivityLevelThree: 1.55,
		ActivityLevelFour:  1.725,
	}

	return p.REE() * calories_table[p.Activity_level]
}

func (p *Person) CalorieIntakeLower() int {
	if p.Goal == FatLoss {
		return int(p.MaintenanceCalories() - (p.MaintenanceCalories() * 0.05))
	} else if p.Goal == Bulk {
		return int(p.MaintenanceCalories() + (p.MaintenanceCalories() * 0.05))
	} else {
		return int(p.MaintenanceCalories())
	}
}

func (p *Person) CalorieIntakeUpper() int {
	if p.Goal == FatLoss {
		return int(p.MaintenanceCalories() - (p.MaintenanceCalories() * 0.20))
	} else if p.Goal == Bulk {
		return int(p.MaintenanceCalories() + (p.MaintenanceCalories() * 0.20))
	} else {
		return int(p.MaintenanceCalories())
	}
}

func (p *Person) MacroSplit(calorie_per_day int64) (float64, float64, float64) {
	carb := (float64(calorie_per_day) * 0.40) / 4
	protein := (float64(calorie_per_day) * 0.30) / 4
	fat := (float64(calorie_per_day) * 0.30) / 9
	return normal_round(carb), normal_round(protein), normal_round(fat)
}

func normal_round(x float64) float64 {
	if x-math.Floor(x) < 0.5 {
		return math.Floor(x)
	} else {
		return math.Ceil(x)
	}
}
