import argon2i from 'argon2'

export const ArgonHash = async (hash: string): Promise<string | undefined> => {
    try {
        return await argon2i.hash(hash)
    } catch(e) {
        console.log(e)
        return undefined;
    }
}

export const ArgonVerify = async (hash: string, verify: string): Promise<boolean> => {
    try {
        return await argon2i.verify(hash, verify)
    } catch(e) {
        console.log(e)
        return false;
    }
}
