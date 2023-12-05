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
        <Button as={Link} color="primary" href="/" variant="flat">
          <p className="font-bold text-inherit">Women Cloth</p>
        </Button>
        
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/products">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/reviews" aria-current="page">
            Reviews
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/orders">
            Orders
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/pelanggan">
            Pelanggan
          </Link>
        </NavbarItem>
      </NavbarContent>
      {(() => {
        const token = localStorage.getItem("token");

        if (!token) {
          return (
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Button as={Link} color="primary" href="/login" variant="flat">
                  Login
                </Button>
              </NavbarItem>
            </NavbarContent>
          );
        }

        return (
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <div className="flex items-center">
                <NavbarItem>
                    <div className="flex flex-col text-right">
                      <Link href="/profile" color="primary">
                        View Profile
                      </Link>
                    </div>
                  </NavbarItem>
              </div>
              <NavbarItem>
                <Button  as={Link} color="primary" type="button" href="/logout" variant="flat">
                  Log Out
                </Button>
              </NavbarItem>
            </NavbarContent>
        );
      })()}
    </Navbar>
  );
};

export default NavbarComponent;
