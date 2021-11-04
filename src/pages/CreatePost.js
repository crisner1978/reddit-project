import categories from "categories";
import Error from "components/shared/form/Error";
import Form from "components/shared/form/Form";
import Input from "components/shared/form/Input";
import InputWrapper from "components/shared/form/InputWrapper";
import Label from "components/shared/form/Label";
import { RadioGroupWrapper } from "components/shared/form/RadioGroup";
import RadioGroupOption from "components/shared/form/RadioGroup/Option";
import SelectWrapper from "components/shared/form/SelectWrapper";
import SubmitButton from "components/shared/form/SubmitButton";
import { createPost, getTimestamp } from "lib/firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useStore from "store";

import isURL from "validator/lib/isURL";

const postTypes = [
  {
    label: "link",
    value: "link",
  },
  {
    label: "text",
    value: "text",
  },
];

export default function CreatePost({ history }) {
  const [type, setType] = useState("text");
  const user = useStore((s) => s.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const mutation = useMutation(createPost, {
    onSuccess: ({ category, id }) => {
      history.push(`/a/${category}/${id}`);
    },
  });

  const onSubmit = (data) => {
    const { title, url, text, category } = data;
    if (!user) {
      throw new Error("Login to create post");
    }
    const post = {
      category,
      type,
      title,
      views: 0,
      score: 1,
      created: getTimestamp(),
      upvotePercentage: 100,
      votes: { [user.uid]: 1 },
      author: { uid: user.uid, username: user.username },
    };
    if (type === "text") {
      post.text = text;
    } else {
      post.url = url;
    }
    mutation.mutate(post);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} wide>
      <InputWrapper>
        <RadioGroupWrapper>
          {postTypes.map((option, index) => (
            <RadioGroupOption
              {...option}
              key={index}
              onClick={() => setType(option.value)}
              active={option.value === type}
            />
          ))}
        </RadioGroupWrapper>
      </InputWrapper>
      <InputWrapper>
        <Label>category</Label>
        <SelectWrapper>
          <Input
            {...register("category", {
              required: "Select a category",
            })}
            type="select"
            as="select"
            defaulValue={categories[0]}
          >
            {categories.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </Input>
        </SelectWrapper>
        <Error>{errors.category?.message}</Error>
      </InputWrapper>
      <InputWrapper>
        <Label>title</Label>
        <Input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Must be at least 5 characters",
            },
            maxLength: {
              value: 50,
              message: "Must be less than 50 characters",
            },
          })}
          type="text"
          placeholder="title"
        />
        <Error>{errors.title?.message}</Error>
      </InputWrapper>
      {type === "link" && (
        <InputWrapper>
          <Label>url</Label>
          <Input
            {...register("url", {
              validate: (value) => {
                return isURL(value || "Provide a valid URL");
              },
            })}
            placeholeder="url"
          />
          <Error>{errors.url?.message}</Error>
        </InputWrapper>
      )}
      {type === "text" && (
        <InputWrapper>
          <Label>text</Label>
          <Input
            {...register("text", {
              required: "Text is required",
              minLength: {
                value: 5,
                message: "Must be at least 5 characters",
              },
              maxLength: {
                value: 10000,
                message: "Must be less than 10,000 characters",
              },
            })}
            as="textarea"
            placeholder="text"
            rows="6"
          />
          <Error>{errors.text?.message}</Error>
        </InputWrapper>
      )}
      <SubmitButton type="submit">create post</SubmitButton>
    </Form>
  );
}
