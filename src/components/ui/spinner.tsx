import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="spinner"
      src="/loaders/blocks-shuffle-4.svg"
      role="status"
      aria-label="Loading"
      className={cn("size-4", className)}
      {...props}
    />
  )
}

export { Spinner }
