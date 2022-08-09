package fridge

type Fridge struct {
	Name    string
	Coolbox []Food
	Icebox  []Food
}

func (f *Fridge) GetCoolbox() []Food {
	return f.Coolbox
}

func (f *Fridge) GetIcebox() []Food {
	return f.Icebox
}

func (f *Fridge) AddCoolbox(item Food) {
	f.Coolbox = append(f.Coolbox, item)
}

func (f *Fridge) AddIcebox(item Food) {
	f.Icebox = append(f.Icebox, item)
}

func (f *Fridge) RemoveCoolbox(item Food) {
	for i, v := range f.Coolbox {
		if v == item {
			f.Coolbox = append(f.Coolbox[:i], f.Coolbox[i+1:]...)
		}
	}
}

func (f *Fridge) RemoveIcebox(item Food) {
	for i, v := range f.Icebox {
		if v == item {
			f.Icebox = append(f.Icebox[:i], f.Icebox[i+1:]...)
		}
	}
}
