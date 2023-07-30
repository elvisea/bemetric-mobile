import * as yup from "yup";

const schema = yup.object({
  equipmentName: yup.string().required("Informe o seguinte campo"),
  equipmentIdentifier: yup.string().required("Informe o seguinte campo"),
  equipmentModel: yup.string().required("Informe o seguinte campo"),
  equipmentPlate: yup.string().required("Informe o seguinte campo"),
  equipmentYear: yup.string().required("Informe o seguinte campo"),
  deviceSerial: yup.string().required("Informe o seguinte campo"),
  devicekey: yup.string().required("Informe o seguinte campo"),
  initialHourMeter: yup.number().required("Informe o seguinte campo"),
  initialOdometer: yup.number().required("Informe o seguinte campo"),
});

export { schema };
