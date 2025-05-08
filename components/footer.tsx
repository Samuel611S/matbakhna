export function Footer() {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          &copy; {new Date().getFullYear()} Matbakhna. All rights reserved.
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Discover delicious recipes for every occasion
        </p>
      </div>
    </footer>
  )
}
