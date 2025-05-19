import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Import useColorMode from Chakra UI

  return (
    <Container maxW="container.lg" p={4}>
      <Flex
        h={16}
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient="linear(to-r,rgb(40, 188, 202),rgb(0, 60, 255))"
          fontSize={{ base: "2xl", sm: "3xl" }}
          bgClip="text"
          fontWeight="bold"
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
