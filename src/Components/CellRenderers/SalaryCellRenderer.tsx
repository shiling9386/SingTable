import { CellRendererParams } from "../SingTable/Types";

export const SalaryCellRenderer = (props: CellRendererParams) => {
  const { data, field } = props;
  return <div>${data[field]}</div>;
};
