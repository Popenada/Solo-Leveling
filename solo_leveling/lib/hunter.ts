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

