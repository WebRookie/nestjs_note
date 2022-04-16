

import md5 from 'md5'

export function md5Code (...props:any) :string {
    return md5(...props)
}