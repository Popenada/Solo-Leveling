import { supabase } from '@/lib/supabase'

// Hunter table is fetched from supabase and use API calls from supabase such as await
// Function call that fetches hunter profile information from data row
export const fetchHunterProfile = async (userId: string) => {
    const { data, error } = await supabase  
    .from('hunters')
    .select('*')
    .eq('id', userId)
    .single()
    
    if (error) throw error
    return data
}

export const saveHunterProfile = async (userId: string, data: any) => {
    const { error } = await supabase
    .from('hunters')
    .update({
        level: data.level,
        xp: data.xp,
        xp_to_next_level: data.xp_to_next_level,
        rank: data.rank,
        VIT: data.stats.VIT,
        STR: data.stats.STR,
        AGI: data.stats.AGI,
        INT: data.stats.INT,
        daily_streak: data.streak,
        total_quests_completed: data.totalQuestsCompleted,
        completed_today: data.completedToday,
    })
    .eq('id', userId)

    if (error) throw error
}
