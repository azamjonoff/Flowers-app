import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function UploadImage() {
  return (
    <div className="my-3 w-full">
      <Label>Upload image*</Label>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="account">
            Account
          </TabsTrigger>
          <TabsTrigger className="w-full" value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default UploadImage;
