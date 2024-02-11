import { cn } from "@/lib/utils";
import { FormFields, contactFormSchema } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const ContactPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Contact Us</h1>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <InputField
              type="text"
              placeholder="Email"
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        {errors.email && <span>{errors.email.message}</span>}

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputField
              type="password"
              placeholder="Password"
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;

type InputFieldProps = React.ComponentPropsWithoutRef<"input">;

const InputField = (props: InputFieldProps) => {
  return (
    <input
      {...props}
      className={cn("px-8 h-10 border focus:outline-blue-300", props.className)}
    />
  );
};
