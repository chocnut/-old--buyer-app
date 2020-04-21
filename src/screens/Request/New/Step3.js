import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import EewooInput from "../../../components/EewooInput";

export default function Step1() {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register("metrics", { required: true, min: 8 });
    register("description", { required: true, min: 8 });
  }, [register]);

  return (
    <>
      <EewooInput
        label="Quantity"
        placeholder="Quantity"
        onChange={text => setValue("Quantity", text)}
        error={null}
      />
      <EewooInput
        label="Target Price"
        placeholder="Target Price"
        onChange={text => setValue("targetPrice", text)}
        error={null}
      />
    </>
  );
}
