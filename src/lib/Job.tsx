export const calculateDaysRemaining = (deadline: string): number => {
  const today = new Date();
  const end = new Date(deadline);
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const DEADLINE_THRESHOLDS = {
  EXPIRED: 0,
  URGENT: 3,
} as const;

export const getDeadlineBadgeColor = (days: number): string => {
  if (days < DEADLINE_THRESHOLDS.EXPIRED) return 'bg-gray-300 text-gray-600';
  if (days === DEADLINE_THRESHOLDS.EXPIRED) return 'bg-red-500 text-white';
  if (days <= DEADLINE_THRESHOLDS.URGENT) return 'bg-orange-400 text-white';
  return 'bg-green-500 text-white';
};
