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
interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: any;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack mb={2} alignItems="flex-start">
      <Box position={"relative"} rounded={"3xl"} overflow="hidden" mb={"2"}>
        <Image h={250} src={imageUrl} />
        <Box
          cursor={"pointer"}
          color={"white"}
          position={"absolute"}
          top={3}
          right={3}
        >
          <FaRegHeart size="15" />
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
      <Text fontSize={"sm"} color={gray}>
        <Text as="b">${price}</Text> / 1 day
      </Text>
    </VStack>
  );
}
