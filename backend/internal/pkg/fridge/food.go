package fridge

type Food struct {
	Name         string
	Brand        string
	Age          int64
	TotalServing float64
	ServingSize  float64
	Kcal         float64
	Protein      float64
	Carbs        float64
	Fat          float64
}

func (f *Food) GetAge() int64 {
	return f.Age
}

func (f *Food) GetServing() (float64, float64) {
	return f.TotalServing, f.ServingSize
}

func (f *Food) GetMacros() (float64, float64, float64) {
	return f.Fat, f.Protein, f.Carbs
}
