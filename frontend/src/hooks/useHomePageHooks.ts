import { homepageApiService } from "@/api/homepageService"
import { HomePageData } from "@/types/shared/homePageTypes"

export const getHomePageData = async (page: number, userId?: string): Promise<HomePageData> => {
    const offset = Math.max(0, page - 1) * 6
    return await homepageApiService.getAllPosts({ offset }, userId?.toString())
} 