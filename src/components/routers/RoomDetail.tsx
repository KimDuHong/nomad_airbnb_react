import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaBed,
  FaBroom,
  FaBullhorn,
  FaRegCommentDots,
  FaRestroom,
  FaStar,
  FaToilet,
} from "react-icons/fa";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { isLoading: isReviewLoading, data: reviewData } = useQuery<IReview[]>(
    [`rooms`, roomPk, `reviews`],
    getRoomReviews
  );
  return (
    <Box
      h="60vh"
      mt={5}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton isLoaded={!isLoading} h={43} width={"50%"}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        rounded={"lg"}
        mt="5"
        templateRows={"repeat(2,1fr)"}
        templateColumns={"repeat(4,1fr)"}
      >
        {[0, 1, 2, 3, 4].map((idx) => (
          <GridItem
            colSpan={idx === 0 ? 2 : 1}
            rowSpan={idx === 0 ? 2 : 1}
            key={idx}
            p={"1"}
            height={idx === 0 ? "60vh" : "30vh"}
          >
            <Skeleton isLoaded={!isLoading} width={"100%"} height={"100%"}>
              <Image
                src={
                  data?.photos[idx]?.file ??
                  `https://source.unsplash.com/random/450x${450 + idx}/?home`
                }
                w="100%"
                h="100%"
                // border={"8px"}
                // objectFit={"cover"}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack mt="5" width={"60%"} justifyContent={"space-between"}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading}>
            <Heading>House Host By {data?.owner.name}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <HStack>
              <FaBed />
              <Text>방 {data?.rooms}개</Text>
              <FaRestroom />
              <Text>화장실 {data?.toilets}개</Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Skeleton isLoaded={!isLoading} rounded={"3xl"}>
          <Avatar
            name={data?.owner.name}
            size={"md"}
            src={data?.owner.avatar}
          />
        </Skeleton>
      </HStack>
      <Skeleton width={"100%"} isLoaded={!isLoading}>
        <Box mt="10">
          <Heading fontSize={"md"}>
            <HStack>
              <FaStar />
              <Text>{data?.rating}</Text>
            </HStack>
            <Text>{data?.reviews_count} 개의 리뷰가 있습니다.</Text>
          </Heading>
          <VStack alignItems="flex-start">
            <Grid templateColumns={"1fr 1fr"} gap="5" mt={5}>
              {reviewData?.map((review, index) => (
                <VStack key={index} alignItems="flex-start">
                  <HStack alignItems={"flex-start"}>
                    <Avatar
                      name={review.user.name}
                      src={review.user.avatar}
                      size="sm"
                    />
                    <VStack alignItems={"flex-start"} spacing="-1">
                      <HStack spacing={"0.5"}>
                        <FaStar size={"12"} />
                        <Text>{review.rating}</Text>
                      </HStack>
                      <Heading fontSize={"sm"}>{review.user.name}</Heading>
                    </VStack>
                    <Text>{review.payload}</Text>
                    <Text fontSize={"sm"} color={"gray.400"}>
                      {review.created_at}
                    </Text>
                  </HStack>
                </VStack>
              ))}
            </Grid>
          </VStack>
        </Box>
      </Skeleton>
    </Box>
  );
}
