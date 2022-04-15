

import md5 from 'md5'

export function getCode ([props]:any) :string {
    return md5(...props)
}