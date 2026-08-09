export interface IAdvertStatistics {
    viewsCount: number;
    viewsToday: number;
    viewsWeek: number;
    viewsMonth: number;
    averageRegionPrice: number;
    averageCountryPrice: number;
}

export type IAdvertViewsSet = Pick<
    IAdvertStatistics,
    "viewsCount" | "viewsToday" | "viewsWeek" | "viewsMonth"
>;
