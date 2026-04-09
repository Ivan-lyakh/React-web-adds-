import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wtdouereyzetyzzmrhjz.supabase.co'
const supabaseKey = 'sb_publishable_ausuwkm-W6zFjj8w2i1Meg_lIBr5IKa'

export const supabase = createClient(supabaseUrl, supabaseKey)