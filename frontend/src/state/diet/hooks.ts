import { useAppSelector } from "../hooks";

export function useDiet() {
  const diet = useAppSelector((state) => state.diet);
  return diet;
}