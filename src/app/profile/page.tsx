"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as z from "zod";

/** Added custom validation for user
 * 1. Username should be 5 characters long
 * 2. Username should not contain any spaces
 * 3. It should be a slug
*/
const validateUsername = (username: unknown) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const minimum_req = z.string().min(5).safeParse(username).success;
  if (minimum_req && slugRegex.test(String(username))) {
    return true;
  }

  return false;
};

// This is a form schema that will validate form values 
const formValidationSchema = z.object({
  username: z.custom(validateUsername, { message: "Invalid username" }),
  about: z
    .string({ required_error: "about is required" })
    .max(300, { message: "About can't exceed 300 characters" }),
});

const defaultValues = {
  username: "",
  about: "",
};

type FormSchema = z.infer<typeof formValidationSchema>;

export default function UI() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formValidationSchema),
    defaultValues,
  });

  const onSubmit = (values: FormSchema) => {
    // TODO: Add server action to update userprofile
    console.log(values);
  };
  return (
    <>
      <div className="w-[600px] mx-auto mt-[52px]">
        <article className="space-y-[4px]">
          <h4 className="font-bold text-[19px]">Profile</h4>
          <p className="text-[15px]">
            This information will be displayed publicly.
          </p>
        </article>
        <Form {...form}>
          <form
            action=""
            className="mt-[46px] space-y-[12px]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <span>app.osteopath.in/</span>
                      <input
                        type="text"
                        {...field}
                        className="outline-none w-full"
                        placeholder="janesmith"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea placeholder="I am..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Write a few sentence about yourself.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-blue-500 hover:bg-blue-500/90 block">
              Connect with Calendar
            </Button>
            <Button size={"sm"}>Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
