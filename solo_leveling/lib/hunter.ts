import { supabase } from '@/lib/supabase'
import { Quest } from '@/types/Quest'
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

// Fetches quests from Supabase
// Select supabase column and filter the id from data
export const fetchQuests = async (userId: string) => {
    const { data, error } = await supabase
    .from('quests') 
    .select('*') // Returns supabase columns
    .eq('user_id', userId) // Where clause to match id from supabase table

    if (error) throw error
    return data
}

// Save quest data method 
// userId and quests array as parameters to be used to saved into SQL table
// extract data from userId
export const saveQuests = async (userId: string, quests: Quest[]) => {
    const { error } = await supabase
    .from('quests')
    // update + insert quests if there
    // We can use .map method on quests array 
    .upsert(quests.map(q => ({
            id: q.id,
            user_id: userId,
            title: q.title,
            type: q.type,
            icon: q.icon,
            progress: q.progress,
            xp_reward: q.xpReward,
            completed: q.completed,
            created_at: q.createdAt,
            expires_at: q.expiresAt,
        })))
    if (error) throw error
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
