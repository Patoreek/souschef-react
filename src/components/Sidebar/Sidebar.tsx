import { useState, useEffect } from "react";
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

import axios from "axios";

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

  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      // Make the POST request to the API
      const response = await axios.get(
        "http://localhost:3000/get-sidebar-data"
      );
      // console.log(response);

      console.log("response:", response);

      if (response.status == 201) {
        setCuisines(response.data.data[0].cuisines);
      }

      //   // Update chat state with the new chat entry
      //   setChatHistory((prevChatHistory) => {
      //     // Replace the last user message with the updated userChatLog
      //     const updatedChatHistory = [...prevChatHistory];
      //     updatedChatHistory[updatedChatHistory.length - 1] = userChatLog;

      //     // Add the GPT chat log to the chat history
      //     updatedChatHistory.push(gptChatLog);

      //     return updatedChatHistory;
      //   });
    } catch (error) {
      // Handle any errors during the request
      // setError(error.response ? error.response.data : 'An error occurred');
    }
  };

  const toggleMenu = (menuTitle: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuTitle)
        ? prev.filter((title) => title !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const linkStyles = "text-gray-900";

  return (
    <Sidebar className="relative">
      {/* <SidebarHeader>Add your header content here</SidebarHeader> */}
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
                    className={`${linkStyles} flex items-center gap-4`}
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
                      className={`${linkStyles} flex items-center gap-4`}
                    >
                      <ChefHat />
                      <span>Recipes</span>
                    </a>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                  <SidebarMenuSub className="pr-0 mr-0">
                    {cuisines.length > 0 &&
                      cuisines.map((cuisine: any) => (
                        <div key={cuisine.cuisine_id}>
                          <Collapsible
                            defaultOpen={false}
                            className="group/collapsible"
                          >
                            <CollapsibleTrigger asChild className="pr-0 mr-0">
                              <SidebarMenuButton asChild className="pr-0 mr-0">
                                <a
                                  href={"#"}
                                  className={`${linkStyles} flex items-center gap-4`}
                                >
                                  <span>
                                    {cuisine.cuisine_icon}{" "}
                                    {cuisine.cuisine_name}
                                  </span>
                                </a>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="CollapsibleContent">
                              <SidebarMenuSub className="pr-0 mr-0">
                                {cuisine.recipes.map((recipe: any) => (
                                  <SidebarMenuButton
                                    key={recipe.recipe_id}
                                    asChild
                                  >
                                    <a
                                      href={recipe.dish_name}
                                      className={`${linkStyles} flex items-center gap-4`}
                                    >
                                      {/* <item.icon /> */}
                                      <span>{recipe.dish_name}</span>
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
                    className={`${linkStyles} flex items-center gap-4`}
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
