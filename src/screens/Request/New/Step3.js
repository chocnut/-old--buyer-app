import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import EewooInput from "../../../components/EewooInput";

export default function Step1() {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register("targetPrice", { required: true, min: 1 });
    register("quantity", { required: true, min: 1 });
  }, [register]);

  return (
    <>
      <EewooInput
        label="Quantity"
        placeholder="Enter product quantity"
        onChange={text => setValue("quantity", text)}
        error={null}
        keyboard="numeric"
      />
      <EewooInput
        icon="$"
        label="Target Price"
        placeholder="Indicate the desired price"
        onChange={text => setValue("targetPrice", text)}
        error={null}
        keyboard="numeric"
      />
    </>
  );
}
