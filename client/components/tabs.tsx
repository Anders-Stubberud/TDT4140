import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { serverEndpoint } from "@/state/zustand"

export function TabsDemo() {

  const [name, setName] = useState("Pedro Duarte");
  const [userName, setUserName] = useState("@peduarte");

  const handleSaveChanges = async () => {

    const data = {
      name: name,
      userName: userName
    }

    try {
      const response = await fetch(serverEndpoint + '/api/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If you need to handle the response, you can do so here
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
