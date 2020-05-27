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
        placeholder="Quantity"
        onChange={text => setValue("quantity", text)}
        error={null}
        keyboard="numeric"
      />
      <EewooInput
        label="Target Price"
        placeholder="Target Price"
        onChange={text => setValue("targetPrice", text)}
        error={null}
        keyboard="numeric"
      />
    </>
  );
}
