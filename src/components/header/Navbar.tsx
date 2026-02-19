import { Suspense } from "react";

import Container from "@/components/Container";
import Logo from "@/components/header/Logo";
import Search from "@/components/header/Search";
import CartButton from "@/components/header/CartButton";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import LinksDropdown from "@/components/header/LinksDropdown";

export default function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-4 py-8">
        <Logo />

        <Suspense>
          <Search />
        </Suspense>

        <div className="flex items-center gap-4">
          <CartButton />

          <ThemeSwitcher />

          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
