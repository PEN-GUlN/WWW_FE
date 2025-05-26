export const calculateDaysRemaining = (deadline: string): number => {
  const today = new Date();
  const end = new Date(deadline);
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const getDeadlineBadgeColor = (days: number): string => {
  if (days < 0) return "bg-gray-300 text-gray-600";
  if (days === 0) return "bg-red-500 text-white";
  if (days <= 3) return "bg-orange-400 text-white";
  return "bg-green-500 text-white";
};
