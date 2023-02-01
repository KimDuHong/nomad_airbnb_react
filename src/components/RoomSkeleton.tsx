import { Box, HStack, Skeleton } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded="3xl" height={"250px"} mb={4} />
      <HStack justifyContent={"space-between"}>
        <Skeleton rounded="md" width="60%" height={4} mb={2} />
        <Skeleton rounded="md" width="15%" height={4} />
      </HStack>
      <Skeleton rounded="lg" width="30%" height={2} mb={4} />
      <Skeleton rounded="lg" width="25%" height={4} />
    </Box>
  );
}
