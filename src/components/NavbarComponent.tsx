import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";

const NavbarComponent = () => {
  return (
    <Navbar shouldHideOnScroll position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">Women Cloth</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="products">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="reviews" aria-current="page">
            Reviews
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="orders">
            Orders
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex items-center justify-between">
        <div className="flex items-center">
          <NavbarItem>
            <div className="flex flex-col text-right">
              <p className="text-xs font-semibold">John Doe</p>
              <Link href="/profile" color="primary">
                View Profile
              </Link>
            </div>
          </NavbarItem>
        </div>
        <NavbarItem>
          <Button as={Link} color="primary" href="login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
