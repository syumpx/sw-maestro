export const COLORS = {
  primary: "#4F46E5",
  primaryDark: "#4338CA",
  background: "#FAFAFA",
  quadrants: {
    active_structured: "#EEF2FF",
    active_free: "#FEF3C7",
    passive_structured: "#ECFDF5",
    passive_free: "#FFF1F2",
  },
  dots: [
    "#4F46E5",
    "#DC2626",
    "#059669",
    "#D97706",
    "#7C3AED",
    "#DB2777",
    "#0891B2",
    "#65A30D",
    "#EA580C",
    "#6366F1",
  ],
} as const;

export const ROUTES = {
  home: "/",
  assessment: "/assessment",
  result: (id: string) => `/result/${id}`,
  teamNew: (resultId: string) => `/team/new?resultId=${resultId}`,
  team: (id: string) => `/team/${id}`,
  teamJoin: (id: string) => `/team/${id}/join`,
} as const;
