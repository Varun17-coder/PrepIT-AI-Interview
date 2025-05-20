import React from 'react'
import { FormControl,FormDescription,FormItem,FormLabel,FormMessage } from './ui/form'
import {Input} from "./ui/input";
import { Controller, FieldValues,Control, Path } from 'react-hook-form';

interface FormFeildProps<T extends FieldValues>{
        control: Control<T>;
        name: Path<T>;
        label: string;
        placeholder?: string;
        type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues> ({control, name, label, placeholder, type="text"}: FormFeildProps<T>) => (
   <Controller 
               control={control} 
               name={name} 
               render={({field})=>(
         <FormItem>
    <FormLabel className='label'>{label}</FormLabel>
    <FormControl> 
      <Input className='input' 
             placeholder={placeholder} 
             type={type}
             {...field} />
    </FormControl>
    <FormMessage />
       </FormItem>
   )}
        
   />
    )


export default FormField