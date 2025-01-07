import { useState } from "react";
import {
  Home,
  Search,
  ChefHat,
  Calendar,
  Settings,
  Banknote,
  ShoppingBasket,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainItems = [
  { title: "Search", url: "#", icon: Search },
  { title: "Home", url: "#", icon: Home },
];

const recipes = [
  {
    title: "Italian",
    icon: "🍕",
    dishes: [
      { name: "Spaghetti Carbonara", url: "#" },
      { name: "Margherita Pizza", url: "#" },
    ],
  },
  {
    title: "American",
    icon: "🍔",
    dishes: [
      { name: "Burger", url: "#" },
      { name: "Buffalo Wings", url: "#" },
    ],
  },
  {
    title: "Mexican",
    icon: "🌮",
    dishes: [
      { name: "Tacos", url: "#" },
      { name: "Enchiladas", url: "#" },
    ],
  },
];

const otherItems = [
  { title: "Stock Management (TBA)", url: "#", icon: ShoppingBasket },
  { title: "Price Checker (TBA)", url: "#", icon: Banknote },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Settings", url: "#", icon: Settings },
];

const AppSidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuTitle: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuTitle)
        ? prev.filter((title) => title !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const linkStyles = "text-gray-900";

  return (
    <Sidebar>
      <SidebarHeader>{/* Add your header content here */}</SidebarHeader>
      <SidebarContent>
        {/* Main Group */}
        <SidebarGroup>
          <SidebarMenu>
            {/* Main */}
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={`${linkStyles} flex items-center gap-2`}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {/* recipes */}
            <Collapsible defaultOpen={false} className="group/collapsible">
              <SidebarMenuItem key={"recipes"}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild>
                    <a
                      href={"#"}
                      className={`${linkStyles} flex items-center gap-2`}
                    >
                      <ChefHat />
                      <span>Recipes</span>
                    </a>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                  <SidebarMenuSub className="pr-0 mr-0">
                    {recipes.map((cuisine) => (
                      <div key={cuisine.title}>
                        <Collapsible
                          defaultOpen={false}
                          className="group/collapsible"
                        >
                          <CollapsibleTrigger asChild className="pr-0 mr-0">
                            <SidebarMenuButton asChild className="pr-0 mr-0">
                              <a
                                href={"#"}
                                className={`${linkStyles} flex items-center gap-2`}
                              >
                                <span>
                                  {cuisine.icon} {cuisine.title}
                                </span>
                              </a>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="CollapsibleContent">
                            <SidebarMenuSub className="pr-0 mr-0">
                              {cuisine.dishes.map((dish) => (
                                <SidebarMenuButton asChild>
                                  <a
                                    href={dish.url}
                                    className={`${linkStyles} flex items-center gap-2`}
                                  >
                                    {/* <item.icon /> */}
                                    <span>{dish.name}</span>
                                  </a>
                                </SidebarMenuButton>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        {/* Other Options */}
        <SidebarGroup>
          <SidebarMenu>
            {otherItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={`${linkStyles} flex items-center gap-2`}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* Add your footer content here */}</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
