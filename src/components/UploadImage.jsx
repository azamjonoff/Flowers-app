import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button, buttonVariants } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircledIcon, PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../request";
import { toast } from "sonner";
import { allowImageSize } from "../lib/my-utils";

function UploadImage({ outsideImage }) {
  const [value, setValue] = useState(
    outsideImage ? outsideImage : "https://i.postimg.cc/PqdD2X3M/flower.png"
  );
  const urlInput = useRef(null);

  const handleUploadImage = (image, type = "local") => {
    if (type === "url") {
      if (image !== value) {
        toast.loading("Image uploading...");
        setValue(image);
      } else {
        toast.info("This image already uploaded");
      }
    } else {
      if (image.size >= allowImageSize) {
        toast.error("Image size up to 5MB");
      } else {
        toast.loading("Image uploading...");
        uploadImage(image)
          .then((res) => {
            setValue(res);
          })
          .catch(({ message }) => toast.error(message));
      }
    }
  };

  useEffect(() => {
    setValue("https://i.postimg.cc/PqdD2X3M/flower.png");
  }, []);

  return (
    <div className="my-3 w-full">
      <select name="imgUrl" className="sr-only">
        <option value={value}></option>
      </select>
      <Label>Upload image*</Label>
      <Tabs defaultValue="default" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            URL
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setValue("https://i.postimg.cc/PqdD2X3M/flower.png")}
            className="w-full"
            value="default"
          >
            Default
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label>
            <span
              className={`${buttonVariants({ variant: "outline" })} w-full`}
            >
              {!value ? <PlusCircledIcon /> : <UpdateIcon />}
            </span>
            <Input
              onChange={({ target: { files } }) => handleUploadImage(files[0])}
              className="sr-only"
              type="file"
              placeholder="Enter your local photo"
              accept="image/*"
            />
          </Label>
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url">URL</Label>
          <div className="flex gap-5">
            <Input
              ref={urlInput}
              type="url"
              id="url"
              defaultValue={
                value && value !== "/faviconimages/android-chrome-512x512.png"
                  ? value
                  : ""
              }
              placeholder="Enter url"
            />
            <Button
              type="button"
              onClick={() => handleUploadImage(urlInput?.current.value, "url")}
            >
              <PlusIcon />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="default">
          <Button
            onClick={() => setValue("https://i.postimg.cc/PqdD2X3M/flower.png")}
            variant="secondary"
            className="w-full"
            type="button"
          >
            <span>Default image</span>
            <PlusIcon />
          </Button>
        </TabsContent>
        {value && (
          <img
            onLoad={() => {
              toast.dismiss();
              toast.success("Image successfully added");
            }}
            onError={() => setValue("https://i.postimg.cc/PqdD2X3M/flower.png")}
            src={value}
            alt="Uploaded image"
            height="250"
            className="!h-[250px] !w-full object-cover mt-3 rounded-lg shadow-md "
          />
        )}
      </Tabs>
    </div>
  );
}

export default UploadImage;
