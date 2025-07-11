"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from '@stream-io/node-sdk'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('you need to log in to stream');
    if (!apiKey) throw new Error('Ther is a problem to connect with the server: No API Key');
    if (!apiSecret) throw new Error('Ther is a problem to connect with the server: No API secret');


    const client = new StreamClient(apiKey, apiSecret);

    const expirationTime = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, expirationTime, issuedAt)

    return token;
}