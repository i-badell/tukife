import type { Stand } from "./products"

export type MainPageData = {
	lastUpdated: Date,
	eventId: string,
	eventName: string,
	eventBanner: string, 
	hasMultipleStands: boolean,
	stands: Stand[]
}