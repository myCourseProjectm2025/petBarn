import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { ShoppingBasket, Store, UserRound } from "lucide-react"

export function NavMobile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-secondary">
          <Menu className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background shadow-lg">
        <DropdownMenuLabel className="text-center">Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-auto w-3/4" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="hover:bg-muted/60 transition-colors">
            <Link to="/cart" className="flex items-center justify-center w-full">
              <ShoppingBasket className="mr-2 h-4 w-4 text-primary" />
              <span>Cart</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-muted/60 transition-colors">
            <Link to="/shop" className="flex items-center justify-center w-full">
              <Store className="mr-2 h-4 w-4 text-primary" />
              <span>Shop</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-muted/60 transition-colors">
            <Link to="/user" className="flex items-center justify-center w-full">
              <UserRound className="mr-2 h-4 w-4 text-primary" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

