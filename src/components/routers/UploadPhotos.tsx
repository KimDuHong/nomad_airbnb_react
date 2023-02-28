import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../ProtectedPage";
import useHostOnlyPage from "../HostOnlyPage";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../../api";
import { title } from "process";

interface IForm {
  file: FileList;
}
interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  useHostOnlyPage();
  const toast = useToast();
  const { register, watch, handleSubmit, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "Reaact",
          file: `https://imagedelivery.net/TfkiqSGnbio9VWWQtYee6A/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image Uploaded!",
        isClosable: true,
        description: "Image Uploaded successfully",
        position: "top",
      });
      reset();
    },
  });
  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button
              isLoading={
                createPhotoMutation.isLoading ||
                uploadImageMutation.isLoading ||
                uploadURLMutation.isLoading
              }
              type="submit"
              w="full"
              colorScheme={"red"}
            >
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
