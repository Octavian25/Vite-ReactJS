import { MasterProduct } from "@/pages/master/product";
import { GlobalRoutes } from "@/types/RoutesTypes";
import { Home, LocateIcon, Package2, Store } from "lucide-react";

export const routes: GlobalRoutes[] = [
  {
    path: "master",
    icon: <Home className="h-4 w-4" />,
    title: "Master Data",
    child: [
      {
        path: "product",
        element: <MasterProduct />,
        icon: <Package2 className="h-4 w-4" />,
        title: "Product",
        child: undefined,
      },
      {
        path: "location",
        element: (
          <>
            <h1>LOCATION DATA</h1>
          </>
        ),
        icon: <LocateIcon className="h-4 w-4" />,
        title: "Location",
        child: undefined,
      },
    ],
  },
  {
    path: "transaction",
    icon: <Store className="h-4 w-4" />,
    title: "Transaction",
    child: [
      {
        path: "sell",
        element: (
          <>
            <h1>SELL ITEM</h1>
          </>
        ),
        icon: <Package2 className="h-4 w-4" />,
        title: "Sell Item",
        child: undefined,
      },
    ],
  },
];
