import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { IRoomList } from "../../types";
import { getRooms } from "../api";
import Room from "../Room";
import RoomSkeleton from "../RoomSkeleton";

export default function Home() {
  const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);
  // const [isLoading, setIsLoading] = useState(true);
  // const [rooms, setRooms] = useState<IRoom[]>([]);
  // const fecthRooms = async () => {
  //   const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/");
  //   const json = await response.json();
  //   setIsLoading(false);
  //   console.log(json);
  //   setRooms(json);
  // };
  // useEffect(() => {
  //   fecthRooms();
  // }, []);

  return (
    <Grid
      px={{
        base: 10,
        lg: 40,
      }}
      mt={10}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {data?.map((room, index) => (
        <Room
          key={index}
          id={room.id}
          isOwner={room.is_owner}
          imageUrl={
            room.photos[0]?.file ??
            `https://source.unsplash.com/random/280${index}`
          }
          name={room.name}
          rating={room.rating}
          reviews_count={room.reviews_count}
          city={room.city}
          country={room.country}
          price={room.price}
        />
      ))}
    </Grid>
  );
}
