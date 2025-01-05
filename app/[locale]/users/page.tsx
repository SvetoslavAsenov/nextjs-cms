export default async function Users({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  return (
    <div>
      <h1>{locale}</h1>
    </div>
  );
}
