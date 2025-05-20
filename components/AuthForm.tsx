// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import Image from "next/image"
// import { toast } from "sonner" // new version of toast from shadcn  and to make it work you have to import toast in layout.tsx(global) below children 

// import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form" // all other form  feature are in FormField.tsx
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import FormField from "./FormField"
// import { useRouter } from "next/navigation"
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from "@/firebase/client"
// import { signIn, signUp } from "@/lib/actions/auth.action"

// // const formSchema = z.object({
// //   username: z.string().min(2).max(50),
// // })

// const authFormSchema = (type:FormType)=>{
//    return z.object({
//     name: type === "sign-in" ?  z.string().min(3): z.string().optional(),
//     email: z.string().email(),
//     password: z.string().min(3),
//    })
// }

// //copied from shadcn form component
// const AuthForm = ({type}:{type: FormType}) => {

//     const router = useRouter(); // for redirecting to particular router

//     const formSchema = authFormSchema(type);

//      // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: ""
//     },
//   })
 
//   // 2. Define a submit handler.
//   const onSubmit = async (values: z.infer<typeof formSchema>)=> {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     try {
//         if(type === "sign-up"){
//             // firebase part 
//             const {name, email, password} = values;
//             // this registers new user in firebase authentication, not firestore database (just authenticating the user)
//             const userCredential = await createUserWithEmailAndPassword(auth,email, password);
            
//             const result = await signUp({
//                 uid: userCredential.user.uid,
//                 name: name!,
//                 email,
//                 password
//             })
//             if(!result?.success){
//                toast.error(result?.message);
//                return;
//             }

//             console.log("signup")
//             toast.success('Account created succefully. Please sign in.')
//             router.push('/sign-in')
//             // console.log("Sign In", values)
//         }
//         else{
//             //firebase part for sign-in 
//             console.log("Sign In")  
//             const {email, password} = values;

//             const userCredential = await signInWithEmailAndPassword(auth,email, password);

//             const idToken = await userCredential.user.getIdToken();

//             if(!idToken){
//                 toast.error("Sign in failed")
//                 return;
//             }

//             await signIn({
//                 email, 
//                 idToken
//             });

//             toast.success("Sign in successfully.")
//             router.push("/"); 
//             // console.log("Sign Up", values)
//         }
        
//     } catch (error) {
//         console.log(error);
//         toast.error(`There was an error: ${error}`)
//     }
//   }

//   //checking for sign-in type
//   const isSignIn = type === "sign-in";
    
//   return (
//     <div className="card-border lg:min-w-[566px]">
//         <div className="flex flex-col gap-6 card px-10 py-14">
//             <div className="flex flex-row gap-2 justify-center">
//                     <Image src="/logo.svg" alt="logo" height={32} width={38}/>
//                     <h2 className="text-primary-100">PrepIT</h2>
//             </div>
//             <h3>Practise job interview with AI</h3>
//          <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">

//         {/* this shows properties inside this when type is sign-in */}
//         {!isSignIn && (
//             <FormField control={form.control} 
//                        name="name" 
//                        label="Name" 
//                        placeholder="Your Name" />
//         )}  
//         <FormField control={form.control}
//                    name="email" 
//                    label="Email" 
//                    placeholder="Your email address" 
//                    type="email"/>
//         <FormField control={form.control} 
//                    name="password" 
//                    label="Password" 
//                    placeholder="Enter your password" 
//                    type="password" />

//         <Button className="btn" type="submit">{isSignIn?"Sign In":"Create an Account"}</Button>
//       </form>
//     </Form>
//     <p className="text-center">
//         {isSignIn?"Not have an account yet?":"Already have an account?"}
//         <Link href={isSignIn?'/sign-up':'/sign-in'} className="font-bold text-user-primary ml-1">
//         {isSignIn?"Sign-up":"Sign-in"}
//         </Link>
//     </p>
//     </div>
//     </div>
//   )
// }

// export default AuthForm


//above isnt working correctly. Dont know why


"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;



