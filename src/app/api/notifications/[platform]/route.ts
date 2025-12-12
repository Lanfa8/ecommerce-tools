import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    console.log('Received notification for platform:', req.query.platform);
    console.log('Notification body:', req.body);
    res.status(200).json({ message: 'Received' })
}