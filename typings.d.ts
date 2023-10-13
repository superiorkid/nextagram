interface ITag {
  id: string;
  text: string;
}

type MasonryProps<T> = React.ComponentPropsWithoutRef<"div"> & {
  items: T[];
  render: (item: T, idx: number) => React.ReactNode;
  config: {
    columns: number | number[];
    gap: number | number[];
    media?: number[];
  };
};
