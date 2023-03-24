export const BACKEND_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? 'http://ec2-3-39-74-147.ap-northeast-2.compute.amazonaws.com:8000'
    : 'https://rgurdygvq7.execute-api.ap-northeast-2.amazonaws.com';
