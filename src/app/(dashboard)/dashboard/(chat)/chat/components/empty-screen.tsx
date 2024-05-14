


export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h3 className="text-lg font-semibold">
          Welcome! I&apos;m your very own legal assistant.
        </h3>
        <p className="leading-normal text-muted-foreground">
          You can ask me questions about your documents, or use me as a general
          assistant.
        </p>
      </div>
    </div>
  );
}
