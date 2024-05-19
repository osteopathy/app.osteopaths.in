'use server'
import e from '@/lib/edgeql-js'
import { client } from "@/lib/db";
import { slugify } from '@/lib/utils';

export async function setUsername(userId:string,username:string,) {
    // let username = formData.get('username') as string;
    username = slugify(username);

    const existingOsteopathWithSameUsername = await e.select(e.Osteopath, () => ({
        id: true,
        filter_single: { username, }
    })).run(client);

    if (existingOsteopathWithSameUsername) {
        return {
            error: true,
            message: `username already exist ${username}`,
            username: username?.toString(),
        }
    }

    const user = await e.select(e.User, () => ({
        id: true,
        osteopath: true,
        filter_single: { id: userId }
    })).run(client);
    if (!user) {
        return {
            error: true,
            username: username?.toString(),
            message: 'user not found'
        }
    }

    const osteopath = user.osteopath;
    
    if (!osteopath) {
        return {
            error: true,
            username: username?.toString(),
            message: 'osteopath not found'
        }
    }

    await e.update(e.Osteopath, () => ({
        filter_single: { id: osteopath?.id },
        set: {
            username: username
        }
    })).run(client);

    return {
        error: false,
        username: username?.toString(),
        message: 'username created'
    };
}