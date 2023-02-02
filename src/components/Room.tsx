import {
  Box,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IRoomList, IRoomProps } from "../types";

export default function Room({
  id,
  imageUrl,
  name,
  rating,
  reviews_count,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${id}`}>
      <VStack mb={2} alignItems="flex-start">
        <Box
          w="100%"
          position={"relative"}
          rounded={"3xl"}
          overflow="hidden"
          mb={"2"}
        >
          <Image h={280} w="100%" src={imageUrl} />
          <Box
            _hover={{
              color: "red.500",
            }}
            cursor={"pointer"}
            color={"white"}
            position={"absolute"}
            top={3}
            right={3}
          >
            <FaRegHeart size="20" />
          </Box>
        </Box>
        <Box>
          <Grid gap={"2"} templateColumns={"7fr 1fr"}>
            <Text as="b" fontSize={"md"} noOfLines={1}>
              {name}
            </Text>
            <HStack
              _hover={{
                color: "red.500",
              }}
              spacing={1}
            >
              <FaStar size={12} />
              <Text noOfLines={1}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"x-small"} color={gray}>
            {city},{country}
          </Text>
        </Box>
        <HStack w="100%" justify={"space-between"}>
          <Text fontSize={"sm"} color={gray}>
            <Text as="b">${price}</Text> / 1 day
          </Text>
          <Text>{reviews_count} reviews</Text>
        </HStack>
      </VStack>
    </Link>
  );
}
