import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCamera, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IRoomList, IRoomProps } from "../types";

export default function Room({
  id,
  isOwner,
  imageUrl,
  name,
  rating,
  reviews_count,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`rooms/${id}/photos`);
  };
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
          {isOwner ? (
            <Button
              onClick={onCameraClick}
              variant={"unstyled"}
              position="absolute"
              top={3}
              right={0}
              _hover={{
                color: "red.500",
              }}
              color="red.400"
              alignItems={"center"}
            >
              <FaCamera size="20" />
            </Button>
          ) : null}
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
