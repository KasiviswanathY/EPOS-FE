import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../customStyle.scss";
import "../style/css/feather.css";
import "../style/css/line-awesome.min.css";
import "../style/icons/tabler-icons/webfont/tabler-icons.css";
import "../style/icons/fontawesome/css/fontawesome.min.css";
import "../style/icons/fontawesome/css/all.min.css";
import "../style/fonts/feather/css/iconfont.css";

import BootstrapJs from "../components/bootstrap-js/bootstrapjs";
import { Providers } from "./providers"; // ✅ Import the wrapper here

export const metadata = {
  title: "Dreams POS - Inventory Management & Admin Dashboard Template",
  description:
    "Dreams POS is a powerful Bootstrap-based Inventory Management Admin Template designed for businesses, offering seamless invoicing, project tracking, and estimates.",
  keywords:
    "inventory management, admin dashboard, bootstrap template, invoicing, estimates, business management, responsive admin, POS system",
  author: "Dreams Technologies",
  icons: {
    icon: "favicon.png",
    shortcut: "favicon.png",
    apple: "favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <BootstrapJs />
        </Providers>
      </body>
    </html>
  );
}