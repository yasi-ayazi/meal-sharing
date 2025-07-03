const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
export default function api(path) {
  return `${BASE_URL}${path}`;
}
