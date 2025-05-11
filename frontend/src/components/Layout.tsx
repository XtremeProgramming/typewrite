import { Link, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ROUTES } from "@/constants/routes";

export const Layout = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          {ROUTES.map((route) => (
            <NavigationMenuItem key={route.path}>
              <NavigationMenuLink asChild>
                <Link to={route.path}>{route.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <hr />
      <Outlet />
    </div>
  );
};
