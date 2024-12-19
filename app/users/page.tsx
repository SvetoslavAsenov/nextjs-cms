import { headers } from "next/headers";

export default async function Users() {
  const headersList = await headers();

  return (
    <div>
      <h1>{headersList.get("x-language") || "kur"}</h1>
    </div>
  );
}
