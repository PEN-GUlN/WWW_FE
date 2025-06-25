export const calculateDaysRemaining = (deadline: string): number => {
  const today = new Date();
  const end = new Date(deadline);
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};
