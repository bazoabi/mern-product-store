import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products: ", products);

  return (
    <Container maxW={"container.lg"} p={4}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r,rgb(40, 188, 202),rgb(0, 60, 255))"}
          bgClip="text"
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          width={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            color={"gray.500"}
            fontWeight={"bold"}
          >
            No Products Found {"😢"}{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create New Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
