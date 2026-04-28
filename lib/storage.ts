import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function consumeCredits(userId: string, amount: number): Promise<{ success: boolean; remaining: number; error?: string }> {
  try {
    const supabase = getSupabaseClient();
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();
    if (fetchError) throw new Error('无法获取用户积分');
    if (!profile) throw new Error('用户不存在');
    const currentCredits = profile.credits;
    if (currentCredits < amount) {
      return { success: false, remaining: currentCredits, error: '积分不足' };
    }
    const newCredits = currentCredits - amount;
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', userId);
    if (updateError) throw new Error('积分更新失败');
    return { success: true, remaining: newCredits };
  } catch (error: any) {
    console.error('consumeCredits error:', error.message);
    return { success: false, remaining: 0, error: error.message };
  }
}

export async function addHistoryItem(
  userId: string,
  item: { prompt: string; imageUrl: string; type: string; creditsUsed: number }
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('history').insert({
      user_id: userId,
      prompt: item.prompt,
      image_url: item.imageUrl,
      type: item.type,
      credits_used: item.creditsUsed,
      created_at: new Date().toISOString(),
    });
    if (error) throw new Error('历史记录插入失败');
    return { success: true };
  } catch (error: any) {
    console.error('addHistoryItem error:', error.message);
    return { success: false, error: error.message };
  }
}