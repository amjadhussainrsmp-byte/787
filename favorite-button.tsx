import { Bookmark } from "lucide-react";
import { useFavorites, type FavKind } from "@/lib/favorites";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FavoriteButton({
  kind,
  id,
  className,
}: {
  kind: FavKind;
  id: string;
  className?: string;
}) {
  const hydrated = useHydrated();
  const hasStored = useFavorites((s) => s.items[kind].includes(id));
  const toggle = useFavorites((s) => s.toggle);
  const has = hydrated && hasStored;

  return (
    <Button
      type="button"
      variant={has ? "default" : "outline"}
      size="sm"
      className={cn("gap-1.5", className)}
      onClick={() => toggle(kind, id)}
      aria-pressed={has}
      aria-label={has ? "Remove from shelf" : "Save to shelf"}
    >
      <Bookmark className={cn("size-4", has && "fill-current")} />
      {has ? "Saved" : "Save"}
    </Button>
  );
}
