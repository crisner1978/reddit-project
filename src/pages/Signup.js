import Error from "components/shared/form/Error";
import Form from "components/shared/form/Form";
import Input from "components/shared/form/Input";
import InputWrapper from "components/shared/form/InputWrapper";
import Label from "components/shared/form/Label";
import SubmitButton from "components/shared/form/SubmitButton";
import { checkIfUsernameTaken, signupUser } from "lib/firebase";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function Signup({ history }) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  

  const mutation = useMutation(signupUser, {
    onSuccess: () => {
      history.replace("/");
      window.location.reload();
      toast.success("Sign up successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const { email, password, username } = data;
    mutation.mutate({ email, password, username });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Label>username</Label>
        <Input
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 5,
              message: "Must be at least 5 characters",
            },
            maxLength: {
              value: 20,
              message: "Must be less than 20 characters",
            },
            validate: (value) => checkIfUsernameTaken(value),
          })}
          type="text"
        />
        <Error>{errors.username?.message}</Error>
      </InputWrapper>
      <InputWrapper>
        <Label>email</Label>
        <Input
          {...register("email", {
            required: "Email is required",
            maxLength: {
              value: 30,
              message: "Must be less than 30 characters",
            },
          })}
          type="email"
        />
        <Error>{errors.email?.message}</Error>
      </InputWrapper>
      <InputWrapper>
        <Label>password</Label>
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Must be at least 8 characters",
            },
            maxLength: {
              value: 30,
              message: "Must be less than 30 characters",
            },
          })}
          type="password"
        />
        <Error>{errors.password?.message}</Error>
      </InputWrapper>
      <InputWrapper>
        <Label>confirm password</Label>
        <Input
          {...register("confirm", {
            required: "Confirm is required",
            minLength: {
              value: 8,
              message: "Must be at least 8 characters",
            },
            maxLength: {
              value: 30,
              message: "Must be less than 30 characters",
            },
            validate: (value) => {
              const { password } = getValues();
              return password === value || "Passwords should match!";
            },
          })}
          type="password"
        />
        <Error>{errors.confirm?.message}</Error>
      </InputWrapper>
      <SubmitButton type="submit">sign up</SubmitButton>
    </Form>
  );
}
